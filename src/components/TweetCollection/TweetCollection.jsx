import styles from "./TweetCollection.module.scss";
import TweetItem from "components/TweetItem/TweetItem.jsx";

export default function TweetCollection() {
  return (
    <div className={styles.tweetCollectionContainer}>
      <TweetItem />
      <TweetItem />
      <TweetItem />
      <TweetItem />
      <TweetItem />
      <TweetItem />
    </div>
  )
}