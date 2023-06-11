import styles from "./LeftBanner.module.scss";
import Logout from "components/Logout/Logout.jsx";
import ac_logo from 'icons/ac_logo.svg'
import homeActive from 'icons/homeActive.svg'
import userInfo from 'icons/userInfo.svg'
import settings from 'icons/settings.svg'
import TopTweetModal from 'components/TopTweetSection/TopTweetComponents/TopTweetModal'
import {useState} from 'react'
import {postTweets} from 'api/tweets.js'

export default function LeftBanner() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tweet, setTweet] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  //在左邊欄也增加新增推文的API請求
  const handleSubmit = async () => {
    try { 
      if(isUpdating) {
        return
      }
      setIsUpdating(true)
      const res = await postTweets({description: tweet})
      //若新增推文成功
      if (res) {
        alert("推文新增成功！");
        setShow(false)
        console.log(res);
      }
      setIsUpdating(false);
    } catch (error) {
      console.error("[Post Tweeets failed 2]", error)
      setIsUpdating(false);
      alert("發文失敗")
      setShow(false)
    }
  }
  return (
    <div className={styles.leftBannerContainer}>
      <div className={styles.leftBannerLogo}>
        <img src={ac_logo} alt="ac_logo.svg" />
      </div>
      <LeftBannerItems onClick={handleShow} />
      <div className={styles.leftBannerLogout}>
        <Logout />
      </div>
      <TopTweetModal show={show} handleClose={handleClose} buttonText={"推文"} onSubmit={handleSubmit} onChange={(tweetInput) => setTweet(tweetInput)} />
    </div>
  )
}

// 左欄項目，不含 logo
function LeftBannerItems({onClick}) {
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
      <LeftBannerTweet onClick={onClick} />
    </div>
  )
}

// 左欄推文按鈕
function LeftBannerTweet({onClick}) {
  return (
    <div>
      <button className={styles.leftBannerTweetBtn} onClick={onClick}><p className={styles.leftBannerTweetText}>推文</p></button>
    </div>
  )
}
