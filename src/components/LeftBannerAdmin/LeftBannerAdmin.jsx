import styles from "./LeftBannerAdmin.module.scss";
import Logout from "components/Logout/Logout.jsx";
import ac_logo from 'icons/ac_logo.svg'
import adminTweetsList from 'icons/adminTweetsList.svg'
import adminTweetsListActive from 'icons/adminTweetsListActive.svg'
import adminUsersList from 'icons/adminUsersList.svg'
import adminUsersListActive from 'icons/adminUsersListActive.svg'
import { AuthContext } from "context/AuthContext";
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LeftBannerAdmin({ currentPage }) {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  // 跳轉到 AdminMainPage
  const handleToMainClick = () => {
    navigate('/admin_main')
  }
  // 跳轉到 AdminUsersPage
  const handleToUsersClick = () => {
    navigate('/admin_users')
  }

  // 登出鈕
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
      <LeftBannerItems handleToMainClick={handleToMainClick} handleToUsersClick={handleToUsersClick} currentPage={currentPage} />
      <div className={styles.leftBannerLogout}>
        <Logout onClick={handleLogout} />
      </div>
    </div>
  )
}

// 左欄項目，不含 logo
function LeftBannerItems({ handleToMainClick, handleToUsersClick, currentPage }) {

  return (
    <div>
      <div className={styles.leftBannerItem}>
        <button
          className={styles.leftBannerBtn}
          onClick={() => { handleToMainClick() }}
        >
          {currentPage ? <img className={styles.leftBannerIcon} src={adminTweetsList} alt="adminTweetsList.svg" /> : <img className={styles.leftBannerIcon} src={adminTweetsListActive} alt="adminTweetsListActive.svg" />}
        </button>
      </div>
      <div className={styles.leftBannerItem}>
        <button
          className={styles.leftBannerBtn}
          onClick={() => { handleToUsersClick() }}
        >
          {currentPage ? <img className={styles.leftBannerIcon} src={adminUsersListActive} alt="adminUsersListActive.svg" /> : <img className={styles.leftBannerIcon} src={adminUsersList} alt="adminUsersList.svg" />}
        </button>
      </div>
    </div>
  )
}
