import AuthButton from 'components/form/AuthButton.jsx'
import AuthInput from 'components/form/AuthInput.jsx'
import ac_logo from 'icons/ac_logo.svg'
import styles from './LoginPage.module.scss'

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <img src={ac_logo} alt="ac_logo.svg" />
      <h3 className={styles.authTitle}>{"登入 Alphitter"}</h3>
      <AuthInput className={styles.account} label={"帳號"} placeholder={"請輸入帳號"}/>
      <AuthInput className={styles.password} label={"密碼"} placeholder={"請輸入密碼"} />
      <AuthButton btn={"登入"} />
      <div className={styles.redirContainer}>
        <span className={styles.signup}>註冊</span>
        <span className={styles.dot}>・</span>
        <span className={styles.admin}>後台登入</span>
      </div>
    </div>
  )
}