import LeftBannerAdmin from 'components/LeftBannerAdmin/LeftBannerAdmin.jsx'
import UserCard from 'components/Admin/UserCard.jsx'
import AdminContainer from 'components/Admin/AdminContainer.jsx'
import AdminRightContainer from 'components/Admin/AdminRightContainer.jsx'
import dummyUserCards from 'components/Admin/dummyUserCards.js'
import { useState, useEffect } from 'react'
import { getAllUsers } from 'api/tweets'

export default function AdminUsersPage() {
  // 為了顯示左側按鈕顏色需做判斷
  const currentPage = 1

  const [users, setUsers] = useState([])
  let userAvatar = ''
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
  if(users && users.data) {
    const {avatar} = users.data
    console.log(avatar)
  }
  useEffect(() => {
    const getAllUsersAsync = async() => {
      try {
        const res = await getAllUsers()
        setUsers(res.data.map((user) => ({ ...user })))
      } catch (error) {
        console.error(error)
      }
    }
    getAllUsersAsync()
  }, [savedUserInfoParsed.id])
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