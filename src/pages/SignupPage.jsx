import AuthButton from 'components/Form/AuthButton.jsx'
import AuthInput from 'components/Form/AuthInput.jsx'
import ac_logo from 'icons/ac_logo.svg'
import styles from './SignupPage.module.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {signup} from 'api/auth.js'
import Alert from 'components/Form/Alert.jsx'
export default function SignupPage() {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [isPasswordEqual, setIsPasswordEqual] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()
  // 這邊的errorMsg是用來判斷若後端response的資料不存在或有誤，可以讓<AuthInput/>可以製造出相對的錯誤訊息
  const [errorMsg, setErrorMsg] = useState('')
  const handleClick = async () => {
    //檢查格式是否符合需求
    if (account.length === 0 || name.length === 0 || email.length === 0 || password.length === 0) return
    else if (name.length > 50) return
    else if (password !== checkPassword) {
      return setIsPasswordEqual(false)
    }
    const response = await signup({account, name, email, password, checkPassword})
    //產生錯誤訊息
    if (response.response) return setErrorMsg(response.response.data.message)
    //成功註冊
    else if(response.data.status === "success") {
      setIsSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 1200)
    }
  }
  return (
    <div className={styles.signupContainer}>
      <Alert alertClassName={clsx('', {[styles.alert]: isSuccess})} alertText={"註冊成功"} />
      <img src={ac_logo} alt="ac_logo.svg" />
      <h3 className={styles.authTitle}>{"建立你的帳號"}</h3>
      <AuthInput 
      className={styles.account} 
      borderLine={clsx('', {[styles.accountBorderLineError]: errorMsg === "Error: 帳號已存在！"})}
      label={"帳號"} 
      placeholder={"請輸入帳號"} 
      onChange={(accountInput) => {
        setErrorMsg('')
        setAccount(accountInput)
      }} />
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
      borderLine={clsx('', {[styles.passwordUnequal]: !isPasswordEqual})}
      label={"密碼"} 
      type="password" 
      placeholder={"請設定密碼"} 
      onChange={(passwordInput) => {
        setIsPasswordEqual(true)
        setPassword(passwordInput)
        }} />
      <AuthInput 
      className={styles.checkPassword} 
      borderLine={clsx('', {[styles.passwordUnequal]: !isPasswordEqual})}
      label={"密碼確認"} 
      type="password" 
      placeholder={"請再次輸入密碼"} 
      onChange={(passwordConfirmInput) => {
        setIsPasswordEqual(true)
        setCheckPassword(passwordConfirmInput)}} />
      <AuthButton btn={"註冊"} onClick={handleClick} />
      <Link to="/login">
        <p className={styles.cancel}>取消</p>
      </Link>
    </div>
  )
}