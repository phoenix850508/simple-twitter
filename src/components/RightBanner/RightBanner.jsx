// React Hook
import { useState, useEffect } from 'react'
import styles from "./RightBanner.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import following from 'icons/following.svg'
import follow from 'icons/follow.svg'
// API
import { getTopUsers, postUserFollow, deleteUserFollow } from "api/tweets";


export default function RightBanner() {
  // 拿 authToken
  const authToken = localStorage.getItem("authToken");
  // userInfo 資料從 localStorage 拿
  const savedUserInfoParsed = JSON.parse(localStorage.getItem("userInfo"))
  const savedUserId = savedUserInfoParsed && savedUserInfoParsed.id

  // tweets 存在這
  const [topUsers, setTopUsers] = useState([]);
  // 本來想設置 flag，讓點擊跟隨時畫面能重新渲染，但無效，故轉採子元件設 state 方式
  const [flagForRendering, setFlagForRendering] = useState(false);
  console.log('flagForRendering', flagForRendering)

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
    setFlagForRendering(!flagForRendering)
  }

  // 透過 API 撈 topUsers 資料
  useEffect(() => {
    // 所有 topUsers
    const getTopUsersAsync = async () => {
      try {
        const topUsers = await getTopUsers();
        setTopUsers(topUsers.map((topUser) => ({ ...topUser })));
      } catch (error) {
        console.error(error);
      }
    };
    getTopUsersAsync()
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
  // 暫存 isFollowed，讓點擊跟隨時畫面能即時回饋給使用者，同時往後端送資料
  const [isFollowedTemp, setIsFollowedTemp] = useState(isFollowed);

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
            handleFollowClick(id, isFollowed)
            setIsFollowedTemp(!isFollowedTemp)
          }
        }}
      >
        {isFollowedTemp ? <img src={following} alt="following.svg" /> : <img src={follow} alt="follow.svg" />}
      </button>
    </div>
  )
}