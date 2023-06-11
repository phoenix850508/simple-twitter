import styles from "./TweetCollection.module.scss";
import { useState } from 'react';
import TweetItem from "components/TweetItem/TweetItem.jsx";
// import dummyTweets from "./dummyTweets";

export default function TweetCollection({ tweets }) {

  return (
    <div className={styles.tweetCollectionContainer}>
      {tweets.map((tweet) => {
        const { name, account, avatar } = tweet.User
        const { id, description, createdAt, replyCount, likeCount } = tweet
        return (
          <TweetItem
            key={id}
            id={id}
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