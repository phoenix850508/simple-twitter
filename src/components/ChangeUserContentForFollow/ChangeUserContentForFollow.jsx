import clsx from 'clsx'
import styles from "./ChangeUserContentForFollow.module.scss";

export default function ChangeUserContentForFollow({ userContent, handleChangeUserContentClick }) {
  return (
    <div className={styles.changeUserContentBtnContainer}>
      <div className={styles.changeUserContentBtnDiv}>
        <button
          className={clsx({
            [styles.changeUserContentBtn]: userContent !== 'followers',
            [styles.changeUserContentBtnActive]: userContent === 'followers',
          })}
          value='followers'
          onClick={e => { handleChangeUserContentClick(e.target.value) }}>跟隨者</button>
      </div>
      <div className={styles.changeUserContentBtnDiv}>
        <button
          className={clsx({
            [styles.changeUserContentBtn]: userContent !== 'followings',
            [styles.changeUserContentBtnActive]: userContent === 'followings',
          })}
          value='followings'
          onClick={e => { handleChangeUserContentClick(e.target.value) }}>正在跟隨</button>
      </div>
    </div>
  )
}
