import styles from "./ReplyCollection.module.scss";
// import { useState } from 'react';
import ReplyItem from "components/ReplyItem/ReplyItem.jsx";
// import dummyReplies from "./dummyReplies"; 假資料，目前不會用到
// 引用封裝好的 Context 資訊
import { useAuth } from 'context/authContext.js';

export default function ReplyCollection() {
  // 使用蟲洞從 authContext.js 拿資料：tweetID 與底下回覆
  const { tweetReplyList } = useAuth();

  return (
    <div className={styles.replyCollectionContainer}>
      {tweetReplyList.map((reply) => {
        const { name, account, avatar } = reply.User
        const { id, comment, createdAt } = reply
        return (
          <ReplyItem
            key={id}
            name={name}
            account={account}
            comment={comment}
            createdAt={createdAt}
          />
        );
      })}
    </div>
  )
}