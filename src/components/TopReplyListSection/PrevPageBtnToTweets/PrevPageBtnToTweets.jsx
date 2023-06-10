import styles from './PrevPageBtnToTweets.module.scss'
import leftArrow from 'icons/leftArrow.svg'

export default function PrevPageBtnToTweets() {
  return (
    <div className={styles.prevPageContainer}>
      <button className={styles.prevPageBtn}>
        <div className={styles.prevPageWrapper}>
          <div>
            <img src={leftArrow} alt="leftArrow.svg" />
          </div>
          <div className={styles.prevPageWordsWrapper}>推文</div>
        </div>
      </button>
    </div>
  )
}