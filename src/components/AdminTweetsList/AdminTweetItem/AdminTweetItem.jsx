import styles from "./AdminTweetItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import crossDark from 'icons/crossDark.svg'

export default function AdminTweetItem({ id, name, account, description, createdAt, avatar, handleDeleteClick }) {
  // 拿 authToken
  const authToken = localStorage.getItem("authToken");
  return (
    <div className={styles.tweetItemContainer}>
      <div className={styles.tweetItemWrapper}>
        <button
          className={styles.tweetItemCrossBtn}
          onClick={() => { handleDeleteClick(authToken, id) }}
        >
          <img src={crossDark} alt="crossDark.svg" />
        </button>
        <div>
          <img className={styles.avatar} src={avatar} alt={avatarDefaultMini} />
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