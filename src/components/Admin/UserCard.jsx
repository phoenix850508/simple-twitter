import feather from 'icons/feather.svg'
import like from 'icons/like.svg'
import styles from './UserCard.module.scss'
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import dummyBackgroundImage from 'icons/dummyBackgroundImage.svg'

export default function UserCard({ avatar, background, name, account, tweetsCount, likesCount, followersCount, followingsCount }) {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img className={styles.backgroundImg} src={background ? background : dummyBackgroundImage} alt="background-img" />
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={avatar ? avatar : avatarDefaultMini} alt="avatar-img" />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <span className={styles.userName}>{name}</span>
        <div className={styles.account}>@{account}</div>
        <div className={styles.actionIcons}>
          <div className={styles.tweetCountContainer}>
            <img src={feather} alt="feather.svg" />
            <span className={styles.tweetCount}>{tweetsCount}</span>
          </div>
          <div className={styles.likeContainer}>
            <img src={like} alt="like.svg" />
            <span className={styles.likeCount}>{likesCount}</span>
          </div>
        </div>
        <div className={styles.followContainer}>
          <div className={styles.followingContainer}>
            <span className={styles.followCount}>{followingsCount}個</span>
            <span className={styles.followUnit}>跟隨中</span>
          </div>
          <div className={styles.followerContainer}>
            <span className={styles.followCount}>{followersCount}位</span>
            <span className={styles.followUnit}>跟隨者</span>
          </div>
        </div>
      </div>
    </div>
  )
}