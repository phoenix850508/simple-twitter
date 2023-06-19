import styles from './TopReplyListSection.module.scss'
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import like from 'icons/like.svg'
import likeActive from 'icons/likeActive.svg'
import PrevPageBtnToTweets from './PrevPageBtnToTweets/PrevPageBtnToTweets'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import TopTweetButton from 'components/TopTweetSection/TopTweetComponents/TopTweetButton'
import {useState, useContext} from 'react'
import { AuthContext } from 'context/AuthContext'
import clsx from 'clsx'
import { useEffect } from 'react'

export default function TopReplyListSection({ singleTweetInfo }) {
  const {postReply, postLike, postUnlike, setIsUpdatedReplies} = useContext(AuthContext)
  const [replyTweet, setReplyTweet] = useState('')
  const [errorMsg, setErrorMsg] = useState(false)
  const [show, setShow] = useState(false);
  const [objectData, setObjectData] = useState(null)
  const handleClose = () => {
    clearForm()
    setShow(false)
  }
  const handleShow = () => setShow(true);
  const clearForm = () => {
    setReplyTweet('');
  };


    // 送出回覆文字
  const handleSave = async () => {
    //預防空值與回覆文字限制
    if (replyTweet.length > 140) return
    if (replyTweet.trim().length < 1) return setErrorMsg(true)
    const response = await postReply(objectData.id, { comment: replyTweet })
    //若新增推文成功
    if (response.data.comment) {
      clearForm()
      handleClose()
      setObjectData({...objectData, replyCount: objectData.replyCount + 1})
      return
    }
    else {
      clearForm()
      handleClose()
      return alert("新增回覆失敗")
    }
  }

  // 喜歡和取消喜歡功能
  const handleLike = async () => {
    //取消喜歡
    if (objectData && objectData.isLiked){
      const response = await postUnlike(objectData.id)
      //若取消喜歡成功
      if (response.data) {
        if (response.data.message === "Like 取消成功") {
          setObjectData({...objectData, likeCount : objectData.likeCount - 1, isLiked : false})
        }
      }
      else {
        return alert("取消喜歡失敗")
      }
    }
    //增加喜歡
    if (objectData && !objectData.isLiked) {
      const response = await postLike(objectData.id)
      if (response.data) {
        //若喜歡喜歡成功
        if (response.data.status === "已加入喜歡！") {
          setObjectData({...objectData, likeCount : objectData.likeCount + 1, isLiked : true})        
        }
        else {
          return alert("新增喜歡失敗")
        }
      }
    }
  }

  useEffect(() => {
    setObjectData(singleTweetInfo)
    setIsUpdatedReplies(false)
  },[singleTweetInfo, setIsUpdatedReplies])
  return (
    <>
      <PrevPageBtnToTweets />
      <div className={styles.tweetItemContainer}>
        <div className={styles.tweetItemWrapper}>
          <div className={styles.tweetItemInfoWrapper}>
            <div>
              <img className={styles.avatar} src={objectData? (objectData.User.avatar? objectData.User.avatar : avatarDefaultMini) : avatarDefaultMini} alt="avatarDefaultMini" />
            </div>
            <div className={styles.tweetItemInfoUser}>
              <div className={styles.tweetItemInfoUserName}>{objectData && objectData.User.name}</div>
              <div className={styles.tweetItemInfoUserAccount}>@{objectData && objectData.User.account}</div>
            </div>
          </div>
          <div className={styles.tweetItemInfoContent}>{objectData && objectData.description}</div>
          <div className={styles.tweetItemInfoTimeWrapper}>{objectData && objectData.createdAt}</div>
          <div className={styles.tweetItemInfoCountWrapper}>
            <div>
              <span className={styles.tweetCount}>{objectData && objectData.replyCount}</span><span className={styles.tweetWord}>回覆</span>
            </div>
            <div className={styles.tweetLikeCountWrapper}>
              <span className={styles.tweetCount}>{objectData && objectData.likeCount}</span><span className={styles.tweetWord}>喜歡次數</span>
            </div>
          </div>
          <div className={styles.tweetItemIconWrapper}>
            <img className={styles.tweetItemIcon} src={discussion} alt="discussion.svg" onClick={handleShow} />
            <img className={styles.tweetItemIcon} src={objectData && objectData.isLiked? likeActive : like} alt="likeActive.svg" onClick={handleLike} />
          </div>
        </div>
      </div>
      <ReplyTweetModal
        handleShow={handleShow}
        show={show}
        handleClose={handleClose}
        threadUserName={objectData && objectData.User.name}
        threadUserAccount={objectData && objectData.User.account}
        threadDescription={objectData && objectData.description}
        threadCreatedAt={objectData && objectData.countDown}
        threadUserAvatar={objectData && objectData.User.avatar}
        onInputChange={
          (replyInput) => {
            setReplyTweet(replyInput)
            setErrorMsg(false)
          }
        }
        onSave={handleSave}
        borderLine={clsx('', { [styles.wordLengthError]: replyTweet.length > 140 }, { [styles.emptyReplyError]: errorMsg })}
      />
    </>
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
          <div className={clsx(styles.modalPost, styles.firstModalPost)}>
            <div className={styles.replyModaldAvatarContainer}>
              <img className={styles.threadUserAvatar} src={threadUserAvatar? (threadUserAvatar? threadUserAvatar : avatarDefaultMini) : avatarDefaultMini} alt="avatarDefaultMini.svg" />
            </div>
            <div className={clsx(styles.modalTweetItemInfoWrapper)}>
              <div className={styles.modalUserTweetItemInfo}>
                <div className={styles.tweetItemInfoUserName}>{threadUserName}</div>
                <div className={styles.tweetItemInfoUserDetail}>@{threadUserAccount}・{threadCreatedAt}</div>
              </div>
              <div className={styles.tweetItemInfoContentWrapper}>
                <p className={styles.tweetItemInfoContent}>{threadDescription}</p>
                <div><span>回覆給</span><span className={styles.replyAt}> @{threadUserAccount}</span></div>
              </div>
            </div>
          </div>
          <div className={clsx(styles.modalPost, styles.modalInputContainer)}>
            <img className={styles.threadUserAvatar} src={savedUserInfoParsed.avatar? (savedUserInfoParsed.avatar? savedUserInfoParsed.avatar : avatarDefaultMini): avatarDefaultMini} alt="avatar" />
            <input className={clsx(styles.modalInput)} type="text" placeholder="推你的回覆" onChange={e => onInputChange?.(e.target.value)} />
          </div>
          <TopTweetButton btnName={clsx(styles.modalSubmit)} text={"回覆"} onClick={onSave} />
          <div className={borderLine}></div>
        </Modal.Body>
      </Modal>
    </div>
  );
}