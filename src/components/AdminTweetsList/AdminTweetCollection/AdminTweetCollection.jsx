import styles from "./AdminTweetCollection.module.scss";
import { useState, useEffect } from 'react';
import AdminTweetItem from "components/AdminTweetsList/AdminTweetItem/AdminTweetItem.jsx";
// import dummyTweets from "./dummyTweets";
// API
import { getAllTweetsAdmin, deleteTweetAdmin } from 'api/tweets';

export default function AdminTweetCollection() {
  // tweets 存在這
  const [tweets, setTweets] = useState([]);

  // 撈所有推文的 API
  const getAllTweetsAdminAsync = async () => {
    try {
      const tweets = await getAllTweetsAdmin();
      setTweets(tweets.map((tweet) => ({ ...tweet })));
    } catch (error) {
      console.error(error);
    }
  };

  // 刪除推文的 API
  const deleteTweetAdminAsync = async (authToken, id) => {
    try {
      const res = await deleteTweetAdmin(authToken, id);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };


  // 刪除推文邏輯，要記得用 async 不然有時刪除並不會即時消失，因為發了兩個請求不確定哪個先回來
  async function handleDeleteClick(authTokenReceived, idReceived) {
    await deleteTweetAdminAsync(authTokenReceived, idReceived)
    await getAllTweetsAdminAsync()
  }

  // 透過 API 撈初始資料：管理員可見的全部推文
  useEffect(() => {
    getAllTweetsAdminAsync();
  }, []);

  return (
    <div className={styles.tweetCollectionContainer}>
      {tweets.map((tweet) => {
        const { name, account, avatar } = tweet.User
        const { id, description, createdAt, replyCount, likeCount } = tweet
        return (
          <AdminTweetItem
            key={id}
            id={id}
            name={name}
            account={account}
            description={description}
            createdAt={createdAt}
            replyCount={replyCount}
            likeCount={likeCount}
            avatar={avatar}
            handleDeleteClick={handleDeleteClick}
          />
        );
      })}
    </div>
  )
}