import TopTweetButton from './TopTweetComponents/TopTweetButton'
import UserTweetPhoto from './TopTweetComponents/UserTweetPhoto'
import styles from './TopTweetSection.module.scss'
import clsx from 'clsx'
import cross from 'icons/cross.svg'

export default function TopTweetSection() {
  return (
    <div className={styles.topTweetContainer}>
      <section className={styles.homepageHeaderSec}>
        <h4>首頁</h4>
      </section>
      <section className={styles.postingSec} onClick={handleTweetClick} data-bs-toggle="modal" data-bs-target="#TopTweetModal" >
        <div className={styles.posting}>
          <UserTweetPhoto />
          <h5 className={styles.placeholder}>有什麼新鮮事？</h5>
        </div>
        <div className={styles.btnContainer}>
          <TopTweetButton data-bs-toggle="modal" data-bs-target="#TopTweetModal" />
        </div>
      </section>
      {/* Modal */}
      <div className={clsx("modal", styles.modal)} tabIndex={-1} id="TopTweetModal">
        <div className={clsx("modal-dialog", styles.modalDialog)}>
          <div className={clsx("modal-content", styles.modalContent)}>
            <div className={clsx("modal-header", styles.modalHeader)}>
              <button
                type="button"
                className={clsx("btn-close", styles.btnClose)}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <img src={cross} alt="cross.svg" />
              </button>
            </div>
            <div className={clsx("modal-body", styles.modalBody)}>
              <div className={styles.modalPost}>
                <UserTweetPhoto />
                <input className={styles.modalInput} type="text" placeholder="有什麼新鮮事？" />
              </div>
            </div>
            <TopTweetButton btnName={styles.modalSubmit}/>
          </div>
        </div>
      </div>
      {/* Modal */}
    </div>
  )
} 

export const handleTweetClick = (e) => {
  if(!e.target.className.includes("TopTweetSection")) return 

}