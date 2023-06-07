import styles from "./RightBanner.module.scss";
import follow from 'icons/follow.svg'
import following from 'icons/following.svg'


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
    <div>
      <RecommendItem />
      <RecommendItem />
      <RecommendItem />
    </div>
  )
}

function RecommendItem() {
  return (
    <div className={styles.RecommendItemContainer}>
      RecommendItem
    </div>
  )
}