import AuthButton from 'components/Form/AuthButton.jsx'
import AuthInput from 'components/Form/AuthInput.jsx'
import ac_logo from 'icons/ac_logo.svg'
import styles from './LoginPage.module.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useAuth} from 'context/authContext.js'

export default function LoginPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  // 這邊的errorMsg是用來判斷若後端response的資料不存在或有誤，可以讓<AuthInput/>可以製造出相對的錯誤訊息
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate();
  const {login, isAuthenticated, currentUser } = useAuth()

  const handleClick = async () => {
    // 檢查格式是否符合需求
    if (account.length === 0 || password.length === 0) return
    const response = await login({ account, password })
    //產生錯誤訊息
    if (response.response) return setErrorMsg(response.response.data.message)
    //成功的話可以取得該使用者的資料
  }
  useEffect(() => {
    if(isAuthenticated) {
      console.log(currentUser)
      navigate('/main');
    }
  }, [navigate, isAuthenticated, currentUser])
  return (
    <div className={styles.loginContainer}>
      <img src={ac_logo} alt="ac_logo.svg" />
      <h3 className={styles.authTitle}>{"登入 Alphitter"}</h3>
      <AuthInput
        className={styles.account}
        borderLine={clsx({ [styles.borderLine]: !errorMsg.length }, { [styles.accountBorderLineError]: errorMsg === "Error: 帳號不存在！" || errorMsg === "Error: 帳密錯誤！" || errorMsg === "帳號不存在" })}
        label={"帳號"}
        placeholder={"請輸入帳號"}
        value={account}
        onChange={(accountInput) => {
          setErrorMsg('')
          setAccount(accountInput)
        }} />
      <AuthInput
        className={styles.password}
        borderLine={clsx({ [styles.borderLine]: !errorMsg.length }, { [styles.invalidUserBorderLine]: errorMsg === "Error: 帳號不存在！" || errorMsg === "Error: 帳密錯誤！" || errorMsg === "帳號不存在" })}
        label={"密碼"}
        placeholder={"請輸入密碼"}
        type="password"
        value={password}
        onChange={(passwordInput) => {
          setErrorMsg('')
          setPassword(passwordInput)
        }} />
      <AuthButton btn="登入" onClick={handleClick} />
      <div className={styles.redirContainer}>
        <Link to="/signup">
          <span className={styles.signup}>註冊</span>
        </Link>
        <span className={styles.dot}>・</span>
        <Link to="/admin">
          <span className={styles.admin}>後台登入</span>
        </Link>
      </div>
    </div>
  )
}