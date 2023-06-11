import TopTweetButton from './TopTweetComponents/TopTweetButton'
import UserTweetPhoto from './TopTweetComponents/UserTweetPhoto'
import styles from './TopTweetSection.module.scss'
import TopTweetModal from './TopTweetComponents/TopTweetModal'
import {useState} from 'react'
import {postTweets} from 'api/tweets.js'
import clsx from 'clsx'

export default function TopTweetSection() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tweet, setTweet] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const handleSubmit = async () => {
    try { 
      if(isUpdating) return
      if(tweet.trim().length < 1 || tweet.length > 140) return alert("推文不能為空白")
      setTimeout(() => setIsUpdating(true), 1000)
      const res = await postTweets({description: tweet})
      //若新增推文成功
      if (res) {
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
      <TopTweetModal show={show} handleClose={handleClose} onChange={(tweetInput) => setTweet(tweetInput)} value={tweet} onSubmit={handleSubmit} buttonText={clsx({'推文': !isUpdating}, {'處理中': isUpdating})} />
    </div>
  )
} 

export const handleTweetClick = (e) => {
  if(!e.target.className.includes("TopTweetSection")) return 

}