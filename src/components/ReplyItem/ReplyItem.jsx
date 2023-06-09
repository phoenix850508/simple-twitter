import styles from "./ReplyItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'

export default function ReplyItem({ name, account, description, createdAt }) {
  return (
    <div className={styles.replyItemContainer}>
      <div className={styles.replyItemWrapper}>
        <div>
          <img src={avatarDefaultMini} alt="avatarDefaultMini.svg" />
        </div>
        <div className={styles.replyItemInfoWrapper}>
          <div className={styles.replyItemInfoUser}>
            <div className={styles.replyItemInfoUserName}>{name}</div>
            <div className={styles.replyItemInfoUserDetail}>@{account}・{createdAt}</div>
          </div>
          <div className={styles.replyItemInfoContentWrapper}>
            <p className={styles.replyItemInfoContent}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}