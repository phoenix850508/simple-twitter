import styles from "./TweetCollection.module.scss";
import TweetItem from "components/TweetItem/TweetItem.jsx";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'


export default function TweetCollection({ tweets, fromPage }) {
  return (
    <div className={styles.tweetCollectionContainer}>
      {tweets.length !== 0 ? (tweets.map((tweet) => {
        const { name, account, avatar } = tweet.User
        const { id, UserId, description, createdAt, replyCount, likeCount, isLiked } = tweet
        return (
          <TweetItem
            key={id}
            id={id}
            UserId={UserId}
            name={name}
            account={account}
            description={description}
            createdAt={createdAt}
            replyCount={replyCount}
            likeCount={likeCount}
            avatar={avatar ? avatar : avatarDefaultMini}
            isLiked={isLiked}
            fromPage={fromPage}
          />
        );
      })) : (
        <div className={styles.margin}>
          <div></div>
          <span>（尚未發佈任何推文）</span>
        </div>
      )}
    </div>
  )
}