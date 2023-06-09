// LikeItem 的 layout 跟 TweetItem 一樣
// 之後要寫邏輯判斷是否為 like、發文者資訊
import styles from "./LikeItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import TopTweetButton from 'components/TopTweetSection/TopTweetComponents/TopTweetButton'
import discussion from 'icons/discussion.svg'
import likeActive from 'icons/likeActive.svg'
import clsx from 'clsx'
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { clear } from "@testing-library/user-event/dist/clear";

export default function LikeItem({ id, avatar, name, account, description, createdAt, replyCount, likeCount }) {
  const { setIsUpdatedReplies, setIsUpdateLikes, postUnlike, postReply } = useContext(AuthContext)
  const [show, setShow] = useState(false);
  const handleClose = () => {
    clearForm()
    setShow(false)
  }
  const handleShow = () => setShow(true);
  const [replyTweet, setReplyTweet] = useState('')
  const [errorMsg, setErrorMsg] = useState(false)
  const clearForm = () => {
    setReplyTweet('');
  };
  // 送出回覆文字
  const handleSave = async () => {
    //預防空值與回覆文字限制
    if (replyTweet.length > 140) return
    if (replyTweet.trim().length < 1) return setErrorMsg(true)
    const response = await postReply(id, { comment: replyTweet })
    //若新增推文成功
    if (response.data.comment) {
      clearForm()
      handleClose()
      return
    }
    else {
      clearForm()
      handleClose()
      return alert("新增回覆失敗")
    }
  }

  // 喜歡功能
  const handleLike = async () => {
    const response = await postUnlike(id)
    //若取消喜歡成功
    if (!response.data) {
      alert("取消喜歡失敗")
      return
    }
  }

  useEffect(() => {
    setIsUpdateLikes(false)
    setIsUpdatedReplies(false)
  }, [setIsUpdateLikes, setIsUpdatedReplies])
  return (
    <div className={styles.tweetItemContainer}>
      <div className={styles.tweetItemWrapper}>
        <div>
          <img className={styles.avatar} src={avatar ? (avatar ? avatar : avatarDefaultMini) : avatarDefaultMini} alt='avatar' />
        </div>
        <div className={styles.tweetItemInfoWrapper}>
          <div className={styles.tweetItemInfoUser}>
            <div className={styles.tweetItemInfoUserName}>{name}</div>
            <div className={styles.tweetItemInfoUserDetail}>@{account}・{createdAt}</div>
          </div>
          <div className={styles.tweetItemInfoContentWrapper}>
            <p className={styles.tweetItemInfoContent}>{description}</p>
          </div>
          <div className={styles.tweetItemInfoBottom}>
            <div className={styles.tweetItemInfoBottomDiscussion}>
              <img src={discussion} alt="discussion.svg" onClick={handleShow} />
              <div className={styles.tweetDiscussionNum}>{replyCount}</div>
            </div>
            <div className={styles.tweetItemInfoBottomLike}>
              <img className={styles.tweetLike} src={likeActive} alt="likeActive.svg" onClick={handleLike} />
              <div className={styles.tweetLikeNum}>{likeCount}</div>
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
        value={replyTweet}
      />
    </div>
  )
}

export function ReplyTweetModal({ show, handleClose, threadUserName, threadUserAccount, threadDescription, threadCreatedAt, threadUserAvatar, onInputChange, onSave, borderLine, value }) {
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
            <img className={styles.avatar} src={savedUserInfoParsed.avatar ? savedUserInfoParsed.avatar : avatarDefaultMini} alt="avatar" />
            <input className={clsx(styles.modalInput)} type="text" placeholder="推你的回覆" onChange={e => onInputChange?.(e.target.value)} value={value} />
          </div>
          <TopTweetButton btnName={clsx(styles.modalSubmit)} text={"回覆"} onClick={onSave} />
          <div className={borderLine}></div>
        </Modal.Body>
      </Modal>
    </div>
  );
}