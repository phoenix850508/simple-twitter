import styles from "./AdminTweetsList.module.scss"
import AdminTweetsListTitle from "./AdminTweetsListTitle/AdminTweetsListTitle"
import AdminTweetCollection from "./AdminTweetCollection/AdminTweetCollection"

export default function AdminTweetsList() {
  return (
    <div className={`${styles.ContainerForScrollbar} ${styles.scrollbar}`}>
      <AdminTweetsListTitle />
      <AdminTweetCollection />
    </div>
  )
}