import styles from './TopReplyListSection.module.scss'
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import like from 'icons/like.svg'
import likeActive from 'icons/likeActive.svg'
import PrevPageBtnToTweets from './PrevPageBtnToTweets/PrevPageBtnToTweets'

export default function TopReplyListSection({ singleTweetInfo }) {
  // 該篇推文資訊，可直接解析
  const { description, updatedAt, replyCount, likeCount, isLiked } = singleTweetInfo
  // 原以為是 useEffect 出錯結果問題出在下面這行，若直接寫則整個 API 完全不會動
  // const { avatar, name, account } = singleTweetInfo.User

  let userAvatar = ''
  let userName = ''
  let userAccount = ''

  // 不太確定為什麼會需要繞一圈才取得到 User 內的值？？？
  if (singleTweetInfo && singleTweetInfo.User) {
    const { avatar, name, account } = singleTweetInfo.User;
    // 其他操作
    userAvatar = avatar
    userName = name
    userAccount = account
  }

  return (
    <>
      <PrevPageBtnToTweets />
      <div className={styles.tweetItemContainer}>
        <div className={styles.tweetItemWrapper}>
          <div className={styles.tweetItemInfoWrapper}>
            <div>
              <img className={styles.avatar} src={userAvatar} alt={avatarDefaultMini} />
            </div>
            <div className={styles.tweetItemInfoUser}>
              <div className={styles.tweetItemInfoUserName}>{userName}</div>
              <div className={styles.tweetItemInfoUserAccount}>@{userAccount}</div>
            </div>
          </div>
          <div className={styles.tweetItemInfoContent}>{description}</div>
          <div className={styles.tweetItemInfoTimeWrapper}>{updatedAt}</div>
          <div className={styles.tweetItemInfoCountWrapper}>
            <div>
              <span className={styles.tweetCount}>{replyCount}</span><span className={styles.tweetWord}>回覆</span>
            </div>
            <div className={styles.tweetLikeCountWrapper}>
              <span className={styles.tweetCount}>{likeCount}</span><span className={styles.tweetWord}>喜歡次數</span>
            </div>
          </div>
          <div className={styles.tweetItemIconWrapper}>
            <img className={styles.tweetItemIcon} src={discussion} alt="discussion.svg" />
            {isLiked ? <img className={styles.tweetItemIcon} src={likeActive} alt="likeActive.svg" /> : <img className={styles.tweetItemIcon} src={like} alt="like.svg" />}
          </div>
        </div>
      </div>
    </>
  )
}