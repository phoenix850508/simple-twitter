import LeftBanner from 'components/LeftBanner/LeftBanner.jsx'
import AdminContainer from 'components/Admin/AdminContainer.jsx'
import AdminRightContainer from 'components/Admin/AdminRightContainer.jsx'
import AuthInput from 'components/Form/AuthInput.jsx'
import SaveSettingButton from 'components/Form/SaveSettingButton.jsx'
import styles from './SettingPage.module.scss'
import { useState } from 'react'
import clsx from 'clsx'
import { getUser, putUserSelf } from 'api/tweets.js'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SettingPage() {
  const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"))
  const savedUserInfoId = savedUserInfo.id
  const role = savedUserInfo.role
  //這邊的setState是用來儲存onChange資料
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [isPasswordEqual, setIsPasswordEqual] = useState(true)
  // dataObject是用來補足輸入欄沒有的欄位
  const [dataObject, setDataObject] = useState(null)
  const navigate = useNavigate()
  // useRef是用來存取當前最新的欄位資料
  const accountInputRef = useRef(null)
  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const passwordRef = useRef(null)
  const checkPasswordRef = useRef(null)
  // 這邊的errorMsg是用來判斷若後端response的資料不存在或有誤，可以讓<AuthInput/>可以製造出相對的錯誤訊息
  const [errorMsg, setErrorMsg] = useState('')

  // 為了顯示左側按鈕顏色需做判斷，共有 1、2、3
  const currentPage = 3

  //點擊儲存按鈕 所有欄位應該要拿到最新的data資料
  const handleClick = async () => {
    //檢查格式是否符合需求
    // 防止使用者輸入空值，若input欄位感應不到則會帶入原本的資料
    console.log("accountInputRef", accountInputRef.current.value)
    console.log("dataObject", dataObject)
    if (accountInputRef.current.value.trim().length === 0) return alert("請輸入帳號")
    // setAccount(dataObject.account)
    if (nameInputRef.current.value.trim().length === 0) return alert("請輸入名字")
    // setName(dataObject.name)
    if (emailInputRef.current.value.trim().length === 0) return alert("請輸入email")
    // setEmail(dataObject.email)
    if (passwordRef.current.value.trim().length === 0 || checkPasswordRef.current.value.trim().length === 0) return alert("請輸入密碼")
    else if (name.length > 50) return
    else if (password !== checkPassword) {
      return setIsPasswordEqual(false)
    }
    const formData = new FormData()
    for (let key in dataObject) {
      formData.append(key, dataObject[key]);
    }
    formData.set("name", name ? name : nameInputRef.current.value)
    formData.set("email", email ? email : emailInputRef.current.value)
    formData.set("account", account ? account : accountInputRef.current.value)
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
        navigate('/user/self')
      }
    }
  }


  useEffect(() => {
    const getUserAsync = async () => {
      try {
        const response = await getUser(savedUserInfoId)
        setDataObject(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    // 驗證角色，如果是管理者那就導回管理者自己的頁面
    if (savedUserInfoId && role === 'admin') {
      navigate('/admin_users');
    } else if (savedUserInfoId && role === 'user') {
      getUserAsync();
    } else {
      navigate('/login');
    }
  }, [savedUserInfoId, navigate, role])

  return (
    <div className={styles.settingContainer}>
      <AdminContainer>
        <LeftBanner currentPage={currentPage} />
        <AdminRightContainer title={"帳戶設定"} rightContainerClassName={styles.rightContainer} contentContainerClassName={styles.contentContainer}>
          <div className={styles.inputSection}>
            <AuthInput
              className={styles.inputContainer}
              label={"帳號"}
              placeholder={"請輸入帳號"}
              onChange={(accountInput) => {
                setErrorMsg('')
                accountInput && setAccount(accountInput)
              }}
              borderLine={clsx('', { [styles.accountBorderLineError]: errorMsg === "Error: 帳號已存在！" })}
              value={dataObject && dataObject.account}
              inputRef={accountInputRef}
            />
            <AuthInput
              className={styles.inputContainer}
              label={"名稱"}
              placeholder={"請輸入名稱"}
              borderLine={clsx('', { [styles.nameLengthError]: name.length > 50 })}
              onChange={(nameInput) => nameInput && setName(nameInput)}
              value={dataObject && dataObject.name}
              inputRef={nameInputRef}
            />
            <AuthInput
              className={styles.inputContainer}
              label={"Email"}
              placeholder={"請輸入 Email"}
              onChange={(emailInput) => {
                setErrorMsg('')
                emailInput && setEmail(emailInput)
              }}
              borderLine={clsx('', { [styles.emailBorderLineError]: errorMsg === "Error: 信箱已存在！" })}
              value={dataObject && dataObject.email}
              inputRef={emailInputRef}
            />
            <AuthInput
              className={styles.inputContainer}
              label={"密碼"}
              placeholder={"請設定密碼"}
              borderLine={clsx('', { [styles.passwordUnequal]: !isPasswordEqual })}
              onChange={(passwordInput) => {
                setIsPasswordEqual(true)
                passwordInput && setPassword(passwordInput)
              }}
              type="password"
              inputRef={passwordRef}
            />
            <AuthInput
              className={styles.inputContainerLast}
              label={"確認密碼"}
              placeholder={"請再次輸入密碼"}
              borderLine={clsx('', { [styles.passwordUnequal]: !isPasswordEqual })}
              type="password"
              onChange={(passwordConfirmInput) => {
                setIsPasswordEqual(true)
                passwordConfirmInput && setCheckPassword(passwordConfirmInput)
              }}
              inputRef={checkPasswordRef}
            />
            <div className={styles.buttonContainer}>
              <SaveSettingButton btn={"儲存"} onClick={handleClick} />
            </div>
          </div>
        </AdminRightContainer>
      </AdminContainer>
    </div>
  )
}