import clsx from 'clsx'
import styles from './AuthInput.module.scss'
import {useRef} from 'react'

export default function AuthInput({type, label, placeholder, className, borderLine, onChange, value, inputRef}) {
  return (
    <div className={clsx(styles.inputContainer, className)}>
      <label className={styles.label} htmlFor="input">{label}</label>
      <input className={styles.input} type={type || "text"} placeholder={placeholder} onChange={e => onChange?.(e.target.value)} defaultValue={value} ref={inputRef} />
      <div className={clsx(styles.borderLine, borderLine)}></div>
    </div>
  )
}