// LikeCollection 的 layout 跟 TweetCollection 一樣
import styles from "./LikeCollection.module.scss";
// import { useState } from 'react';
import LikeItem from "components/LikeItem/LikeItem.jsx";
// import dummyTweets from "./dummyTweets";

export default function LikeCollection({ likes }) {

  return (
    <div className={styles.tweetCollectionContainer}>
      {likes? (likes.map((likedTweet) => {
        const { shortDescription, createdAt } = likedTweet
        const { name, account, avatar } = likedTweet.Tweet.User
        const { id } = likedTweet.Tweet
        const {replyCount, likeCount} = likedTweet
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
      })) : (
        <div className={styles.margin}>
          <div></div>
          <span>（尚未喜歡任何內容）</span>
        </div>
      )}
    </div>
  )
}