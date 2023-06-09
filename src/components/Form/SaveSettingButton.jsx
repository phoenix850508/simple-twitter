import styles from './SaveSettingButton.module.scss'

export default function SaveSettingButton({btn, onClick}) {
  return (
    <div>
      <button className={styles.saveButton} onClick={onClick}><p className={styles.btnText}>{btn}</p></button>
    </div>
  )
} 