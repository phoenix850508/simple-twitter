import styles from './TopUserSection.module.scss'
import dummyBackgroundImage from 'icons/dummyBackgroundImage.svg'
import dummyUserPhoto from 'icons/dummyUserPhoto.svg'
import editUserInfoBtn from 'icons/editUserInfoBtn.svg'
import PrePageBtn from 'components/PrevPageBtn/PrevPageBtn.jsx'
import {useState, useEffect} from 'react'
import clsx from 'clsx'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import TopTweetButton from 'components/TopTweetSection/TopTweetComponents/TopTweetButton'
import AuthInput from 'components/Form/AuthInput'
import camera from 'icons/camera.svg'
import white_cross from 'icons/white_cross.svg'
import {postUserSelf} from 'api/tweets.js'
import {useAuth} from 'context/authContext.js'


export default function TopUserSection() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newName, setNewName] = useState('');
  const [newIntroduction, setNewIntroduction] = useState('');
  const {currentUser} = useAuth()
//   {
//     "id": 14,
//     "email": "user1@example.com",
//     "account": "user1",
//     "name": "Spongebob",
//     "avatar": "https://loremflickr.com/320/240/people",
//     "banner": null,
//     "introduction": "HI!",
//     "role": "user",
//     "createdAt": "2023-06-11T01:22:52.000Z",
//     "updatedAt": "2023-06-11T04:08:46.401Z"
// }
  // 這邊需要加入GET user/:id 的API去取得user原始的資料，包括背景圖片、大頭貼、、名稱和自我介紹
  // 不過這條API可以之後再做，現在先只處理POST API的資訊傳遞(需轉換成 Form-data)
  const updatedUserSelf = new FormData()
  const handleSave = async() => {
    updatedUserSelf.append('name', newName)
    updatedUserSelf.apend('introduction', newIntroduction)
    const response = await postUserSelf({id: currentUser, formData: updatedUserSelf, name: newName, introduction: newIntroduction})
    console.log(response)
    // 若成功把使用者編輯資料送出
    if (response.id) {
      alert('successfully updated')
      setShow(false)
    }
    // 若使用者編輯資料失敗
    else {
      alert('failed to update')
      setShow(false)
    }
  }
  return (
    <div>
      <PrePageBtn />
      <div className={styles.topUserInfoWrapper}>
        <img src={dummyBackgroundImage} alt="dummyBackgroundImage.svg" />
        <img className={styles.topUserPhoto} src={dummyUserPhoto} alt="dummyUserPhoto.svg" />
        <button className={styles.topUserEditBtn} onClick={handleShow} >
          <img src={editUserInfoBtn} alt="editUserInfoBtn.svg" />
        </button>
        <div className={styles.topUserWordsWrapper}>
          <div className={styles.topUserName}>name</div>
          <div className={styles.topUserAccount}>@account</div>
          <div className={styles.topUserIntro}>introduction</div>
          <div className={styles.topUserFollowWrapper}>
            <div>
              <span className={styles.topUserFollowCount}>followingCount</span><span className={styles.topUserFollowWord}>跟隨中</span>
            </div>
            <div className={styles.topUserFollowerWrapper}>
              <span className={styles.topUserFollowCount}>followerCount</span><span className={styles.topUserFollowWord}>跟隨者</span>
            </div>
          </div>
        </div>
      </div>
      <EditUserModal 
      handleClose={handleClose} 
      show={show}
      onNameChange={(updateNameInput) => setNewName(updateNameInput)}
      onIntroChange={(updateIntroInput) => setNewIntroduction(updateIntroInput)}
      onSave={handleSave}
      />
    </div>
  )
}

export function EditUserModal({show, handleClose, onNameChange, onIntroChange, onSave}) {
  return (
    <div className={styles.modalContainer}>
      <Modal className={clsx("fade modal show", styles.modal)} show={show} onHide={handleClose}>
        <Modal.Header className={clsx(styles.modalHeader)}>
        <Modal.Header/>
            <div onClick={handleClose}>
              <img className={clsx(styles.modalClose)} src={cross} alt="cross.svg" />
            </div>
          <Modal.Title className={styles.modalTitle}>
            <h5 className={styles.modalText}>編輯個人資料</h5>
          </Modal.Title>
          <TopTweetButton btnName={clsx(styles.modalSubmit)} text={"儲存"} onClick={onSave}/>
        </Modal.Header>
        <Modal.Body className={clsx(styles.modalBody)}>
          <div className={styles.modalImageContainer}>
            {/* 背景的照片的會隨著TopUserSection的背景照片改變，這邊先放入假資料 */}
            <img className={styles.modalBackgroundImage} src={dummyBackgroundImage} alt="dummyBackgroundImage.svg" />
            {/* 照片的src會隨著TopUserSection的照片改變，這邊先放入假資料 */}
            <img className={clsx(styles.topUserPhoto, styles.modalUserPhoto)} src={dummyUserPhoto} alt="dummyUserPhoto.svg" />
            <img className={styles.iconCameraUserPhoto} src={camera} alt="camera.svg" />
            <img className={styles.iconCamera} src={camera} alt="camera.svg" />
            <img className={styles.iconWhiteCross} src={white_cross} alt="white_cross.svg" />
          </div>
          <div className={styles.topUserWordsWrapper}>
          </div>
        {/* 使用者input的名字 */}
        <AuthInput 
        className={styles.nameInput}
        placeholder={"名稱"}
        onChange={onNameChange}
        />
        {/* 使用者input的自我介紹 */}
        <AuthInput 
        className={styles.introductionInput}
        placeholder={"自我介紹"}
        onChange={onIntroChange}
        />
        </Modal.Body>
      </Modal>
    </div>
  )
}