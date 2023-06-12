import TopTweetButton from './TopTweetComponents/TopTweetButton'
import UserTweetPhoto from './TopTweetComponents/UserTweetPhoto'
import styles from './TopTweetSection.module.scss'
import TopTweetModal from './TopTweetComponents/TopTweetModal'
import {useState, useContext} from 'react'
import { AuthContext } from 'context/AuthContext.jsx'
import clsx from 'clsx'

export default function TopTweetSection() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tweet, setTweet] = useState('')
  const [errorMsg, setErrorMsg] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const { postTweets } = useContext(AuthContext);
  const handleSubmit = async () => {
    try { 
      if(isUpdating) return
      if(tweet.length > 140) return
      if(tweet.trim().length < 1) return setErrorMsg(true)
      setTimeout(() => setIsUpdating(true), 1000)
      const res = await postTweets({description: tweet})
      //若新增推文成功
      if (res) {
        setShow(false)
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
    <div className={styles.topTweetContainer}>
      <section className={styles.homepageHeaderSec}>
        <h4>首頁</h4>
      </section>
      <section className={styles.postingSec} onClick={handleShow}>
        <div className={styles.posting}>
          <UserTweetPhoto />
          <h5 className={styles.placeholder}>有什麼新鮮事？</h5>
        </div>
        <div className={styles.btnContainer}>
          <TopTweetButton text={"推文"} />
        </div>
      </section>
      <TopTweetModal 
      show={show} 
      handleClose={handleClose} 
      onChange={(tweetInput) => {
        setErrorMsg(false)
        setTweet(tweetInput)
      }} 
      value={tweet} onSubmit={handleSubmit} buttonText={clsx({'推文': !isUpdating}, {'處理中': isUpdating})} 
      borderLine={clsx('', {[styles.wordLengthError]: tweet.length > 140}, {[styles.emptyTweetError]: errorMsg})} />
    </div>
  )
} 

// export const handleTweetClick = (e) => {
//   if(!e.target.className.includes("TopTweetSection")) return 

// }