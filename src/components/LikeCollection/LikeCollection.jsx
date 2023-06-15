// LikeCollection 的 layout 跟 TweetCollection 一樣
// 之後要寫邏輯判斷是否為 like、發文者資訊
import styles from "./LikeCollection.module.scss";
import { useState } from 'react';
import LikeItem from "components/LikeItem/LikeItem.jsx";
import dummyTweets from "./dummyTweets";

export default function LikeCollection({likes}) {

  return (
    <div className={styles.tweetCollectionContainer}>
      {likes.map((likedTweet) => {
        const {shortDescription} = likedTweet
        const { name, account, avatar } = likedTweet.Tweet.User
        const { id, createdAt, replyCount, likeCount } = likedTweet.Tweet
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
      })}
    </div>
  )
}