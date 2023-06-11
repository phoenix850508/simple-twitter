import styles from "./Logout.module.scss";
import logout from 'icons/logout.svg'

// 登出按鈕
export default function Logout({onClick}) {
  return (
    <div className={styles.leftBannerItem}>
      <button className={styles.leftBannerLogoutBtn} onClick={onClick}>
        <img className={styles.leftBannerIcon} src={logout} alt="logout.svg" />
      </button>
    </div>
  )
}