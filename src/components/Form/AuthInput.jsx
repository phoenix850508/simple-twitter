import clsx from 'clsx'
import styles from './AuthInput.module.scss'

export default function AuthInput({ type, label, placeholder, className, borderLine, onChange, value, inputRef, dataFrom }) {

  // 因為 AuthInput 是共用元件，要判斷是哪邊在使用它並做對應變化
  let inputLengthLimit = 0
  if (dataFrom && dataFrom === 'TopUserSection') {
    if (label === "名稱") {
      inputLengthLimit = 50
    } else if (label === "自我介紹") {
      inputLengthLimit = 160
    }
    // 其他頁面暫時不需顯示字數限制
  } else {
    inputLengthLimit = null
  }


  return (
    <div className={clsx(styles.inputContainer, className)}>
      <label className={styles.label} htmlFor="input">{label}</label>
      <input className={styles.input} type={type || "text"} placeholder={placeholder} onChange={e => onChange?.(e.target.value)} defaultValue={value} ref={inputRef} />
      <div className={clsx(styles.borderLine, borderLine)}></div>
      {/* 即時顯示目前輸入字串長度 */}
      {inputLengthLimit && <div className={styles.inputLength}>{value && value.length}/{inputLengthLimit}</div>}
    </div>
  )
}