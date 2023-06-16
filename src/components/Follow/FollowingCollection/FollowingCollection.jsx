import styles from "./FollowingCollection.module.scss"
import FollowingItem from "components/Follow/FollowingItem/FollowingItem.jsx"

export default function FollowingCollection({ followings, flagForRendering, setFlagForRendering }) {
  return (
    <div >
      {followings ? (followings.map((following) => {
        const { avatar, name, introduction } = following.Followers
        const { id, followingId, isFollowed } = following
        return (
          <FollowingItem
            key={id}
            id={followingId}
            avatar={avatar}
            name={name}
            introduction={introduction}
            isFollowed={isFollowed}
            flagForRendering={flagForRendering}
            setFlagForRendering={setFlagForRendering}
          />
        )
      })) : (
        <div className={styles.margin}>
          <div></div>
          <span>（此使用者尚未跟隨任何人）</span>
        </div>
      )}
    </div>
  )
}