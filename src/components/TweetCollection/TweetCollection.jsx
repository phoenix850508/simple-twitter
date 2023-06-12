import styles from "./TweetCollection.module.scss";
import { useState } from 'react';
import TweetItem from "components/TweetItem/TweetItem.jsx";
// import dummyTweets from "./dummyTweets";

export default function TweetCollection({ tweets }) {

  return (
    <div className={styles.tweetCollectionContainer}>
      {tweets.map((tweet) => {
        const { name, account, avatar } = tweet.User
        const { id, UserId, description, createdAt, replyCount, likeCount } = tweet
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
            avatar={avatar}
          />
        );
      })}
    </div>
  )
}