import LeftBannerAdmin from 'components/LeftBannerAdmin/LeftBannerAdmin.jsx'
import UserCard from 'components/Admin/UserCard.jsx'
import AdminContainer from 'components/Admin/AdminContainer.jsx'
import AdminRightContainer from 'components/Admin/AdminRightContainer.jsx'
import dummyUserCards from 'components/Admin/dummyUserCards.js'
import {useState} from 'react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState(dummyUserCards)
  return (
    <div>
      <AdminContainer>
       <LeftBannerAdmin />
       <AdminRightContainer title={"使用者列表"}>
        {users.map((user) => {
          return <UserCard key={user.id} avatar={user.avatar} background={user.background} />
        })}
       </AdminRightContainer>
      </AdminContainer>
    </div>
  )
}