import styles from './TopUserSection.module.scss'
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import dummyBackgroundImage from 'icons/dummyBackgroundImage.svg'
import dummyUserPhoto from 'icons/dummyUserPhoto.svg'
import editUserInfoBtn from 'icons/editUserInfoBtn.svg'
import PrePageBtn from 'components/PrevPageBtn/PrevPageBtn.jsx'
import { useState, useContext, useEffect, useRef } from 'react'
import clsx from 'clsx'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import TopTweetButton from 'components/TopTweetSection/TopTweetComponents/TopTweetButton'
import AuthInput from 'components/Form/AuthInput'
import camera from 'icons/camera.svg'
import white_cross from 'icons/white_cross.svg'
import { AuthContext } from 'context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'


export default function TopUserSection({ handleFollowDetailClick }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState('')
  const [intro, setIntro] = useState('')
  const [userAvatar, setUserAvatar] = useState(null)
  const [banner, setBanner] = useState(null)
  const [tweetCount, setTweetCount] = useState(null)
  const [tempDataObject, setTempDataObject] = useState(null)
  const { putUserSelf, isUserEdited, getUser } = useContext(AuthContext)

  // userInfo 資料從 localStorage 拿
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
  const savedUserInfoId = savedUserInfoParsed.id

  // 其他沒從 API 撈的直接用 localStorage 拿，code 才不用改太多
  const { avatar, account, followingCount, followerCount } = savedUserInfoParsed;

  const handleShowModal = () => {
    handleShow();
  }
  //點擊上傳圖片按鈕
  const handleAvatarFile = (event) => {
    setUserAvatar(event.target.files[0]);
  }
  const handleBannerFile = (event) => {
    setBanner(event.target.files[0]);
  }
  //點擊儲存按鈕
  const handleSave = async () => {
    console.log(banner)
    // 若input空值，則返回
    if (name.trim().length === 0 || intro.trim().length === 0) return
    // 若自我介紹或是名字長度超過限制，則返回
    if (name.length > 50 || intro.length > 160) return
    // API的資訊傳遞(需轉換成 Form-data)
    const formData = new FormData()
    //先帶入暫時儲存在tempDataObject的資料，若有任何改變內容，會用formData.set的方式去改變
    for (let key in tempDataObject) {
      formData.append(key, tempDataObject[key]);
    }
    formData.set("name", name)
    formData.set("introduction", intro)
    formData.set("avatar", userAvatar)
    formData.set("banner", banner)
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    const response = await putUserSelf(savedUserInfoId, formData)
    console.log(response)

    // 若成功把使用者編輯資料送出
    if (!response.response) {
      if (!response.data) return
      console.log("Successfully updated", response)
      alert('successfully updated')
      setShow(false)
    }
    // 若使用者編輯資料失敗
    else {
      alert('failed to update')
      setShow(false)
    }
  }

  useEffect(() => {
    const getUserAsync = async () => {
      const response = await getUser(savedUserInfoId)
      setTempDataObject(response.data)
      setName(response.data.name)
      setIntro(response.data.introduction)
      setUserAvatar(response.data.avatar)
      setBanner(response.data.banner)
      setTweetCount(response.data.tweetCount)
    }
    getUserAsync()
  }, [savedUserInfoId, isUserEdited, getUser])
  return (
    <div>
      <PrePageBtn toPage='/main' name={name} tweetCount={tweetCount} />
      <div className={styles.topUserInfoWrapper}>
        <img className={styles.topUserBanner} src={tempDataObject ? (tempDataObject.banner ? tempDataObject.banner : dummyBackgroundImage) : dummyBackgroundImage} alt="dummyBackgroundImage.svg" />
        <img className={styles.topUserPhoto} src={tempDataObject ? (tempDataObject.avatar ? tempDataObject.avatar : avatarDefaultMini) : savedUserInfoParsed.avatar} alt='avatar' />
        <button className={styles.topUserEditBtn} onClick={handleShowModal} >
          <img src={editUserInfoBtn} alt="editUserInfoBtn.svg" />
        </button>
        <div className={styles.topUserWordsWrapper}>
          <div className={styles.topUserName}>{tempDataObject ? tempDataObject.name : name}</div>
          <div className={styles.topUserAccount}>@{tempDataObject ? tempDataObject.account : account}</div>
          <div className={styles.topUserIntro}>{intro}</div>
          <div className={styles.topUserFollowWrapper}>
            <div>
              <button
                className={styles.followBtn}
                value='followings'
                onClick={e => { handleFollowDetailClick(e.currentTarget.value) }}
              >
                <span className={styles.topUserFollowCount}>{tempDataObject ? tempDataObject.followingCount : followingCount}</span><span className={styles.topUserFollowWord}>跟隨中</span>
              </button>
            </div>
            <div className={styles.topUserFollowerWrapper}>
              <button
                className={styles.followBtn}
                value='followers'
                onClick={e => { handleFollowDetailClick(e.currentTarget.value) }}
              >
                <span className={styles.topUserFollowCount}>{tempDataObject ? tempDataObject.followerCount : followerCount}</span><span className={styles.topUserFollowWord}>跟隨者</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditUserModal
        handleClose={handleClose}
        show={show}
        onNameChange={(updateNameInput) => updateNameInput ? setName(updateNameInput) : setName('')}
        onIntroChange={(updateIntroInput) => updateIntroInput ? setIntro(updateIntroInput) : setIntro('')}
        onSave={handleSave}
        nameBorderLine={clsx('', { [styles.wordLengthError]: name.length > 50 }, { [styles.emptyError]: name.trim().length === 0 })}
        // introBorderLine={clsx('', { [styles.wordLengthError]: intro.length > 160 }, { [styles.emptyError]: intro.trim().length === 0 })}
        nameValue={name}
        introValue={intro}
        handleAvatarFile={handleAvatarFile}
        handleBannerFile={handleBannerFile}
        modalAvatar={tempDataObject ? (tempDataObject.avatar ? tempDataObject.avatar : avatarDefaultMini) : savedUserInfoParsed.avatar}
        modalBanner={tempDataObject ? (tempDataObject.banner ? tempDataObject.banner : dummyBackgroundImage) : dummyBackgroundImage}
        handleBannerDelete={() => setBanner(null)}
      />
    </div>
  )
}


