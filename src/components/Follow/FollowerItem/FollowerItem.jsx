import styles from "./FollowerItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import following from 'icons/following.svg'
import follow from 'icons/follow.svg'
// API
import { postUserFollow, deleteUserFollow } from "api/tweets";

export default function FollowerItem({ id, avatar, name, introduction, isFollowed, flagForRendering, setFlagForRendering }) {
  // 拿 authToken
  const authToken = localStorage.getItem("authToken");
  // userInfo 資料從 localStorage 拿
  const savedUserInfoParsed = JSON.parse(localStorage.getItem("userInfo"))
  const savedUserId = savedUserInfoParsed && savedUserInfoParsed.id

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


  return (
    <div className={styles.followerItemContainer}>
      <div className={styles.followerItemWrapper}>
        <div>
          <img className={styles.avatar} src={avatar ? (avatar? avatar : avatarDefaultMini) : avatarDefaultMini} alt='avatar' />
        </div>
        <div className={styles.followerItemInfoWrapper}>
          <div className={styles.followerItemNameFollowWrapper}>
            <div className={styles.followerItemName}>{name}</div>
            <button
              className={styles.followerItemFollowBtn}
              onClick={() => {
                if (id === savedUserId) {
                  alert('使用者不能跟隨自己哦，請跟隨其他使用者吧～')
                } else {
                  handleFollowClick(id, isFollowed)
                }
              }}
            >
              {isFollowed ? <img src={following} alt="following.svg" /> : <img src={follow} alt="follow.svg" />}
            </button>
          </div>
          <div className={styles.followerItemIntro}>{introduction}</div>
        </div>
      </div>
    </div>
  )
}