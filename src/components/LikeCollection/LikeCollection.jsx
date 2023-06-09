// LikeCollection 的 layout 跟 TweetCollection 一樣
// 之後要寫邏輯判斷是否為 like、發文者資訊
import styles from "./LikeCollection.module.scss";
import { useState } from 'react';
import LikeItem from "components/LikeItem/LikeItem.jsx";
import dummyTweets from "./dummyTweets";

export default function LikeCollection() {
  const [tweets, setTweets] = useState(dummyTweets);

  return (
    <div className={styles.tweetCollectionContainer}>
      {tweets.map((tweet) => {
        const { name, account, avatar } = tweet.users
        const { id, description, createdAt, replyCount, likeCount } = tweet.tweets
        return (
          <LikeItem
            key={id}
            name={name}
            account={account}
            description={description}
            createdAt={createdAt}
            replyCount={replyCount}
            likeCount={likeCount}
          />
        );
      })}
    </div>
  )
}