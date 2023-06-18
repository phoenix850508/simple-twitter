// LikeCollection 的 layout 跟 TweetCollection 一樣
import styles from "./LikeCollection.module.scss";
// import { useState } from 'react';
import LikeItem from "components/LikeItem/LikeItem.jsx";
// import dummyTweets from "./dummyTweets";
import clsx from 'clsx'

export default function LikeCollection({ likes, userDetail }) {
  return (
    <div className={clsx({[styles.tweetCollectionContainer]: likes}, styles.noBorder)}>
      {likes? (likes.map((likedTweet) => {
        const { shortDescription, createdAt } = likedTweet
        const {UserId} = likedTweet.Tweet
        let { name, account, avatar } = likedTweet.Tweet.User
        // 這邊先確認likedTweet有get到資料
        if(likedTweet) {
        // 假如喜歡的某個發的tweet剛好是自己，需要把名字和大頭貼換成最新，否則資料不會即時更新
        if(userDetail && UserId === userDetail.id) {
          avatar =  userDetail.avatar
          name = userDetail.name
        }
        }
        const { id } = likedTweet.Tweet
        const {replyCount, likeCount} = likedTweet
        return (
          <LikeItem
            key={id}
            id={id}
            name={name}
            account={account}
            description={shortDescription}
            createdAt={createdAt}
            replyCount={replyCount}
            likeCount={likeCount}
            avatar={avatar}
          />
        );
      })) : (
        <div className={styles.margin}>
          <div></div>
          <span>（尚未喜歡任何內容）</span>
        </div>
      )}
    </div>
  )
}