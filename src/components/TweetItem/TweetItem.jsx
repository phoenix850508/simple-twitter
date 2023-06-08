import styles from "./TweetItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import like from 'icons/like.svg'
import likeActive from 'icons/likeActive.svg'

export default function TweetItem() {
  return (
    <div className={styles.tweetItemContainer}>
      <div className={styles.tweetItemWrapper}>
        <div>
          <img src={avatarDefaultMini} alt="avatarDefaultMini.svg" />
        </div>
        <div className={styles.tweetItemInfoWrapper}>
          <div className={styles.tweetItemInfoUser}>
            <div className={styles.tweetItemInfoUserName}>name</div>
            <div className={styles.tweetItemInfoUserDetail}>@account・3 小時</div>
          </div>
          <div className={styles.tweetItemInfoContentWrapper}>
            <p className={styles.tweetItemInfoContent}>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.</p>
          </div>
          <div className={styles.tweetItemInfoBottom}>
            <div className={styles.tweetItemInfoBottomDiscussion}>
              <img src={discussion} alt="discussion.svg" />
              <div className={styles.tweetDiscussionNum}>13</div>
            </div>
            <div className={styles.tweetItemInfoBottomLike}>
              <img src={like} alt="like.svg" />
              <div className={styles.tweetLikeNum}>76</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}