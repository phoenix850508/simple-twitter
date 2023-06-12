import styles from './TopTweetModal.module.scss'
import clsx from 'clsx'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import UserTweetPhoto from './UserTweetPhoto'
import TopTweetButton from './TopTweetButton'



export default function TopTweetModal({modal, modalHeader, modalClose, modalBody, modalInput, modalSubmit, handleClose, show, onChange, value, onSubmit, buttonText, borderLine}) {

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
            <UserTweetPhoto />
            <input 
            className={clsx(styles.modalInput, modalInput)}
            type="text" 
            placeholder="有什麼新鮮事？" 
            onChange={(e) => onChange?.(e.target.value)}
            value={value}
             />
             <div className={clsx(styles.borderLine, borderLine)}></div>
          </div>
          <TopTweetButton btnName={clsx(styles.modalSubmit, modalSubmit)} text={clsx(buttonText)} onClick={onSubmit} />
        </Modal.Body>
      </Modal>
    </div>
  );
}