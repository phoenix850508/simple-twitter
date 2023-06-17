import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LeftBannerAdmin from "components/LeftBannerAdmin/LeftBannerAdmin.jsx";
import AdminTweetsList from "components/AdminTweetsList/AdminTweetsList.jsx";
import AdminContainer from "components/Admin/AdminContainer"

export default function AdminMainPage() {
  const navigate = useNavigate()

  // 為了顯示左側按鈕顏色需做判斷
  const currentPage = 0

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
    // 驗證角色，若登入者為一般使用者則導回首頁，若是管理者那就停在原頁面，其他的請登入
    if (savedUserInfoId && role === 'user') {
      navigate('/main');
    } else if (savedUserInfoId && role === 'admin') {
      navigate('/admin_main');
      // 剩下的就是請先登入
    } else {
      navigate('/login');
    }
  }, [savedUserInfoId, navigate, role])

  return (
    <AdminContainer>
      <LeftBannerAdmin currentPage={currentPage} />
      <AdminTweetsList />
    </AdminContainer>
  )
}