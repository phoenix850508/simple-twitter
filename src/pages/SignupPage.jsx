import AuthButton from 'components/form/AuthButton.jsx'
import AuthInput from 'components/form/AuthInput.jsx'
import ac_logo from 'icons/ac_logo.svg'
import styles from './SignupPage.module.scss'

export default function SignupPage() {
  return (
    <div className={styles.loginContainer}>
      <img src={ac_logo} alt="ac_logo.svg" />
      <h3 className={styles.authTitle}>{"建立你的帳號"}</h3>
      <AuthInput className={styles.account} label={"帳號"} placeholder={"請輸入帳號"}/>
      <AuthInput className={styles.name} label={"名稱"} placeholder={"請輸入使用者名稱"} />
      <AuthInput className={styles.email} label={"Email"} placeholder={"請輸入 Email"} />
      <AuthInput className={styles.password} label={"密碼"} placeholder={"請設定密碼"} />
      <AuthInput className={styles.passwordConfirm} label={"密碼確認"} placeholder={"請再次輸入密碼"} />
      <AuthButton btn={"註冊"} />
      <p className={styles.cancel}>取消</p>
    </div>
  )
}