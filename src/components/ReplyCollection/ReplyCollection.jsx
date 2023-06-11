import styles from "./ReplyCollection.module.scss";
import { useState, useEffect } from 'react';
import ReplyItem from "components/ReplyItem/ReplyItem.jsx";
import {getUserReplies} from 'api/tweets'
import {useAuth} from 'context/authContext'

export default function ReplyCollection() {
  const [replies, setReplies] = useState(null);
  //這邊需要去看是否有登入，並且透過currentUser去取user id
  const {currentUser, isAuthenticated} = useAuth()
  useEffect(() => {
    const getUserRepliesAsync = async() => {
      try {
        const response = await getUserReplies()
        console.log(response)
        setReplies(response.data)
      } catch(error){
        console.error("[Get User Replies failed]: ", error)
      }
    }
    getUserRepliesAsync()
  }, [currentUser])
  return (
    <div className={styles.replyCollectionContainer}>
      {replies.map((reply) => {
        const name = "Me"
        const account = "MyAccount"
        const avatar = "MyAvatar"
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