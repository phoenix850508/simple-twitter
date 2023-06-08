import styles from './TopUserSection.module.scss'
import dummyBackgroundImage from 'icons/dummyBackgroundImage.svg'
import dummyUserPhoto from 'icons/dummyUserPhoto.svg'
import editUserInfoBtn from 'icons/editUserInfoBtn.svg'
import leftArrow from 'icons/leftArrow.svg'

export default function TopUserSection() {
  return (
    <div className={styles.topUserSectionContainer}>
      <div className={styles.prevPage}>
        <img src={leftArrow} alt="leftArrow.svg" />
        <div>
          <p className={styles.topUserName}>name</p>
          <p className={styles.topUserTweetCount}>tweetCount</p>
        </div>
      </div>
      <div className={styles.topUserInfoWrapper}>
        <img src={dummyBackgroundImage} alt="dummyBackgroundImage.svg" />
        <div className={styles.topUserPhotoAndEditWrapper}>
          <img src={dummyUserPhoto} alt="dummyUserPhoto.svg" />
          <img src={editUserInfoBtn} alt="editUserInfoBtn.svg" />
        </div>
        <div className={styles.topUserWordsWrapper}>
          <div className={styles.topUserName}>name</div>
          <div className={styles.topUserAccount}>@account</div>
          <div className={styles.topUserIntro}>introduction</div>
          <div className={styles.topUserFollowWrapper}>
            <div>
              <span className={styles.topUserFollowCount}>followingCount</span><span className={styles.topUserFollowWord}>跟隨中</span>
            </div>
            <div>
              <span className={styles.topUserFollowCount}>followerCount</span><span className={styles.topUserFollowWord}>跟隨者</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}