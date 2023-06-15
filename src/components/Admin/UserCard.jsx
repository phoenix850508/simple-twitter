import feather from 'icons/feather.svg'
import like from 'icons/like.svg'
import styles from './UserCard.module.scss'

export default function UserCard({avatar, background, name, account, tweetCount, likeCount, followersCount, followingCount}) {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img className={styles.backgroundImg} src={background} alt="background-img" />
        <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={avatar} alt="avatar-img" />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <span className={styles.userName}>John Doe</span>
        <div className={styles.account}>@heyjohn</div>
        <div className={styles.actionIcons}>
          <div className={styles.tweetCountContainer}>
            <img src={feather} alt="feather.svg" />
            <span className={styles.tweetCount}>1.5k</span>
          </div>
          <div className={styles.likeContainer}>
            <img src={like} alt="like.svg" />
            <span className={styles.likeCount}>20k</span>
          </div>
        </div>
        <div className={styles.followContainer}>
          <div className={styles.followingContainer}>
            <span className={styles.followCount}>34個</span>
            <span className={styles.followUnit}>追蹤者</span>
          </div>
          <div className={styles.followerContainer}>
            <span className={styles.followCount}>59位</span>
            <span className={styles.followUnit}>跟隨者</span>
          </div>
        </div>
      </div>
    </div>
  )
}