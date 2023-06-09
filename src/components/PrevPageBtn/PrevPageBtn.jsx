import styles from './PrevPageBtn.module.scss'
import leftArrow from 'icons/leftArrow.svg'

export default function PrePageBtn() {
  return (
    <div className={styles.prevPageContainer}>
      <button className={styles.prevPageBtn}>
        <div className={styles.prevPageWrapper}>
          <div>
            <img src={leftArrow} alt="leftArrow.svg" />
          </div>
          <div className={styles.prevPageWordsWrapper}>
            <p className={styles.topUserName}>name</p>
            <p className={styles.topUserTweetCount}>tweetCount</p>
          </div>
        </div>
      </button>
    </div>
  )
}