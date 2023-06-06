import clsx from 'clsx'
import styles from './AuthInput.module.scss'

export default function AuthInput({type, label, placeholder, className, onChange}) {
  return (
    <div className={clsx(styles.inputContainer, className)}>
      <label className={styles.label} htmlFor="input">{label}</label>
      <input className={styles.input} id="input" type={type || "text"} placeholder={placeholder} onChange={e => onChange?.(e.target.value)} />
      <div className={styles.borderLine}></div>
    </div>
  )
}