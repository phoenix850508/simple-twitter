// React Hook
import { useState, useEffect } from 'react'
import styles from "./RightBanner.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import following from 'icons/following.svg'
import follow from 'icons/follow.svg'
// API
import { getTopUsers, postUserFollow, deleteUserFollow } from "api/tweets";


export default function RightBanner({ flagForRendering, setFlagForRendering }) {
  // 拿 authToken
  const authToken = localStorage.getItem("authToken");
  // userInfo 資料從 localStorage 拿
  const savedUserInfoParsed = JSON.parse(localStorage.getItem("userInfo"))
  const savedUserId = savedUserInfoParsed && savedUserInfoParsed.id

  // topUsers 存在這
  const [topUsers, setTopUsers] = useState([]);

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
  async function handleFollowClick(idTopUserReceived, isFollowed) {
    if (isFollowed) {
      await deleteUserFollowAsync(authToken, idTopUserReceived)
    } else {
      await postUserFollowAsync(authToken, idTopUserReceived)
    }
    await setFlagForRendering(!flagForRendering)
  }

  // 透過 API 撈所有 topUsers 資料
  useEffect(() => {
    const getTopUsersAsync = async () => {
      try {
        const topUsers = await getTopUsers();
        setTopUsers(topUsers.map((topUser) => ({ ...topUser })));
      } catch (error) {
        console.error(error);
      }
    };
    getTopUsersAsync()
    console.log('讓 RightBanner 重新渲染')
  }, [flagForRendering]);


  return (
    <div className={styles.rightBannerContainer}>
      <div className={styles.rightBannerTitle}>
        推薦跟隨
      </div>
      <RecommendCollection topUsers={topUsers} handleFollowClick={handleFollowClick} savedUserId={savedUserId} />
    </div>
  )
}

function RecommendCollection({ topUsers, handleFollowClick, savedUserId }) {
  return (
    <div className={styles.recommendCollectionContainer}>
      {topUsers.map((topUser) => {
        const { id, name, account, avatar, isFollowed } = topUser
        return (
          <RecommendItem
            key={id}
            id={id}
            name={name}
            account={account}
            avatar={avatar}
            isFollowed={isFollowed}
            handleFollowClick={handleFollowClick}
            savedUserId={savedUserId}
          />
        );
      })}
    </div>
  )
}

function RecommendItem({ id, name, account, avatar, isFollowed, handleFollowClick, savedUserId }) {
  // 讓使用者即時看到跟隨按鈕變化
  const [isFollowedTemp, setIsFollowedTemp] = useState(isFollowed)

  useEffect(() => {
    setIsFollowedTemp(isFollowed)
  }, [isFollowed]);

  return (
    <div className={styles.recommendItemContainer}>
      <div className={styles.recommendItemContainerLeft}>
        <div>
          <img className={styles.avatar} src={avatar ? avatar : avatarDefaultMini} alt='avatar' />
        </div>
        <div className={styles.recommendItemInfo}>
          <div className={styles.recommendItemInfoName}>{name}</div>
          <div className={styles.recommendItemInfoAccount}>@{account}</div>
        </div>
      </div>
      <button
        className={styles.followBtn}
        onClick={() => {
          if (id === savedUserId) {
            alert('使用者不能跟隨自己哦，請跟隨其他使用者吧～')
          } else {
            setIsFollowedTemp(!isFollowedTemp)
            handleFollowClick(id, isFollowed)
          }
        }}
      >
        {isFollowedTemp ? <img src={following} alt="following.svg" /> : <img src={follow} alt="follow.svg" />}
      </button>
    </div>
  )
}