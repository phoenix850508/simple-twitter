import styles from "./LeftBanner.module.scss";
import ac_logo from 'icons/ac_logo.svg'
import homeActive from 'icons/homeActive.svg'
import userInfo from 'icons/userInfo.svg'
import settings from 'icons/settings.svg'
import logout from 'icons/logout.svg'

export default function LeftBanner() {
  return (
    <div className={styles.leftBannerContainer}>
      <div className={styles.leftBannerLogo}>
        <img src={ac_logo} alt="ac_logo.svg" />
      </div>
      <LeftBannerItems />
      <div className={styles.leftBannerLogout}>
        <Logout />
      </div>
    </div>
  )
}

// 左欄項目，不含 logo
function LeftBannerItems() {
  return (
    <div>
      <div className={styles.leftBannerItem}>
        <img className={styles.leftBannerIcon} src={homeActive} alt="homeActive.svg" />
      </div>
      <div className={styles.leftBannerItem}>
        <img className={styles.leftBannerIcon} src={userInfo} alt="userInfo.svg" />
      </div>
      <div className={styles.leftBannerItem}>
        <img className={styles.leftBannerIcon} src={settings} alt="settings.svg" />
      </div>
      <LeftBannerTweet />
    </div>
  )
}

// 左欄推文按鈕
function LeftBannerTweet() {
  return (
    <div>
      <button className={styles.leftBannerTweetBtn}><p className={styles.leftBannerTweetText}>推文</p></button>
    </div>
  )
}

// 登出按鈕
function Logout() {
  return (
    <div className={styles.leftBannerItem}>
      <button className={styles.leftBannerLogoutBtn}>
        <img className={styles.leftBannerIcon} src={logout} alt="logout.svg" />
      </button>
    </div>
  )
}
