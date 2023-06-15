import styles from "./LeftBannerAdmin.module.scss";
import Logout from "components/Logout/Logout.jsx";
import ac_logo from 'icons/ac_logo.svg'
import adminTweetsListActive from 'icons/adminTweetsListActive.svg'
import adminUsersList from 'icons/adminUsersList.svg'
import { AuthContext } from "context/AuthContext";
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LeftBannerAdmin() {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    console.log("clicked")
    logout();
    navigate('/admin')
  }
  return (
    <div className={styles.leftBannerContainer}>
      <div className={styles.leftBannerLogo}>
        <img src={ac_logo} alt="ac_logo.svg" />
      </div>
      <LeftBannerItems />
      <div className={styles.leftBannerLogout}>
        <Logout onClick={handleLogout} />
      </div>
    </div>
  )
}

// 左欄項目，不含 logo
function LeftBannerItems() {
  return (
    <div>
      <div className={styles.leftBannerItem}>
        <img className={styles.leftBannerIcon} src={adminTweetsListActive} alt="adminTweetsListActive.svg" />
      </div>
      <div className={styles.leftBannerItem}>
        <img className={styles.leftBannerIcon} src={adminUsersList} alt="adminUsersList.svg" />
      </div>
    </div>
  )
}
