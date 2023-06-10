import styles from './AdminTweetsListTitle.module.scss'

export default function AdminTweetsListTitle() {
  return (
    <div className={styles.prevPageContainer}>
      <div className={styles.prevPageWrapper}>
        <div className={styles.prevPageWordsWrapper}>推文清單</div>
      </div>
    </div>
  )
}