import styles from "./FollowingCollection.module.scss"
import FollowingItem from "components/Follow/FollowingItem/FollowingItem.jsx"

export default function FollowingCollection({ followings }) {
  return (
    <div className={styles.container}>
      {followings ? (followings.map((following) => {
        const { avatar, name, introduction } = following.Followers
        const { id, isFollowed } = following
        return (
          <FollowingItem
            key={id}
            avatar={avatar}
            name={name}
            introduction={introduction}
            isFollowed={isFollowed}
          />
        )
      })) : '（此使用者尚未跟隨任何人）'}
    </div>
  )
}