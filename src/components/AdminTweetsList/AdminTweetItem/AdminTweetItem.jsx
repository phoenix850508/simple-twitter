/* eslint-disable no-restricted-globals */
// 上面這行是因為要用 confirm() 這個全局函式，先在開頭禁用相關的 ESLint 規則，免得被擋

import styles from "./AdminTweetItem.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import crossDark from 'icons/crossDark.svg'

export default function AdminTweetItem({ id, name, account, description, createdAt, avatar, handleDeleteClick }) {
  // 拿 authToken
  const authToken = localStorage.getItem("authToken");

  // 確認刪除的功能，防止管理員按錯
  function confirmDelete(content) {
    let result = confirm(`
    確定要刪除以下這筆內容嗎？按下確定後將於 1 秒內刪除資料：
    ${content}
    `);
    if (result) {
      // 使用者按下確定按鈕
      // 執行刪除資料的程式碼
      handleDeleteClick(authToken, id)
      console.log("已成功刪除");
    } else {
      // 使用者按下取消按鈕
      // 不執行任何動作
      console.log("已取消刪除");
    }
  }

  return (
    <div className={styles.tweetItemContainer}>
      <div className={styles.tweetItemWrapper}>
        <button
          className={styles.tweetItemCrossBtn}
          onClick={() => { confirmDelete(description) }}
        >
          <img src={crossDark} alt="crossDark.svg" />
        </button>
        <div>
          <img className={styles.avatar} src={avatar ? avatar : avatarDefaultMini} alt='avatar' />
        </div>
        <div className={styles.tweetItemInfoWrapper}>
          <div className={styles.tweetItemInfoUser}>
            <div className={styles.tweetItemInfoUserName}>{name}</div>
            <div className={styles.tweetItemInfoUserDetail}>@{account}・{createdAt}</div>
          </div>
          <div className={styles.tweetItemInfoContentWrapper}>
            <p className={styles.tweetItemInfoContent}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}