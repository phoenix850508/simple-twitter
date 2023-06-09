import styles from "./ReplyCollection.module.scss";
import { useState } from 'react';
import ReplyItem from "components/ReplyItem/ReplyItem.jsx";
import dummyReplies from "./dummyReplies";

export default function ReplyCollection() {
  const [replies, setReplies] = useState(dummyReplies);

  return (
    <div className={styles.replyCollectionContainer}>
      {replies.map((reply) => {
        const { name, account, avatar } = reply.users
        const { id, description, createdAt } = reply.replies
        return (
          <ReplyItem
            key={id}
            name={name}
            account={account}
            description={description}
            createdAt={createdAt}
          />
        );
      })}
    </div>
  )
}