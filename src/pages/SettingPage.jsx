import LeftBanner from 'components/LeftBanner/LeftBanner.jsx'
import AdminContainer from 'components/Admin/AdminContainer.jsx'
import AdminRightContainer from 'components/Admin/AdminRightContainer.jsx'
import AuthInput from 'components/Form/AuthInput.jsx'
import SaveSettingButton from 'components/Form/SaveSettingButton.jsx'
import styles from './SettingPage.module.scss'
import {useState} from 'react'
import clsx from 'clsx'
import {getUser, putUserSelf} from 'api/tweets.js'
import { useEffect } from 'react'

export default function SettingPage() {
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
  const savedUserInfoId = savedUserInfoParsed.id
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [isPasswordEqual, setIsPasswordEqual] = useState(true)
  const [dataObject, setDataObject] = useState(null)
  // 這邊的errorMsg是用來判斷若後端response的資料不存在或有誤，可以讓<AuthInput/>可以製造出相對的錯誤訊息
  const [errorMsg, setErrorMsg] = useState('')
  //點擊儲存按鈕 所有欄位應該要拿到最新的data資料
  const handleClick = async () => {
    //檢查格式是否符合需求
    // 防止使用者輸入空值，若input欄位感應不到則會帶入原本的資料
    if (account.length === 0) setAccount(dataObject.account)
    if (name.length === 0) setName(dataObject.name)
    if (email.length === 0) setEmail(dataObject.email)
    if(password.length === 0 || checkPassword.length === 0) return alert("請輸入密碼")
    else if (name.length > 50) return 
    else if (password !== checkPassword) {
      return setIsPasswordEqual(false)
    }
    const formData = new FormData()
    for (let key in dataObject) {
      formData.append(key, dataObject[key]);
    }
    formData.set("name", name)
    formData.set("email", email)
    formData.set("account", account)
    formData.set("password", password)
    formData.set("checkPassword", checkPassword)
    const response = await putUserSelf(savedUserInfoId, formData)

    // 若使用者編輯資料失敗
    if (response.response) {
      setErrorMsg(response.response.data.message)
    }
    // 若成功把使用者編輯資料送出
    else if (!response.response) {
      if (response.data) {
      alert('successfully updated')
      }
    }
  }
  useEffect(() => {
    const getUserAsync= async() => {
      try {
        const response = await getUser(savedUserInfoId)
        setDataObject(response.data)
      } catch (error) {
        console.error(error)
      }
    } 
    getUserAsync();
  }, [savedUserInfoId])
  return (
    <div className={styles.settingContainer}>
      <AdminContainer>
       <LeftBanner />
       <AdminRightContainer title={"帳戶設定"} rightContainerClassName={styles.rightContainer} contentContainerClassName={styles.contentContainer}>
        <div className={styles.inputSection}>
          <AuthInput 
          className={styles.inputContainer} 
          label={"帳號"} 
          placeholder={"請輸入帳號"}
          onChange={(accountInput) => {
            setErrorMsg('')
            setAccount(accountInput)
          }}
          borderLine={clsx('', {[styles.accountBorderLineError]: errorMsg === "Error: 帳號已存在！"})} 
          value={dataObject && dataObject.account}
          />
          <AuthInput 
          className={styles.inputContainer} 
          label={"名稱"} 
          placeholder={"請輸入名稱"}
          borderLine={clsx('', {[styles.nameLengthError]: name.length > 50})}
          onChange={(nameInput) => setName(nameInput)}
          value={dataObject && dataObject.name}
           />
          <AuthInput 
          className={styles.inputContainer} 
          label={"Email"} 
          placeholder={"請輸入 Email"}
          onChange={(emailInput) => {
            setErrorMsg('')
            setEmail(emailInput)
          }}
          borderLine={clsx('', {[styles.emailBorderLineError]: errorMsg === "Error: 信箱已存在！"})}
          value={dataObject && dataObject.email}  
          />
          <AuthInput 
          className={styles.inputContainer} 
          label={"密碼"} 
          placeholder={"請設定密碼"}  
          borderLine={clsx('', {[styles.passwordUnequal]: !isPasswordEqual})}
          onChange={(passwordInput) => {
            setIsPasswordEqual(true)
            setPassword(passwordInput)
          }} 
          type="password" 
          value={dataObject && dataObject.password}  
          />
          <AuthInput 
          className={styles.inputContainerLast} 
          label={"確認密碼"} 
          placeholder={"請再次輸入密碼"}  
          borderLine={clsx('', {[styles.passwordUnequal]: !isPasswordEqual})}
          type="password"
          onChange={(passwordConfirmInput) => {
            setIsPasswordEqual(true)
            setCheckPassword(passwordConfirmInput)
          }}
          value={dataObject && dataObject.password}  
           />
          <div className={styles.buttonContainer}>
            <SaveSettingButton btn={"儲存"} onClick={handleClick}/>
          </div>
        </div>
       </AdminRightContainer>
      </AdminContainer>
    </div>
  )
}