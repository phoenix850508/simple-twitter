import clsx from 'clsx'
import styles from "./ChangeUserContent.module.scss";

export default function ChangeUserContent({ userContent, handleChangeUserContentClick }) {
  return (
    <div className={styles.changeUserContentBtnContainer}>
      <div className={styles.changeUserContentBtnDiv}>
        <button
          className={clsx({
            [styles.changeUserContentBtn]: userContent !== 'tweets',
            [styles.changeUserContentBtnActive]: userContent === 'tweets',
          })}
          value='tweets'
          onClick={e => { handleChangeUserContentClick(e.target.value) }}>推文</button>
      </div>
      <div className={styles.changeUserContentBtnDiv}>
        <button
          className={clsx({
            [styles.changeUserContentBtn]: userContent !== 'replies',
            [styles.changeUserContentBtnActive]: userContent === 'replies',
          })}
          value='replies'
          onClick={e => { handleChangeUserContentClick(e.target.value) }}>回覆</button>
      </div>
      <div className={styles.changeUserContentBtnDiv}>
        <button
          className={clsx({
            [styles.changeUserContentBtn]: userContent !== 'likes',
            [styles.changeUserContentBtnActive]: userContent === 'likes',
          })}
          value='likes'
          onClick={e => { handleChangeUserContentClick(e.target.value) }}>喜歡的內容</button>
      </div>
    </div>
  )
}
