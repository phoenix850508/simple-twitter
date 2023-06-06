import styles from './AuthInput.module.scss'

export default function AuthInput({label, placeholder, className}) {
  return (
    <div className={`${styles.inputContiner} ${className}`}>
      <label className={styles.label} htmlFor="input">{label}</label>
      <input className={styles.input} id="input" type="text" placeholder={placeholder} />
      <div className={styles.borderLine}></div>
    </div>
  )
}