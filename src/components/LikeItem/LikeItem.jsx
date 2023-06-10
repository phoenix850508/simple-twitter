// LikeItem 的 layout 跟 TweetItem 一樣
// 之後要寫邏輯判斷是否為 like、發文者資訊
import styles from "./LikeItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import likeActive from 'icons/likeActive.svg'

export default function LikeItem({ name, account, description, createdAt, replyCount, likeCount }) {
  return (
    <div className={styles.tweetItemContainer}>
      <div className={styles.tweetItemWrapper}>
        <div>
          <img src={avatarDefaultMini} alt="avatarDefaultMini.svg" />
        </div>
        <div className={styles.tweetItemInfoWrapper}>
          <div className={styles.tweetItemInfoUser}>
            <div className={styles.tweetItemInfoUserName}>{name}</div>
            <div className={styles.tweetItemInfoUserDetail}>@{account}・{createdAt}</div>
          </div>
          <div className={styles.tweetItemInfoContentWrapper}>
            <p className={styles.tweetItemInfoContent}>{description}</p>
          </div>
          <div className={styles.tweetItemInfoBottom}>
            <div className={styles.tweetItemInfoBottomDiscussion}>
              <img src={discussion} alt="discussion.svg" />
              <div className={styles.tweetDiscussionNum}>{replyCount}</div>
            </div>
            <div className={styles.tweetItemInfoBottomLike}>
              <img src={likeActive} alt="likeActive.svg" />
              <div className={styles.tweetLikeNum}>{likeCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}