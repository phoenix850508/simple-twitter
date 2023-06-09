import styles from './AdminContainer.module.scss'

export default function AdminContainer({children}) {
  return (
    <div className={styles.adminContainer}>
      {children}
    </div>
  )
}