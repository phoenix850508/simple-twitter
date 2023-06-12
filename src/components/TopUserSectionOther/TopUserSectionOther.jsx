import styles from './TopUserSectionOther.module.scss'
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import dummyBackgroundImage2 from 'icons/dummyBackgroundImage2.svg'
import dummyUserPhoto2 from 'icons/dummyUserPhoto2.svg'
import emailMessage from 'icons/emailMessage.svg'
import notify from 'icons/notify.svg'
import notifyActive from 'icons/notifyActive.svg'
import following from 'icons/following.svg'
import PrePageBtn from 'components/PrevPageBtn/PrevPageBtn.jsx'

export default function TopUserSectionOther({ notification, handleNotiClick, userDetail }) {
  // 拿到該使用者資料
  const { name, account, avatar, introduction, followingCount, followerCount } = userDetail

  return (
    <div>
      <PrePageBtn />
      <div className={styles.topUserInfoWrapper}>
        <img src={dummyBackgroundImage2} alt="dummyBackgroundImage2.svg" />
        <img className={styles.topUserPhoto} src={avatar} alt={avatarDefaultMini} />
        <div className={styles.topUserEditBtnWrapper}>
          <button className={styles.topUserEditBtn}>
            <img src={emailMessage} alt="emailMessage.svg" />
          </button>
          <button
            className={styles.topUserEditBtn}
            onClick={e => { handleNotiClick() }}>
            {notification ? <img src={notifyActive} alt="notifyActive.svg" /> : <img src={notify} alt="notify.svg" />}
          </button>
          <button className={styles.topUserEditBtn}>
            <img src={following} alt="following.svg" />
          </button>
        </div>
        <div className={styles.topUserWordsWrapper}>
          <div className={styles.topUserName}>{name}</div>
          <div className={styles.topUserAccount}>@{account}</div>
          <div className={styles.topUserIntro}>{introduction}</div>
          <div className={styles.topUserFollowWrapper}>
            <div>
              <span className={styles.topUserFollowCount}>{followingCount}</span><span className={styles.topUserFollowWord}>跟隨中</span>
            </div>
            <div className={styles.topUserFollowerWrapper}>
              <span className={styles.topUserFollowCount}>{followerCount}</span><span className={styles.topUserFollowWord}>跟隨者</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}