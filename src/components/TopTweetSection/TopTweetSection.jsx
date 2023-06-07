import TopTweetButton from './topTweetComponents/TopTweetButton'
import UserTweetPhoto from './topTweetComponents/UserTweetPhoto'
import styles from './TopTweetSection.module.scss'

export default function TopTweetSection() {
  return (
    <div className={styles.topTweetContainer}>
      <section className={styles.homepageHeaderSec}>
        <h4>首頁</h4>
      </section>
      <section className={styles.postingSec}>
        <div className={styles.posting}>
          <UserTweetPhoto />
          <h5 className={styles.placeholder}>有什麼新鮮事？</h5>
        </div>
        <div className={styles.btnContainer}>
          <TopTweetButton />
        </div>
      </section>

    </div>
  )
} 