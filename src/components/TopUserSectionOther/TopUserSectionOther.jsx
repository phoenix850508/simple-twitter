// React Hook
import { useState } from 'react'
import styles from './TopUserSectionOther.module.scss'
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import dummyBackgroundImage2 from 'icons/dummyBackgroundImage2.svg'
// import dummyUserPhoto2 from 'icons/dummyUserPhoto2.svg'
import emailMessage from 'icons/emailMessage.svg'
import notify from 'icons/notify.svg'
import notifyActive from 'icons/notifyActive.svg'
import following from 'icons/following.svg'
import follow from 'icons/follow.svg'
import PrePageBtn from 'components/PrevPageBtn/PrevPageBtn.jsx'
// API
import { postUserFollow, deleteUserFollow } from 'api/tweets'


export default function TopUserSectionOther({ notification, handleNotiClick, userDetail, handleFollowDetailClick, followerCountTemp, changeFollowerCountTemp, isFollowedStatus, setIsFollowedStatus }) {
  // 拿到該使用者資料
  const { id, name, account, avatar, introduction, followingCount, tweetCount } = userDetail

  // 拿 authToken
  const authToken = localStorage.getItem("authToken");

  // 是否追蹤暫存在這
  // const [isFollowedStatus, setIsFollowedStatus] = useState(isFollowed)

  // 去撈跟隨 API
  const postUserFollowAsync = async (authToken, id) => {
    try {
      const res = await postUserFollow(authToken, id)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  // 去撈取消跟隨 API
  const deleteUserFollowAsync = async (authToken, id) => {
    try {
      const res = await deleteUserFollow(authToken, id)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }


  // 追蹤按鈕邏輯
  function handleFollowClick() {
    if (isFollowedStatus) {
      deleteUserFollowAsync(authToken, id)
      changeFollowerCountTemp(followerCountTemp - 1)
    } else {
      postUserFollowAsync(authToken, id)
      changeFollowerCountTemp(followerCountTemp + 1)
    }
    setIsFollowedStatus(!isFollowedStatus)
  }

  return (
    <div>
      <PrePageBtn toPage='/main' name={name} tweetCount={tweetCount} />
      <div className={styles.topUserInfoWrapper}>
        <img src={dummyBackgroundImage2} alt="dummyBackgroundImage2.svg" />
        <img className={styles.topUserPhoto} src={avatar ? avatar : avatarDefaultMini} alt='avatar' />
        <div className={styles.topUserEditBtnWrapper}>
          <button className={styles.topUserEditBtn}>
            <img src={emailMessage} alt="emailMessage.svg" />
          </button>
          <button
            className={styles.topUserEditBtn}
            onClick={e => { handleNotiClick() }}>
            {notification ? <img src={notifyActive} alt="notifyActive.svg" /> : <img src={notify} alt="notify.svg" />}
          </button>
          {/* 跟隨按鈕，按了馬上更新畫面同時送資料到後端 */}
          <button
            className={styles.topUserEditBtn}
            onClick={() => { handleFollowClick() }}
          >
            {isFollowedStatus ? <img src={following} alt="following.svg" /> : <img src={follow} alt="follow.svg" />}
          </button>
        </div>
        <div className={styles.topUserWordsWrapper}>
          <div className={styles.topUserName}>{name}</div>
          <div className={styles.topUserAccount}>@{account}</div>
          <div className={styles.topUserIntro}>{introduction}</div>
          <div className={styles.topUserFollowWrapper}>
            <div>
              <button
                className={styles.followBtn}
                value='followings'
                onClick={e => { handleFollowDetailClick(e.currentTarget.value) }}
              >
                <span className={styles.topUserFollowCount}>{followingCount}</span><span className={styles.topUserFollowWord}>跟隨中</span>
              </button>
            </div>
            <div className={styles.topUserFollowerWrapper}>
              <button
                className={styles.followBtn}
                value='followers'
                onClick={e => { handleFollowDetailClick(e.currentTarget.value) }}
              >
                <span className={styles.topUserFollowCount}>{followerCountTemp}</span><span className={styles.topUserFollowWord}>跟隨者</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}