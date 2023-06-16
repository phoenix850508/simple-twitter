// LikeCollection 的 layout 跟 TweetCollection 一樣
import styles from "./LikeCollection.module.scss";
// import { useState } from 'react';
import LikeItem from "components/LikeItem/LikeItem.jsx";
// import dummyTweets from "./dummyTweets";

export default function LikeCollection({ likes }) {

  return (
    <div className={styles.tweetCollectionContainer}>
      {likes ? (likes.map((likedTweet) => {
        const { shortDescription, createdAt } = likedTweet
        const { name, account, avatar } = likedTweet.Tweet.User
        const { id, replyCount, likeCount } = likedTweet.Tweet
        return (
          <LikeItem
            key={id}
            id={id}
            name={name}
            account={account}
            description={shortDescription}
            createdAt={createdAt}
            replyCount={replyCount}
            likeCount={likeCount}
            avatar={avatar}
          />
        );
      })) : '（使用者尚未喜歡任何內容）'}
    </div>
  )
}