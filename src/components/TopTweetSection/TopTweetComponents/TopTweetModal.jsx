import styles from './TopTweetModal.module.scss'
import clsx from 'clsx'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import TopTweetButton from './TopTweetButton'
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import {getUser} from 'api/tweets'



export default function TopTweetModal({modal, modalHeader, modalClose, modalBody, modalInput, modalSubmit, handleClose, show, onChange, value, onSubmit, buttonText, borderLine}) {
  const {isUserEdited} = useContext(AuthContext)
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
  const savedUserInfoParsedId = savedUserInfoParsed && savedUserInfoParsed.id
  const [dataObject, setDataObject] = useState(null)
    useEffect(() => {
    const getUserAsync= async() => {
      try {
        const response = await getUser(savedUserInfoParsedId)
        setDataObject(response.data)
      } catch (error) {
        console.error(error)
      }
    } 
    getUserAsync();
  }, [savedUserInfoParsedId, isUserEdited])

  return (
    <div className={styles.modalContainer}>
      <Modal className={clsx("fade modal show", styles.modal, modal)} show={show} onHide={handleClose}>
        <Modal.Header className={clsx(styles.modalHeader, modalHeader)}>
        <Modal.Header/>
          <Modal.Title>
            <div onClick={handleClose}>
              <img className={clsx(styles.modalClose, modalClose)} src={cross} alt="cross.svg" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={clsx(styles.modalBody, modalBody)}>
          <div className={styles.modalPost}>
            <img className={styles.avatar} src={dataObject &&  dataObject.avatar? (dataObject.avatar? dataObject.avatar : avatarDefaultMini) : avatarDefaultMini} alt="avatar" />
            <div className={styles.inputWrapper}>
            <input 
            className={clsx(styles.modalInput, modalInput)}
            type="text" 
            placeholder="有什麼新鮮事？" 
            onChange={(e) => onChange?.(e.target.value)}
            value={value}
             />
             <div className={clsx(styles.borderLine, borderLine)}></div>
            </div>
          </div>
          <TopTweetButton btnName={clsx(styles.modalSubmit, modalSubmit)} text={clsx(buttonText)} onClick={onSubmit} />
        </Modal.Body>
      </Modal>
    </div>
  );
}