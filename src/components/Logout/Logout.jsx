import styles from "./Logout.module.scss";
import logout from 'icons/logout.svg'
// import logoutActive from 'icons/logoutActive.svg'

// 登出按鈕
export default function Logout({ onClick }) {
  return (
    <div className={styles.leftBannerItem}>
      <button className={styles.leftBannerLogoutBtn} onClick={onClick}>
        <img className={`${styles.leftBannerIcon} ${styles.iconLogout}`} src={logout} alt="logout.svg" />
      </button>
    </div>
  )
}