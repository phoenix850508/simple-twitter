import TopTweetButton from './TopTweetComponents/TopTweetButton'
import UserTweetPhoto from './TopTweetComponents/UserTweetPhoto'
import styles from './TopTweetSection.module.scss'
import TopTweetModal from './TopTweetComponents/TopTweetModal'
import {useState} from 'react'

export default function TopTweetSection() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      <TopTweetModal  show={show} handleClose={handleClose} />
    </div>
  )
} 

export const handleTweetClick = (e) => {
  if(!e.target.className.includes("TopTweetSection")) return 

}