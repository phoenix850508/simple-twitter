import { useNavigate } from 'react-router-dom';
import LeftBannerAdmin from 'components/LeftBannerAdmin/LeftBannerAdmin.jsx'
import UserCard from 'components/Admin/UserCard.jsx'
import AdminContainer from 'components/Admin/AdminContainer.jsx'
import AdminRightContainer from 'components/Admin/AdminRightContainer.jsx'
// import dummyUserCards from 'components/Admin/dummyUserCards.js'
import { useState, useEffect } from 'react'
import { getAllUsers } from 'api/tweets'

export default function AdminUsersPage() {
  const navigate = useNavigate()
  // 為了顯示左側按鈕顏色需做判斷
  const currentPage = 1

  const [users, setUsers] = useState([])
  let userAvatar = ''
  if (users && users.data) {
    const { avatar } = users.data
    console.log(avatar)
  }

  // 撈取 localStorage 中的 userInfo 協助跳轉頁面
  let savedUserInfo = {}
  let savedUserInfoId = 0
  let role = ''
  if (localStorage.getItem("userInfo")) {
    savedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    savedUserInfoId = savedUserInfo.id
    role = savedUserInfo.role
  }

  // 透過 API 撈初始資料
  useEffect(() => {
    const getAllUsersAsync = async () => {
      try {
        const res = await getAllUsers()
        setUsers(res.data.map((user) => ({ ...user })))
      } catch (error) {
        console.error(error)
      }
    }
    // 驗證角色，若登入者為一般使用者則導回首頁，若是管理者那就停在原頁面撈資料，其他的請登入
    if (savedUserInfoId && role === 'user') {
      navigate('/main');
    } else if (savedUserInfoId && role === 'admin') {
      getAllUsersAsync()
      // 剩下的就是請先登入
    } else {
      navigate('/login');
    }
  }, [savedUserInfoId, navigate, role])

  return (
    <div>
      <AdminContainer>
        <LeftBannerAdmin currentPage={currentPage} />
        <AdminRightContainer title={"使用者列表"}>
          {userAvatar}
          {users.map((user) => {
            return <UserCard key={user.id} avatar={user.avatar} background={user.banner} name={user.name} account={user.account} tweetsCount={user.tweetsCount} likesCount={user.likesCount} followersCount={user.followersCount} followingsCount={user.followingsCount} />
          })}
        </AdminRightContainer>
      </AdminContainer>
    </div>
  )
}