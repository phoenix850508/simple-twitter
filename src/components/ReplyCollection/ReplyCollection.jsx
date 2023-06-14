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

  return (
    <div className={styles.replyCollectionContainer}>
      {tweetReplyList.map((reply) => {
        const { id, comment, createdAt } = reply

        let userAvatar = ''
        let userName = ''
        let userAccount = ''
        let replyTo = ''

        // 不太確定為什麼會需要繞一圈才取得到 User 內的值？？？
        if (reply && reply.User) {
          const { avatar, name, account } = reply.User;
          // 其他操作
          userAvatar = avatar
          userName = name
          userAccount = account
        }

        // const replyTo = singleTweetInfo.User.account
        // 回覆對象即該推文發文者，從父元件另外撈
        if (singleTweetInfo && singleTweetInfo.User) {
          const { account } = singleTweetInfo.User;
          // 其他操作
          replyTo = account
        }

        return (
          <ReplyItem
            key={id}
            name={userName}
            account={userAccount}
            avatar={userAvatar}
            comment={comment}
            createdAt={createdAt}
            replyTo={replyTo}
          />
        );
      })}
    </div>
  )
}
