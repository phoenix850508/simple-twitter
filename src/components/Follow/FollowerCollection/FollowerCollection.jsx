import styles from "./FollowerCollection.module.scss"
import FollowerItem from "components/Follow/FollowerItem/FollowerItem.jsx"

export default function FollowerCollection({ followers, flagForRendering, setFlagForRendering }) {
  return (
    <div >
      {followers ? (
        followers.map((follower) => {
          const { avatar, name, introduction } = follower.Followings
          const { id, followerId, isFollowed } = follower
          return (
            <FollowerItem
              key={id}
              id={followerId}
              avatar={avatar}
              name={name}
              introduction={introduction}
              isFollowed={isFollowed}
              flagForRendering={flagForRendering}
              setFlagForRendering={setFlagForRendering}
            />
          )
        })
      ) : (
        <div className={styles.margin}>
          <div></div>
          <span>（此使用者尚未被任何人跟隨）</span>
        </div>
      )}
    </div>
  )
}