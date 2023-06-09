import styles from './AdminRightContainer.module.scss'

export default function AdminRightContainer({children}) {
  return (
    <div className={styles.adminRightContainer}>
      <div className={styles.titleSecion}>
        <h4 className={styles.title}>使用者列表</h4>
      </div>
      <div className={styles.cartContainer}>
        {children}
      </div>
    </div>
  )
}