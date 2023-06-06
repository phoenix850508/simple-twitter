import styles from './AuthButton.module.scss'

export default function authButton({btn}) {
  return (
    <div>
      <button className={styles.authButton}><p className={styles.btnText}>{btn}</p></button>
    </div>
  )
} 