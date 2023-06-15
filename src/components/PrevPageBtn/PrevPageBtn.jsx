import { useNavigate } from 'react-router-dom';
import styles from './PrevPageBtn.module.scss'
import leftArrow from 'icons/leftArrow.svg'

export default function PrePageBtn({ toPage, name, tweetCount }) {
  const navigate = useNavigate();

  const onPrevPageClick = () => {
    navigate(toPage)
  }

  return (
    <div className={styles.prevPageContainer}>
      <button
        className={styles.prevPageBtn}
        onClick={() => { onPrevPageClick() }}
      >
        <div className={styles.prevPageWrapper}>
          <div>
            <img src={leftArrow} alt="leftArrow.svg" />
          </div>
          <div className={styles.prevPageWordsWrapper}>
            <p className={styles.topUserName}>{name}</p>
            <p className={styles.topUserTweetCount}>{tweetCount} 推文</p>
          </div>
        </div>
      </button>
    </div>
  )
}