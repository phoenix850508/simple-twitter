import styles from './TopReplyListSection.module.scss'
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import like from 'icons/like.svg'
import PrevPageBtnToTweets from './PrevPageBtnToTweets/PrevPageBtnToTweets'

export default function TopReplyListSection() {
  return (
    <>
      <PrevPageBtnToTweets />
      <div className={styles.tweetItemContainer}>
        <div className={styles.tweetItemWrapper}>
          <div className={styles.tweetItemInfoWrapper}>
            <div>
              <img src={avatarDefaultMini} alt="avatarDefaultMini.svg" />
            </div>
            <div className={styles.tweetItemInfoUser}>
              <div className={styles.tweetItemInfoUserName}>name</div>
              <div className={styles.tweetItemInfoUserAccount}>@account</div>
            </div>
          </div>
          <div className={styles.tweetItemInfoContent}>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt.</div>
          <div className={styles.tweetItemInfoTimeWrapper}>上午 10:05・2021年11月10日</div>
          <div className={styles.tweetItemInfoCountWrapper}>
            <div>
              <span className={styles.tweetCount}>34</span><span className={styles.tweetWord}>回覆</span>
            </div>
            <div className={styles.tweetLikeCountWrapper}>
              <span className={styles.tweetCount}>808</span><span className={styles.tweetWord}>喜歡次數</span>
            </div>
          </div>
          <div className={styles.tweetItemIconWrapper}>
            <img className={styles.tweetItemIcon} src={discussion} alt="discussion.svg" />
            <img className={styles.tweetItemIcon} src={like} alt="like.svg" />
          </div>
        </div>
      </div>
    </>
  )
}