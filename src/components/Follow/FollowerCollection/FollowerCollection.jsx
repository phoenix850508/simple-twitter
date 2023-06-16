import styles from "./FollowerCollection.module.scss"
import FollowerItem from "components/Follow/FollowerItem/FollowerItem.jsx"

export default function FollowerCollection({ followers }) {
  return (
    <div className={styles.container}>
      {followers ? (
        followers.map((follower) => {
          const { avatar, name, introduction } = follower.Followings
          const { id, isFollowed } = follower
          return (
            <FollowerItem
              key={id}
              avatar={avatar}
              name={name}
              introduction={introduction}
              isFollowed={isFollowed}
            />
          )
        })
      ) : '（此使用者尚未被任何人跟隨）'}
    </div>
  )
}