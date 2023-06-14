import styles from './TopReplyListSection.module.scss'
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import discussion from 'icons/discussion.svg'
import like from 'icons/like.svg'
import likeActive from 'icons/likeActive.svg'
import PrevPageBtnToTweets from './PrevPageBtnToTweets/PrevPageBtnToTweets'
import Modal from 'react-bootstrap/Modal';
import cross from 'icons/cross.svg'
import TopTweetButton from 'components/TopTweetSection/TopTweetComponents/TopTweetButton'
import UserTweetPhoto from 'components/TopTweetSection/TopTweetComponents/UserTweetPhoto'
import {useState} from 'react'
import clsx from 'clsx'

export default function TopReplyListSection({ singleTweetInfo }) {
  // 該篇推文資訊，可直接解析
  const { description, updatedAt, replyCount, likeCount, isLiked, tweetId } = singleTweetInfo
  // 原以為是 useEffect 出錯結果問題出在下面這行，若直接寫則整個 API 完全不會動
  // const { avatar, name, account } = singleTweetInfo.User
  let userAvatar = ''
  let userName = ''
  let userAccount = ''
  const [replyTweet, setReplyTweet] = useState('')
  const [replyNum, setReplyNum] = useState(replyCount)
  const [isLikedBoolean, setIsLikedBoolean] = useState(isLiked)
  const [likeNum, setLikeNum] = useState(likeCount)
  const [errorMsg, setErrorMsg] = useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // 不太確定為什麼會需要繞一圈才取得到 User 內的值？？？
  if (singleTweetInfo && singleTweetInfo.User) {
    const { avatar, name, account } = singleTweetInfo.User;
    // 其他操作
    userAvatar = avatar
    userName = name
    userAccount = account
  }
  

  return (
    <>
      <PrevPageBtnToTweets />
      <div className={styles.tweetItemContainer}>
        <div className={styles.tweetItemWrapper}>
          <div className={styles.tweetItemInfoWrapper}>
            <div>
              <img className={styles.avatar} src={userAvatar} alt={avatarDefaultMini} />
            </div>
            <div className={styles.tweetItemInfoUser}>
              <div className={styles.tweetItemInfoUserName}>{userName}</div>
              <div className={styles.tweetItemInfoUserAccount}>@{userAccount}</div>
            </div>
          </div>
          <div className={styles.tweetItemInfoContent}>{description}</div>
          <div className={styles.tweetItemInfoTimeWrapper}>{updatedAt}</div>
          <div className={styles.tweetItemInfoCountWrapper}>
            <div>
              <span className={styles.tweetCount}>{replyCount}</span><span className={styles.tweetWord}>回覆</span>
            </div>
            <div className={styles.tweetLikeCountWrapper}>
              <span className={styles.tweetCount}>{likeCount}</span><span className={styles.tweetWord}>喜歡次數</span>
            </div>
          </div>
          <div className={styles.tweetItemIconWrapper}>
            <img className={styles.tweetItemIcon} src={discussion} alt="discussion.svg" />
            {isLiked ? <img className={styles.tweetItemIcon} src={likeActive} alt="likeActive.svg" /> : <img className={styles.tweetItemIcon} src={like} alt="like.svg" />}
          </div>
        </div>
      </div>
      {/* <ReplyTweetModal
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
      /> */}
    </>
  )
}

export function ReplyTweetModal({ show, handleClose, threadUserName, threadUserAccount, threadDescription, threadCreatedAt, threadUserAvatar, onInputChange, onSave, borderLine }) {
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
            <div className={borderLine}></div>
          </div>
          <TopTweetButton btnName={clsx(styles.modalSubmit)} text={"回覆"} onClick={onSave} />
        </Modal.Body>
      </Modal>
    </div>
  );
}