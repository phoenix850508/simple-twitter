import styles from "./ReplyCollectionUser.module.scss";
import { useState, useEffect, useContext } from 'react';
import ReplyItem from "components/ReplyItem/ReplyItem.jsx";
// 引用封裝好的 Context 資訊
import { AuthContext } from 'context/AuthContext.jsx';

export default function ReplyCollection({ replies }) {
  // 使用蟲洞從 authContext.js 拿資料：使用者資訊
  const { userInfo } = useContext(AuthContext);

  return (
    <div className={styles.replyCollectionContainer}>
      {replies.map((reply) => {
        const { name, account, avatar } = userInfo
        const { id, comment, createdAt } = reply
        const replyTo = reply.Tweet.User.account
        return (
          <ReplyItem
            key={id}
            name={name}
            account={account}
            comment={comment}
            createdAt={createdAt}
            replyTo={replyTo}
          />
        );
      })}
    </div>
  )
}
