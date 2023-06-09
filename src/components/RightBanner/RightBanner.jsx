import styles from "./RightBanner.module.scss";
import avatarDefaultMini from 'icons/avatarDefaultMini.svg'
import following from 'icons/following.svg'
// follow 暫時沒用到先註解掉
// import follow from 'icons/follow.svg'


export default function RightBanner() {
  return (
    <div className={styles.RightBannerContainer}>
      <div className={styles.RightBannerTitle}>
        推薦跟隨
      </div>
      <RecommendCollection />
    </div>
  )
}

function RecommendCollection() {
  return (
    <div className={styles.RecommendCollectionContainer}>
      <RecommendItem />
      <RecommendItem />
      <RecommendItem />
      <RecommendItem />
      <RecommendItem />
      <RecommendItem />
      <RecommendItem />
      <RecommendItem />
    </div>
  )
}

function RecommendItem() {
  return (
    <div className={styles.RecommendItemContainer}>
      <div>
        <img src={avatarDefaultMini} alt="avatarDefaultMini.svg" />
      </div>
      <div className={styles.RecommendItemInfo}>
        <div className={styles.RecommendItemInfoName}>name</div>
        <div className={styles.RecommendItemInfoAccount}>@account</div>
      </div>
      <div>
        <img src={following} alt="following.svg" />
      </div>
    </div>
  )
}