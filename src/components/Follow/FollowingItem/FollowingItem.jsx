// 還沒串資料
import styles from "./FollowingItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import following from 'icons/following.svg'
import follow from 'icons/follow.svg'

export default function FollowingItem() {
  return (
    <div className={styles.followerItemContainer}>
      <div className={styles.followerItemWrapper}>
        <div>
          <img src={avatarDefaultMini} alt="avatarDefaultMini.svg" />
        </div>
        <div className={styles.followerItemInfoWrapper}>
          <div className={styles.followerItemNameFollowWrapper}>
            <div className={styles.followerItemName}>Apple</div>
            <button className={styles.followerItemFollowBtn}>
              <img src={following} alt="following.svg" />
            </button>
          </div>
          <div className={styles.followerItemIntro}>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. </div>
        </div>
      </div>
    </div>
  )
}