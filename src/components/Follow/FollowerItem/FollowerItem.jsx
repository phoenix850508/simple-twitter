// 還沒串資料
import styles from "./FollowerItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import following from 'icons/following.svg'
import follow from 'icons/follow.svg'

export default function FollowerItem({ avatar, name, introduction, isFollowed }) {
  return (
    <div className={styles.followerItemContainer}>
      <div className={styles.followerItemWrapper}>
        <div>
          <img className={styles.avatar} src={avatar ? avatar : avatarDefaultMini} alt='avatar' />
        </div>
        <div className={styles.followerItemInfoWrapper}>
          <div className={styles.followerItemNameFollowWrapper}>
            <div className={styles.followerItemName}>{name}</div>
            <button className={styles.followerItemFollowBtn}>
              {isFollowed ? <img src={following} alt="following.svg" /> : <img src={follow} alt="follow.svg" />}
            </button>
          </div>
          <div className={styles.followerItemIntro}>{introduction}</div>
        </div>
      </div>
    </div>
  )
}