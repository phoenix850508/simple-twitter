import styles from "./ReplyCollection.module.scss";
import { useState, useEffect } from 'react';
import ReplyItem from "components/ReplyItem/ReplyItem.jsx";
// import dummyReplies from "./dummyReplies"; 假資料，目前不會用到
// 引用封裝好的 Context 資訊
// import { AuthContext } from 'context/AuthContext.jsx';
// API
// import { getUserReplies } from 'api/tweets'

export default function ReplyCollection({ tweetReplyList, replyTo }) {
  console.log('ReplyCollection 裡的 tweetReplyList: ', tweetReplyList)
  const [arrayData, setArrayData] = useState([])
  useEffect(() => {
    setArrayData(tweetReplyList)
  },[tweetReplyList])

  return (
    <div className={styles.replyCollectionContainer}>
      {arrayData?( arrayData && arrayData.map((reply) => {
        return <ReplyItem
            key={reply.id}
            name={reply.User.name}
            account={reply.User.account}
            avatar={reply.User.avatar}
            comment={reply.comment}
            createdAt={reply.createdAt}
            replyTo={replyTo}
          />
      })) : '（此使用者尚未回覆任何推文）'}
    </div>
  )
}