export function EditUserModal({ show, handleClose, onNameChange, onIntroChange, nameValue, introValue, onSave, nameBorderLine, introBorderLine, handleAvatarFile, handleBannerFile, modalAvatar, modalBanner, handleBannerDelete }) {
  const avatarRefInput = useRef(null)
  const bannerRefInput = useRef(null)
  return (
    <div className={styles.modalContainer}>
      <Modal className={clsx("fade modal show", styles.modal)} show={show} onHide={handleClose}>
        <Modal.Header className={clsx(styles.modalHeader)}>
          <Modal.Header />
          <div onClick={handleClose}>
            <img className={clsx(styles.modalClose)} src={cross} alt="cross.svg" />
          </div>
          <Modal.Title className={styles.modalTitle}>
            <h5 className={styles.modalText}>編輯個人資料</h5>
          </Modal.Title>
          <TopTweetButton btnName={clsx(styles.modalSubmit)} text={"儲存"} onClick={onSave} />
        </Modal.Header>
        <Modal.Body className={clsx(styles.modalBody)}>
          <div className={styles.modalImageContainer}>
            <img className={clsx(styles.topUserBanner, styles.modalBackgroundImage)} src={modalBanner} alt="backgroundImage.svg" />
            <img className={clsx(styles.topUserPhoto, styles.modalUserPhoto)} src={modalAvatar} alt="userPhoto.svg" />
            <input id="avatarInput" className={styles.avatarInput} type="file" onChange={e => {
              handleAvatarFile?.(e)
            }} ref={avatarRefInput} />
            {/* 點擊大頭貼相機按鈕，同等點擊input file*/}
            <img className={styles.iconCameraUserPhoto} src={camera} alt="camera.svg" onClick={() => {
              console.log(avatarRefInput.current)
            }} />
            <input id="bannerInput" className={styles.bannerInput} type="file" onChange={e => {
              handleBannerFile?.(e)
            }} ref={bannerRefInput} />
            {/* 點擊背景相機按鈕，同等點擊input file */}
            <img className={styles.iconCamera} src={camera} alt="camera.svg" onClick={() => {
              console.log(bannerRefInput.current)
            }} />
            <img className={styles.iconWhiteCross} src={white_cross} alt="white_cross.svg" onClick={() => {
              alert("Banner deleted")
              handleBannerDelete()
            }} />
          </div>
          <div className={styles.topUserWordsWrapper}>
          </div>
          {/* 使用者input的名字 */}
          <AuthInput
            className={styles.nameInput}
            borderLine={nameBorderLine}
            label={"名稱"}
            onChange={onNameChange}
            value={nameValue}
          />
          {/* 使用者input的自我介紹 */}
          <AuthInput
            className={styles.introductionInput}
            borderLine={introBorderLine}
            label={"自我介紹"}
            onChange={onIntroChange}
            value={introValue}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}