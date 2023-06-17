import styles from "./ReplyCollection.module.scss";
import { useState, useEffect } from 'react';
import ReplyItem from "components/ReplyItem/ReplyItem.jsx";


export default function ReplyCollection({ tweetReplyList, replyTo }) {
  console.log('ReplyCollection 裡的 tweetReplyList: ', tweetReplyList)
  const [arrayData, setArrayData] = useState([])
  useEffect(() => {
    setArrayData(tweetReplyList)
  }, [tweetReplyList])

  return (
    <div className={styles.replyCollectionContainer}>
      {arrayData.length !== 0 ? (arrayData && arrayData.map((reply) => {
        return <ReplyItem
          key={reply.id}
          name={reply.User.name}
          account={reply.User.account}
          avatar={reply.User.avatar}
          comment={reply.comment}
          createdAt={reply.createdAt}
          replyTo={replyTo}
        />
      })) : (
        <div className={styles.margin}>
          <div></div>
          <span>（尚未有任何回覆）</span>
        </div>
      )}
    </div>
  )
}
