// 要記得做跟隨顯示邏輯

import FollowingItem from "components/Follow/FollowingItem/FollowingItem.jsx"

export default function FollowingCollection({ followings }) {
  console.log('FollowingCollection 裡面的 followings: ', followings)
  return (
    <div>
      {followings.map((following) => {
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
      })}
    </div>
  )
}