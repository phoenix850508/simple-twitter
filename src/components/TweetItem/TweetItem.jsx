import { useNavigate } from 'react-router-dom';
import styles from "./TweetItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import like from 'icons/like.svg'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import TopTweetButton from 'components/TopTweetSection/TopTweetComponents/TopTweetButton'
import UserTweetPhoto from 'components/TopTweetSection/TopTweetComponents/UserTweetPhoto'
import { useState, useContext } from 'react'
import clsx from 'clsx'
// likeActive 暫時沒用到先註解掉
// import likeActive from 'icons/likeActive.svg'
// 引用封裝好的 Context 資訊
import { AuthContext } from 'context/AuthContext.jsx';

export default function TweetItem({ id, name, account, description, createdAt, replyCount, likeCount, avatar }) {
  const navigate = useNavigate();
  // 使用蟲洞從 authContext.js 拿資料：setTweetID
  const { handleSetTweetIdClick } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.tweetItemContainer}>
      <div className={styles.tweetItemWrapper}>
        <div>
          <img className={styles.avatar} src={avatar} alt={avatarDefaultMini} />
        </div>
        <div className={styles.tweetItemInfoWrapper}>
          <div className={styles.tweetItemInfoUser}>
            <div className={styles.tweetItemInfoUserName}>{name}</div>
            <div className={styles.tweetItemInfoUserDetail}>@{account}・{createdAt}</div>
          </div>
          {/* 點擊可跳轉 replylist 頁面 */}
          <button
            className={styles.tweetItemInfoContentWrapper}
            onClick={() => {
              // 在 Context 用 state 管理，把該推文 ID 存起來
              handleSetTweetIdClick(id)
              console.log('TweetItem 裡的推文 id: ', id)
              navigate('/replylist')
            }}>
            <p className={styles.tweetItemInfoContent}>{description}</p>
          </button>
          <div className={styles.tweetItemInfoBottom}>
            <div className={styles.tweetItemInfoBottomDiscussion} onClick={handleShow} >
              <img src={discussion} alt="discussion.svg" />
              <div className={styles.tweetDiscussionNum}>{replyCount}</div>
            </div>
            <div className={styles.tweetItemInfoBottomLike}>
              <img src={like} alt="like.svg" />
              <div className={styles.tweetLikeNum}>{likeCount}</div>
            </div>
          </div>
        </div>
      </div>
      <ReplyTweetModal handleShow={handleShow} show={show} handleClose={handleClose} />
    </div>
  )
}

export function ReplyTweetModal({ handleShow, show, handleClose }) {
  return (
    <div className={styles.modalContainer}>
      <Modal className={clsx("fade modal show", styles.modal)} show={show} onHide={handleClose}>
        <Modal className={clsx("modal-content", styles.modalContent)} />
        <Modal.Header className={clsx(styles.modalHeader)}>
          <Modal.Header />
          <Modal.Title>
            <div onClick={handleClose}>
              <img className={clsx(styles.modalClose)} src={cross} alt="cross.svg" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={clsx(styles.modalBody)}>
          <div className={styles.modalPost}>
            <div className={styles.replyModaldAvatarContainer}>
              <img src={avatarDefaultMini} alt="avatarDefaultMini.svg" />
            </div>
            <div className={styles.tweetItemInfoWrapper}>
              <div className={styles.tweetItemInfoUser}>
                <div className={styles.tweetItemInfoUserName}>John Doe</div>
                <div className={styles.tweetItemInfoUserDetail}>@ajohndoe・3小時</div>
              </div>
              <div className={styles.tweetItemInfoContentWrapper}>
                <p className={styles.tweetItemInfoContent}>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.</p>
                <div><span>回覆給</span><span className={styles.replyAt}> @johndoe</span></div>
              </div>
            </div>
          </div>
          <div className={styles.modalPost}>
            <UserTweetPhoto />
            <input className={clsx(styles.modalInput)} type="text" placeholder="推你的回覆" />
          </div>
          <TopTweetButton btnName={clsx(styles.modalSubmit)} text={"回覆"} />
        </Modal.Body>
      </Modal>
    </div>
  );
}