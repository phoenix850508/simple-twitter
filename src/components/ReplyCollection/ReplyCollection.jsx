import styles from "./ReplyCollection.module.scss";
// import { useState, useEffect, useContext } from 'react';
import ReplyItem from "components/ReplyItem/ReplyItem.jsx";
// import dummyReplies from "./dummyReplies"; 假資料，目前不會用到
// 引用封裝好的 Context 資訊
// import { AuthContext } from 'context/AuthContext.jsx';
// API
// import { getUserReplies } from 'api/tweets'

export default function ReplyCollection({ tweetReplyList, singleTweetInfo }) {

  console.log('ReplyCollection 裡的 tweetReplyList: ', tweetReplyList)

  // useEffect(() => {
  //   const getUserRepliesAsync = async () => {
  //     try {
  //       const response = await getUserReplies()
  //       console.log(response)
  //       setReplies(response.data)
  //     } catch (error) {
  //       console.error("[Get User Replies failed]: ", error)
  //     }
  //   }
  //   getUserRepliesAsync()
  // }, [currentUser])

  return (
    <div className={styles.replyCollectionContainer}>
      {tweetReplyList.map((reply) => {
        const { name, account, avatar } = reply.User
        const { id, comment, createdAt } = reply
        const replyTo = singleTweetInfo.User.account
        // 回覆對象即該推文發文者，從父元件另外撈

        return (
          <ReplyItem
            key={id}
            name={name}
            account={account}
            avatar={avatar}
            comment={comment}
            createdAt={createdAt}
            replyTo={replyTo}
          />
        );
      })}
    </div>
  )
}
