import LeftBannerAdmin from "components/LeftBannerAdmin/LeftBannerAdmin.jsx";
import AdminTweetsList from "components/AdminTweetsList/AdminTweetsList.jsx";
import AdminContainer from "components/Admin/AdminContainer"

export default function AdminMainPage() {
  return (
    <AdminContainer>
      <LeftBannerAdmin />
      <AdminTweetsList />
    </AdminContainer>
  )
}