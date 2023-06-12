import styles from "./ReplyCollectionUser.module.scss";
import { useState, useEffect, useContext } from 'react';
import ReplyItem from "components/ReplyItem/ReplyItem.jsx";
// 引用封裝好的 Context 資訊
import { AuthContext } from 'context/AuthContext.jsx';

export default function ReplyCollection({ replies, userDetail }) {

  return (
    <div className={styles.replyCollectionContainer}>
      {replies.map((reply) => {
        const { name, account, avatar } = userDetail
        const { id, comment, createdAt } = reply
        const replyTo = reply.Tweet.User.account
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
