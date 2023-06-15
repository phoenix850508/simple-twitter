import { useNavigate } from 'react-router-dom';
import styles from './PrevPageBtnToTweets.module.scss'
import leftArrow from 'icons/leftArrow.svg'

export default function PrevPageBtnToTweets() {
  const navigate = useNavigate();

  // 讓 fromPage 決定要回到哪個頁面
  const onPrevPageClick = () => {
    navigate(localStorage.getItem("fromPage"))
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
          <div className={styles.prevPageWordsWrapper}>推文</div>
        </div>
      </button>
    </div>
  )
}