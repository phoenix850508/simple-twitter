import { useNavigate } from 'react-router-dom';
import styles from "./TweetItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import like from 'icons/like.svg'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import TopTweetButton from 'components/TopTweetSection/TopTweetComponents/TopTweetButton'
import UserTweetPhoto from 'components/TopTweetSection/TopTweetComponents/UserTweetPhoto'
import {postReply} from 'api/tweets'
import { useState, useContext, useRef } from 'react'
import clsx from 'clsx'
// likeActive 暫時沒用到先註解掉
// import likeActive from 'icons/likeActive.svg'
// 引用封裝好的 Context 資訊
import { AuthContext } from 'context/AuthContext.jsx';

export default function TweetItem({ id, UserId, name, account, description, createdAt, replyCount, likeCount, avatar }) {
  const navigate = useNavigate();
  // 使用蟲洞從 authContext.js 拿資料：savedUserInfoId
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
  const savedUserInfoId = savedUserInfoParsed.id
  const { handleSetTweetIdClick } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [replyTweet, setReplyTweet] = useState('')
  const [replyNum, setReplyNum] = useState(replyCount)
  const onTweetClick = () => {
    // 在 Context 用 state 管理，把該推文 ID 存起來
    handleSetTweetIdClick(id)
    navigate('/replylist')
  }
  //點擊回應對話按鈕彈出視窗
  const handleSave = async () => {
    //預防空值與回覆文字限制
    if(replyTweet.length < 1 || replyTweet.length > 140) return
    try {
    const response = await postReply(savedUserInfoId, {comment: replyTweet})
    //若新增推文成功
    if (response.data.comment) {
      handleClose()
      setReplyNum(replyNum + 1)
      return alert("新增回覆成功")
    }
    else {
      handleClose()
      return alert("新增回覆失敗")
    }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.tweetItemContainer}>
      <div className={styles.tweetItemWrapper}>
        {/* 點擊可跳轉 UserOtherPage 頁面 */}
        <button
          className={styles.avatarWrapper}
          onClick={() => {
            // 將該推文作者的使用者 id 存在 localStorage
            localStorage.setItem("otherUserId", UserId);
            navigate('/user/other')
          }}>
          <img className={styles.avatar} src={avatar} alt={avatarDefaultMini} />
        </button>
        <div className={styles.tweetItemInfoWrapper}>
          <div className={styles.tweetItemInfoUser}>
            <div className={styles.tweetItemInfoUserName}>{name}</div>
            <div className={styles.tweetItemInfoUserDetail}>@{account}・{createdAt}</div>
          </div>
          {/* 點擊可跳轉 replylist 頁面 */}
          <button
            className={styles.tweetItemInfoContentWrapper}
            onClick={onTweetClick}>
            <p className={styles.tweetItemInfoContent}>{description}</p>
          </button>
          <div className={styles.tweetItemInfoBottom}>
            <div className={styles.tweetItemInfoBottomDiscussion} onClick={() => handleShow()} >
              <img className="discussion" src={discussion} alt="discussion.svg" />
              <div className={styles.tweetDiscussionNum}>{replyNum}</div>
            </div>
            <div className={styles.tweetItemInfoBottomLike}>
              <img src={like} alt="like.svg" />
              <div className={styles.tweetLikeNum}>{likeCount}</div>
            </div>
          </div>
        </div>
      </div>
      <ReplyTweetModal handleShow={handleShow} show={show} handleClose={handleClose} threadUserName={name} threadUserAccount={account} threadDescription={description} threadCreatedAt={createdAt} threadUserAvatar={avatar} 
      onInputChange={(replyInput) => setReplyTweet(replyInput)}
      onSave={handleSave}  />
    </div>
  )
}

export function ReplyTweetModal({ show, handleClose, threadUserName, threadUserAccount, threadDescription, threadCreatedAt, threadUserAvatar, onInputChange, onSave }) {
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
              <img className={styles.threadUserAvatar} src={threadUserAvatar} alt="avatarDefaultMini.svg" />
            </div>
            <div className={styles.tweetItemInfoWrapper}>
              <div className={styles.tweetItemInfoUser}>
                <div className={styles.tweetItemInfoUserName}>{threadUserName}</div>
                <div className={styles.tweetItemInfoUserDetail}>@{threadUserAccount}・{threadCreatedAt}</div>
              </div>
              <div className={styles.tweetItemInfoContentWrapper}>
                <p className={styles.tweetItemInfoContent}>{threadDescription}</p>
                <div><span>回覆給</span><span className={styles.replyAt}> @{threadUserAccount}</span></div>
              </div>
            </div>
          </div>
          <div className={styles.modalPost}>
            <UserTweetPhoto />
            <input className={clsx(styles.modalInput)} type="text" placeholder="推你的回覆" onChange={e => onInputChange?.(e.target.value)} />
          </div>
          <TopTweetButton btnName={clsx(styles.modalSubmit)} text={"回覆"} onClick={onSave} />
        </Modal.Body>
      </Modal>
    </div>
  );
}