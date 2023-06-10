import styles from "./AdminTweetItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import crossDark from 'icons/crossDark.svg'

export default function AdminTweetItem({ name, account, description, createdAt }) {
  return (
    <div className={styles.tweetItemContainer}>
      <div className={styles.tweetItemWrapper}>
        <button className={styles.tweetItemCrossBtn} >
          <img src={crossDark} alt="crossDark.svg" />
        </button>
        <div>
          <img src={avatarDefaultMini} alt="avatarDefaultMini.svg" />
        </div>
        <div className={styles.tweetItemInfoWrapper}>
          <div className={styles.tweetItemInfoUser}>
            <div className={styles.tweetItemInfoUserName}>{name}</div>
            <div className={styles.tweetItemInfoUserDetail}>@{account}・{createdAt}</div>
          </div>
          <div className={styles.tweetItemInfoContentWrapper}>
            <p className={styles.tweetItemInfoContent}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}