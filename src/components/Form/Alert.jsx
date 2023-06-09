import clsx from 'clsx'
import styles from './Alert.module.scss'
import success_noti from 'icons/success_noti.svg'
import success_noti_background from 'icons/success_noti_background.svg'

export default function Alert({alertClassName}) {
  return (
    <div className={clsx(styles.alert, alertClassName)}>
      <p className={styles.text}>註冊成功</p>
      <img className={styles.success_noti} src={success_noti} alt="success_noti.svg" />
      <img className={styles.success_noti_background} src={success_noti_background} alt="success_noti_background.svg" />
    </div>
  )
}
