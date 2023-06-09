import styles from './TopUserSection.module.scss'
import dummyBackgroundImage from 'icons/dummyBackgroundImage.svg'
import dummyUserPhoto from 'icons/dummyUserPhoto.svg'
import editUserInfoBtn from 'icons/editUserInfoBtn.svg'
import PrePageBtn from 'components/PrevPageBtn/PrevPageBtn.jsx'

export default function TopUserSection() {
  return (
    <div>
      <PrePageBtn />
      <div className={styles.topUserInfoWrapper}>
        <img src={dummyBackgroundImage} alt="dummyBackgroundImage.svg" />
        <img className={styles.topUserPhoto} src={dummyUserPhoto} alt="dummyUserPhoto.svg" />
        <button className={styles.topUserEditBtn}>
          <img src={editUserInfoBtn} alt="editUserInfoBtn.svg" />
        </button>
        <div className={styles.topUserWordsWrapper}>
          <div className={styles.topUserName}>name</div>
          <div className={styles.topUserAccount}>@account</div>
          <div className={styles.topUserIntro}>introduction</div>
          <div className={styles.topUserFollowWrapper}>
            <div>
              <span className={styles.topUserFollowCount}>followingCount</span><span className={styles.topUserFollowWord}>跟隨中</span>
            </div>
            <div className={styles.topUserFollowerWrapper}>
              <span className={styles.topUserFollowCount}>followerCount</span><span className={styles.topUserFollowWord}>跟隨者</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}