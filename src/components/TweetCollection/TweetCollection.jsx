import styles from "./TweetCollection.module.scss";
import TweetItem from "components/TweetItem/TweetItem.jsx";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'


export default function TweetCollection({ tweets, userDetail, fromPage }) {
  // userDetail帶入的參數是從localStorage取的，若有大頭貼、名字或是帳號更新，會同步更動
  return (
    <div className={styles.tweetCollectionContainer}>
      {tweets.length !== 0 ? (tweets.map((tweet) => {
        let { name, account, avatar } = tweet.User
        const { id, UserId, description, createdAt, replyCount, likeCount, isLiked } = tweet
        return (
          <TweetItem
            key={id}
            id={id}
            UserId={UserId}
            name={userDetail? userDetail.name : name}
            account={userDetail? userDetail.account : account}
            description={description}
            createdAt={createdAt}
            replyCount={replyCount}
            likeCount={likeCount}
            avatar={userDetail? userDetail.avatar : (avatar ? (avatar? avatar : avatarDefaultMini) : avatarDefaultMini)}
            isLiked={isLiked}
            fromPage={fromPage}
          />
        );
      })) : (
        <div className={styles.margin}>
          <div></div>
          <span>（尚未發佈任何推文）</span>
        </div>
      )}
    </div>
  )
}