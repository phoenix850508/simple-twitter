import styles from "./LeftBanner.module.scss";
import Logout from "components/Logout/Logout.jsx";
import ac_logo from 'icons/ac_logo.svg'
import home from 'icons/home.svg'
import homeActive from 'icons/homeActive.svg'
import userInfo from 'icons/userInfo.svg'
import userInfoActive from 'icons/userInfoActive.svg'
import settings from 'icons/settings.svg'
import settingsActive from 'icons/settingsActive.svg'
import TopTweetModal from 'components/TopTweetSection/TopTweetComponents/TopTweetModal'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from 'context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx'

export default function LeftBanner({ currentPage }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tweet, setTweet] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  // const [onPage, setOnPage] = useState('home')
  const { postTweets, isTweetUpdated, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    navigate('/login')
  }
  const handleHomePageClick = () => {
    navigate('/main')
  }
  const handleUserSelfPageClick = () => {
    navigate('/user/self')
  }
  const handleSettingPageClick = () => {
    navigate('/setting')
  }
  const clearForm = () => {
    setTweet('');
  };
  //在左邊欄也增加新增推文的API請求
  const handleSubmit = async () => {
    try {
      if (isUpdating) return
      if (tweet.length > 140) return
      if (tweet.trim().length < 1) return setErrorMsg(true)
      const res = await postTweets({ description: tweet })
      setIsUpdating(true)
      //若新增推文成功
      if (res) {
        setShow(false)
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("[Post Tweeets failed 2]", error)
      alert("發文失敗")
      setShow(false)
    }
  }
  useEffect(() => {
    clearForm()
  }, [isTweetUpdated])




  return (
    <div className={styles.leftBannerContainer}>
      <div className={styles.leftBannerLogo}>
        <img src={ac_logo} alt="ac_logo.svg" />
      </div>
      <LeftBannerItems
        onTweetClick={handleShow}
        onHomePageClick={handleHomePageClick}
        onUserSelfClick={handleUserSelfPageClick}
        onSettingClick={handleSettingPageClick}
        currentPage={currentPage}
      />
      <div className={styles.leftBannerLogout}>
        <Logout onClick={handleLogout} />
      </div>
      <TopTweetModal
        show={show}
        handleClose={handleClose}
        buttonText={"推文"}
        onSubmit={handleSubmit}
        onChange={(tweetInput) => {
          setErrorMsg(false)
          setTweet(tweetInput)
        }}
        borderLine={clsx('', { [styles.wordLengthError]: tweet.length > 140 }, { [styles.emptyTweetError]: errorMsg })} />
    </div>
  )
}

// 左欄項目，不含 logo
function LeftBannerItems({ onTweetClick, onHomePageClick, onUserSelfClick, onSettingClick, currentPage }) {
  return (
    <div>
      {/* 首頁按鈕 */}
      <div className={styles.leftBannerItem} onClick={onHomePageClick}>
        {currentPage === 1 ? <img className={`${styles.leftBannerIcon} ${styles.iconHome}`} src={homeActive} alt="homeActive.svg" /> : <img className={`${styles.leftBannerIcon} ${styles.iconHome}`} src={home} alt="home.svg" />}
      </div>
      {/* 個人資料按鈕 */}
      <div className={styles.leftBannerItem} onClick={onUserSelfClick}>
        {currentPage === 2 ? <img className={`${styles.leftBannerIcon} ${styles.iconUserInfo}`} src={userInfoActive} alt="userInfoActive.svg" /> : <img className={`${styles.leftBannerIcon} ${styles.iconUserInfo}`} src={userInfo} alt="userInfo.svg" />}
      </div>
      {/* 設定按鈕 */}
      <div className={styles.leftBannerItem} onClick={onSettingClick}>
        {currentPage === 3 ? <img className={`${styles.leftBannerIcon} ${styles.iconSettings}`} src={settingsActive} alt="settingsActive.svg" /> : <img className={`${styles.leftBannerIcon} ${styles.iconSettings}`} src={settings} alt="settings.svg" />}
      </div>
      <LeftBannerTweet onClick={onTweetClick} />
    </div>
  )
}

// 左欄推文按鈕
function LeftBannerTweet({ onClick }) {
  return (
    <div>
      <button className={styles.leftBannerTweetBtn} onClick={onClick}><p className={styles.leftBannerTweetText}>推文</p></button>
    </div>
  )
}
