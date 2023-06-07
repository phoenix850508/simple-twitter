import AuthButton from 'components/form/AuthButton.jsx'
import AuthInput from 'components/form/AuthInput.jsx'
import ac_logo from 'icons/ac_logo.svg'
import styles from './LoginPage.module.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom';
import {useState} from 'react'
import {login} from 'api/auth.js'

export default function LoginPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  // 這邊的isSuccess主要是讓<AuthInput/>可以製造出錯誤訊息，但是目前還不確定若帳號不存在，後端要如何告訴前端這個問題，所以目前只要沒有登入成功就會顯示帳號不存在
  const [isSuccess, setIsSuccess] = useState(true)
  const handleClick = async () => {
    // 檢查格式是否符合需求
    if(account.length === 0 || password.length === 0) return
    const {status, data} = await login({email: account, password})
    const {token} = data
    if(status === "success") {
      localStorage.setItem('authToken', token)
    }
    else {
      return setIsSuccess(!isSuccess)
    }
  }
  return (
    <div className={styles.loginContainer}>
      <img src={ac_logo} alt="ac_logo.svg" />
      <h3 className={styles.authTitle}>{"登入 Alphitter"}</h3>
      <AuthInput 
      className={styles.account} 
      borderLine={clsx('', {[styles.borderLine]: !isSuccess})}
      label={"帳號"} 
      placeholder={"請輸入帳號"}
      value={account} 
      onChange={(accountInput) => setAccount(accountInput)} />
      <AuthInput 
      className={styles.password} 
      label={"密碼"} 
      placeholder={"請輸入密碼"} 
      type="password"
      value={password} 
      onChange={(passwordInput) => setPassword(passwordInput)} />
      <AuthButton btn="登入" onClick={handleClick} />
      <div className={styles.redirContainer}>
        <Link to="/signup">
          <span className={styles.signup}>註冊</span>
        </Link>
        <span className={styles.dot}>・</span>
        <span className={styles.admin}>後台登入</span>
      </div>
    </div>
  )
}