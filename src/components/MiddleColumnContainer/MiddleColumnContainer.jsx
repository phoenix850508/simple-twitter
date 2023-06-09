import styles from "./MiddleColumnContainer.module.scss";

export default function MiddleColumnContainer({ children }) {
  return (
    <div className={`${styles.ContainerForScrollbar} ${styles.scrollbar}`}>
      <div className={styles.middleColumnContainer}>
        {children}
      </div>
    </div>
  )
}