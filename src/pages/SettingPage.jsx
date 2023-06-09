import LeftBanner from 'components/LeftBanner/LeftBanner.jsx'
import AdminContainer from 'components/Admin/AdminContainer.jsx'
import AdminRightContainer from 'components/Admin/AdminRightContainer.jsx'
import AuthInput from 'components/Form/AuthInput.jsx'
import SaveSettingButton from 'components/Form/SaveSettingButton.jsx'
import styles from './SettingPage.module.scss'
import {useState} from 'react'

export default function SettingPage() {
  // const [account, setAccount] = useState('')
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [checkPassword, setCheckPasswordd] = useState('')
  return (
    <div className={styles.settingContainer}>
      <AdminContainer>
       <LeftBanner />
       <AdminRightContainer title={"帳戶設定"} rightContainerClassName={styles.rightContainer} contentContainerClassName={styles.contentContainer}>
        <div className={styles.inputSection}>
          <AuthInput className={styles.inputContainer} label={"帳號"} placeholder={"請輸入帳號"} />
          <AuthInput className={styles.inputContainer} label={"名稱"} placeholder={"請輸入名稱"} />
          <AuthInput className={styles.inputContainer} label={"Email"} placeholder={"請輸入 Email"}  />
          <AuthInput className={styles.inputContainer} label={"密碼"} placeholder={"請設定密碼"}  type="password" />
          <AuthInput className={styles.inputContainerLast} label={"確認密碼"} placeholder={"請再次輸入密碼"}  type="password" />
          <div className={styles.buttonContainer}>
            <SaveSettingButton btn={"儲存"}/>
          </div>
        </div>
       </AdminRightContainer>
      </AdminContainer>
    </div>
  )
}