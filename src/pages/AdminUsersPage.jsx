import LeftBanner from 'components/LeftBanner/LeftBanner.jsx'
import UserCard from 'components/Admin/UserCard.jsx'
import AdminContainer from 'components/Admin/AdminContainer.jsx'
import AdminRightContainer from 'components/Admin/AdminRightContainer.jsx'
import dummyUserCards from 'components/Admin/dummyUserCards.js'
import {useState} from 'react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState(dummyUserCards)
  console.log(users)
  return (
    <div>
      <AdminContainer>
       <LeftBanner />
       <AdminRightContainer>
        {users.map((user) => {
          return <UserCard avatar={user.avatar} background={user.background} />
        })}
       </AdminRightContainer>
      </AdminContainer>
    </div>
  )
}