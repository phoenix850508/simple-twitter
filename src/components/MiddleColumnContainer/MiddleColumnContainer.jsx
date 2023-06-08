import styles from "./MiddleColumnContainer.module.scss";

export default function MiddleColumnContainer({ children }) {
  return (
    <div className={styles.middleColumnContainer}>
      {children}
    </div>
  )
}