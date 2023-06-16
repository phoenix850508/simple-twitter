import styles from './AdminRightContainer.module.scss'
import clsx from 'clsx'

export default function AdminRightContainer({children, title, rightContainerClassName, contentContainerClassName}) {
  return (
    <div className={clsx(styles.adminRightContainer, rightContainerClassName)}>
      <div className={styles.titleSection}>
        <h4 className={styles.title}>{title}</h4>
      </div>
      <div className={clsx(styles.contentContainer, contentContainerClassName)}>
        {children}
      </div>
    </div>
  )
}