import { useNavigate } from 'react-router-dom';
import styles from "./TweetItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import like from 'icons/like.svg'
// likeActive 暫時沒用到先註解掉
// import likeActive from 'icons/likeActive.svg'
// 引用封裝好的 Context 資訊
import { useAuth } from 'context/authContext.js';


export default function TweetItem({ id, name, account, description, createdAt, replyCount, likeCount }) {
  const navigate = useNavigate();
  // 使用蟲洞從 authContext.js 拿資料：setTweetID
  const { setTweetId } = useAuth();

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
          {/* 點擊可跳轉 replylist 頁面 */}
          <button
            className={styles.tweetItemInfoContentWrapper}
            onClick={() => {
              // 在 Context 用 state 管理，把該推文 ID 存起來
              setTweetId(id)
              console.log('TweetItem 裡的推文 id: ', id)
              navigate('/replylist')
            }}>
            <p className={styles.tweetItemInfoContent}>{description}</p>
          </button>
          <div className={styles.tweetItemInfoBottom}>
            <div className={styles.tweetItemInfoBottomDiscussion}>
              <img src={discussion} alt="discussion.svg" />
              <div className={styles.tweetDiscussionNum}>{replyCount}</div>
            </div>
            <div className={styles.tweetItemInfoBottomLike}>
              <img src={like} alt="like.svg" />
              <div className={styles.tweetLikeNum}>{likeCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}