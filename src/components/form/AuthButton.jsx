import styles from './AuthButton.module.scss'

export default function authButton({btn, onClick}) {
  return (
    <div>
      <button className={styles.authButton} onClick={onClick}><p className={styles.btnText}>{btn}</p></button>
    </div>
  )
} 