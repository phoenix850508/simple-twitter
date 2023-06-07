import AuthButton from 'components/form/AuthButton.jsx'
import AuthInput from 'components/form/AuthInput.jsx'
import ac_logo from 'icons/ac_logo.svg'
import styles from './SignupPage.module.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom';
import {useState} from 'react'
import {signup} from 'api/auth.js'

export default function SignupPage() {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  //等確定後端回傳資料格式，可以再增加錯誤訊息 e.g. 帳號已重複註冊, Email已重複註冊...
  const handleClick = async () => {
    console.log(account, email, password, passwordConfirm)
    if (account.length === 0 || name.length === 0 || email.length === 0 || password.length === 0) return
    else if (name.length > 50) return
    else if (password !== passwordConfirm) return 
    const {status, data} = await signup({account, name, email, password})
    if (status === "success") {
      const {token} = data
      console.log("註冊成功")
      console.log(data)
      console.log(token)
    } 
  }
  return (
    <div className={styles.loginContainer}>
      <img src={ac_logo} alt="ac_logo.svg" />
      <h3 className={styles.authTitle}>{"建立你的帳號"}</h3>
      <AuthInput 
      className={styles.account} 
      label={"帳號"} 
      placeholder={"請輸入帳號"} 
      onChange={(accountInput) => setAccount(accountInput)} />
      <AuthInput 
      className={styles.name} 
      borderLine={clsx('', {[styles.nameLengthError]: name.length > 50})}
      label={"名稱"} 
      placeholder={"請輸入使用者名稱"} 
      onChange={(nameInput) => setName(nameInput)} />
      <AuthInput 
      className={styles.email} 
      label={"Email"} 
      placeholder={"請輸入 Email"} 
      onChange={(emailInput) => setEmail(emailInput)} />
      <AuthInput 
      className={styles.password} 
      label={"密碼"} type="password" 
      placeholder={"請設定密碼"} 
      onChange={(passwordInput) => setPassword(passwordInput)} />
      <AuthInput 
      className={styles.passwordConfirm} 
      label={"密碼確認"} 
      type="password" 
      placeholder={"請再次輸入密碼"} 
      onChange={(passwordConfirmInput) => setPasswordConfirm(passwordConfirmInput)} />
      <AuthButton btn={"註冊"} onClick={handleClick} />
      <Link to="/login">
        <p className={styles.cancel}>取消</p>
      </Link>
    </div>
  )
}