import LeftBannerAdmin from "components/LeftBannerAdmin/LeftBannerAdmin.jsx";
import AdminTweetsList from "components/AdminTweetsList/AdminTweetsList.jsx";
import AdminContainer from "components/Admin/AdminContainer"

export default function AdminMainPage() {
  // 為了顯示左側按鈕顏色需做判斷
  const currentPage = 0

  return (
    <AdminContainer>
      <LeftBannerAdmin currentPage={currentPage} />
      <AdminTweetsList />
    </AdminContainer>
  )
}