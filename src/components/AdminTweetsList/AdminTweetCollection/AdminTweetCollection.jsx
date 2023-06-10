import styles from "./AdminTweetCollection.module.scss";
import { useState } from 'react';
import AdminTweetItem from "components/AdminTweetsList/AdminTweetItem/AdminTweetItem.jsx";
import dummyTweets from "./dummyTweets";

export default function AdminTweetCollection() {
  const [tweets, setTweets] = useState(dummyTweets);

  return (
    <div className={styles.tweetCollectionContainer}>
      {tweets.map((tweet) => {
        const { name, account, avatar } = tweet.users
        const { id, description, createdAt, replyCount, likeCount } = tweet.tweets
        return (
          <AdminTweetItem
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