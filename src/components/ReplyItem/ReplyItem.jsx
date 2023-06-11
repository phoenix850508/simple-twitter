// 要記得更新回覆對象的 API
import styles from "./ReplyItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'

export default function ReplyItem({ name, account, comment, createdAt, replyTo }) {
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
          <div>
            <span className={styles.replyItemInfoTo}>回覆</span><span className={styles.replyItemInfoToAccount}> @{replyTo}</span>
          </div>
          <div className={styles.replyItemInfoContentWrapper}>
            <p className={styles.replyItemInfoContent}>{comment}</p>
          </div>
        </div>
      </div>
    </div>
  )
}