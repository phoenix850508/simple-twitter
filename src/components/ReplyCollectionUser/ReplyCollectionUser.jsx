import styles from "./ReplyCollectionUser.module.scss";
// import { useState, useEffect, useContext } from 'react';
import ReplyItem from "components/ReplyItem/ReplyItem.jsx";


export default function ReplyCollection({ replies, userDetail }) {

  return (
    <div className={styles.replyCollectionContainer}>
      {replies ? (replies.map((reply) => {
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
      })) : (
        <div className={styles.margin}>
          <div></div>
          <span>（尚未回覆任何推文）</span>
        </div>
      )}
    </div>
  )
}
