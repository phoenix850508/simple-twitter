import styles from './AdminPage.module.scss'
import AuthButton from 'components/Form/AuthButton.jsx'
import AuthInput from 'components/Form/AuthInput.jsx'
import ac_logo from 'icons/ac_logo.svg'
import clsx from 'clsx'
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext.jsx'


export default function AdminPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  // 這邊的errorMsg是用來判斷若後端response的資料不存在或有誤，可以讓<AuthInput/>可以製造出相對的錯誤訊息
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate();
  const { adminLogin } = useContext(AuthContext)

  // 撈取 localStorage 中的 userInfo 協助跳轉頁面
  let savedUserInfo = {}
  let savedUserInfoId = 0
  let role = ''
  if (localStorage.getItem("userInfo")) {
    savedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    savedUserInfoId = savedUserInfo.id
    role = savedUserInfo.role
  }

  // 驗證角色，若登入者為一般使用者則導回首頁，若是管理者那就停在原頁面，其他的請登入
  useEffect(() => {
    if (savedUserInfoId && role === 'user') {
      navigate('/main');
      // 若管理者已登入就直接到 admin_main
    } else if (savedUserInfoId && role === 'admin') {
      navigate('/admin_main');
    } 
  }, [savedUserInfoId, navigate, role])

  const handleClick = async () => {
    // 檢查格式是否符合需求
    if (account.trim().length === 0 || password.trim().length === 0) return
    const response = await adminLogin({ account, password })
    //產生錯誤訊息
    if (response.response) return setErrorMsg(response.response.data.message)
    //成功登入
    else if (response.data.status === "success") {
      console.log(response)
      localStorage.setItem('authToken', response.data.token)
      navigate('/admin_users')
    }
  }

  return (
    <div className={styles.adminLoginContainer}>
      <img src={ac_logo} alt="ac_logo.svg" />
      <h3 className={styles.authTitle}>{"後台登入"}</h3>
      <AuthInput
        className={styles.account}
        borderLine={clsx({ [styles.borderLine]: !errorMsg.length }, { [styles.accountBorderLineError]:  errorMsg === "Error: 帳密錯誤！" }, {[styles.accountNotExist]: errorMsg === "Error: 帳號不存在！" || errorMsg === "帳號不存在"})}
        label={"帳號"}
        placeholder={"請輸入帳號"}
        value={account}
        dataFrom={'AdminPage'}
        onChange={(accountInput) => {
          setErrorMsg('')
          setAccount(accountInput)
        }} />
      <AuthInput
        className={styles.password}
        borderLine={clsx({ [styles.borderLine]: !errorMsg.length }, { [styles.invalidUserBorderLine]:  errorMsg === "Error: 帳密錯誤！" }, {[styles.accountNotExist]: errorMsg === "Error: 帳號不存在！" || errorMsg === "帳號不存在"})}
        label={"密碼"}
        placeholder={"請輸入密碼"}
        type="password"
        value={password}
        dataFrom={'AdminPage'}
        onChange={(passwordInput) => {
          setErrorMsg('')
          setPassword(passwordInput)
        }} />
      <AuthButton btn="登入" onClick={handleClick} />
      <div className={styles.redirContainer}>
        <Link to='/login'>
          <span className={styles.login}>前台登入</span>
        </Link>
      </div>
    </div>
  )
}