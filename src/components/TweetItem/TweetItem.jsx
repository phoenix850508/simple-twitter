import { useNavigate } from 'react-router-dom';
import styles from "./TweetItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import like from 'icons/like.svg'
import likeActive from 'icons/likeActive.svg'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import TopTweetButton from 'components/TopTweetSection/TopTweetComponents/TopTweetButton'
import { postReply, postLike, postUnlike } from 'api/tweets'
import { useState, useContext } from 'react'
import clsx from 'clsx'
// 引用封裝好的 Context 資訊
import { AuthContext } from 'context/AuthContext.jsx';

export default function TweetItem({ id, UserId, name, account, description, createdAt, replyCount, likeCount, avatar, isLiked, fromPage }) {
  const navigate = useNavigate();
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
  const savedUserInfoId = savedUserInfoParsed.id
  const { handleSetTweetIdClick } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [replyTweet, setReplyTweet] = useState('')
  const [replyNum, setReplyNum] = useState(replyCount)
  const [errorMsg, setErrorMsg] = useState(false)
  const [isLikedBoolean, setIsLikedBoolean] = useState(isLiked)
  const [likeNum, setLikeNum] = useState(likeCount)

  const onTweetClick = (tweetIdReceived) => {
    // 在 Context 用 state 管理，把該推文 ID 存起來
    handleSetTweetIdClick(tweetIdReceived)
    // 把 fromPage 存起來方便 ReplyListPage 做上一頁導向判斷
    localStorage.setItem("fromPage", fromPage);
    navigate('/replylist')
  }

  // 送出回覆文字
  const handleSave = async () => {
    //預防空值與回覆文字限制
    if (replyTweet.length > 140) return
    if (replyTweet.length < 1) return setErrorMsg(true)
    const response = await postReply(id, { comment: replyTweet })
    //若新增推文成功
    if (response.data.comment) {
      handleClose()
      setReplyNum(replyNum + 1)
      return
    }
    else {
      handleClose()
      return alert("新增回覆失敗")
    }
  }

  // 喜歡功能
  const handleLike = async () => {
    console.log(isLikedBoolean)
    if (isLikedBoolean === true) {
      const response = await postUnlike(id)
      //若取消喜歡成功
      if (response.data) {
        if (response.data.message === "Like 取消成功") {
          setIsLikedBoolean(false)
          //防止資料庫錯誤，若likeNum > 0則讓likeNum - 1
          setLikeNum(() => {
            if (likeNum) {
              return likeNum - 1
            }
            else return likeNum
          })
        }
      }
      else {
        return alert("取消喜歡失敗")
      }
    }
    if (isLikedBoolean === false) {
      const response = await postLike(id)
      if (response.data) {
        //若喜歡喜歡成功
        if (response.data.status === "已加入喜歡！") {
          setIsLikedBoolean(true)
          setLikeNum(likeNum + 1)
        }
        else {
          return alert("新增喜歡失敗")
        }
      }
    }
  }

  return (
    <div className={styles.tweetItemContainer}>
      <div className={styles.tweetItemWrapper}>
        {/* 點擊可跳轉 UserOtherPage 頁面 */}
        <button
          className={styles.avatarWrapper}
          onClick={() => {
            console.log('UserIdUserIdUserId', UserId)
            console.log('savedUserInfoId', savedUserInfoId)
            // 如果是 user 按自己頭像要導回 user self
            if (UserId === savedUserInfoId) {
              navigate('/user/self')
            } else {
              // 將該推文作者的使用者 id 存在 localStorage 並跳轉至 user other
              localStorage.setItem("otherUserId", UserId);
              navigate('/user/other')
            }
          }}>
          <img className={styles.avatar} src={avatar ? avatar : avatarDefaultMini} alt='avatar' />
        </button>
        <div className={styles.tweetItemInfoWrapper}>
          <div className={styles.tweetItemInfoUser}>
            <div className={styles.tweetItemInfoUserName}>{name}</div>
            <div className={styles.tweetItemInfoUserDetail}>@{account}・{createdAt}</div>
          </div>
          {/* 點擊可跳轉 replylist 頁面 */}
          <button
            className={styles.tweetItemInfoContentWrapper}
            onClick={() => { onTweetClick(id) }}>
            <p className={styles.tweetItemInfoContent}>{description}</p>
          </button>
          <div className={styles.tweetItemInfoBottom}>
            <div className={styles.tweetItemInfoBottomDiscussion} onClick={() => { handleShow() }} >
              <img className="discussion" src={discussion} alt="discussion.svg" />
              <div className={styles.tweetDiscussionNum}>{replyNum}</div>
            </div>
            <div className={styles.tweetItemInfoBottomLike}>
              <img className={styles.like} src={isLikedBoolean ? likeActive : like} alt="like.svg" onClick={handleLike} />
              <div className={styles.tweetLikeNum}>{likeNum}</div>
            </div>
          </div>
        </div>
      </div>
      <ReplyTweetModal
        handleShow={handleShow}
        show={show}
        handleClose={handleClose}
        threadUserName={name}
        threadUserAccount={account}
        threadDescription={description}
        threadCreatedAt={createdAt}
        threadUserAvatar={avatar}
        onInputChange={
          (replyInput) => {
            setReplyTweet(replyInput)
            setErrorMsg(false)
          }
        }
        onSave={handleSave}
        borderLine={clsx('', { [styles.wordLengthError]: replyTweet.length > 140 }, { [styles.emptyReplyError]: errorMsg })}
      />
    </div>
  )
}

export function ReplyTweetModal({ show, handleClose, threadUserName, threadUserAccount, threadDescription, threadCreatedAt, threadUserAvatar, onInputChange, onSave, borderLine }) {
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
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
              <img className={styles.threadUserAvatar} src={threadUserAvatar ? threadUserAvatar : avatarDefaultMini} alt="avatarDefaultMini.svg" />
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
            <img className={styles.avatar} src={savedUserInfoParsed.avatar} alt="avatar" />
            <input className={clsx(styles.modalInput)} type="text" placeholder="推你的回覆" onChange={e => onInputChange?.(e.target.value)} />
            <div className={borderLine}></div>
          </div>
          <TopTweetButton btnName={clsx(styles.modalSubmit)} text={"回覆"} onClick={onSave} />
        </Modal.Body>
      </Modal>
    </div>
  );
}