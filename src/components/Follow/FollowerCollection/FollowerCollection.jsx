// 還沒串 dummy data

import FollowerItem from "components/Follow/FollowerItem/FollowerItem.jsx"

export default function FollowerCollection({ followers }) {
  console.log('FollowerCollection 裡面的 followers: ', followers)
  return (
    <div>
      {followers.map((follower) => {
        const { avatar, name, introduction } = follower.Followers
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
      })}
    </div>
  )
}