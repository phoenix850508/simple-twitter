import styles from "./MainContainer.module.scss";

export default function MainContainer({ children }) {
  return (
    <div className={styles.mainContainer}>
      {children}
    </div>
  )
}