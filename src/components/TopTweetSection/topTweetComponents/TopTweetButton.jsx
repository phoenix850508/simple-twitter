import styles from './TopTweetButton.module.scss'
import clsx from 'clsx'

export default function TopTweetButton({btnName}) {
  return (
    <button className={clsx(styles.tweetBtn, btnName)}>推文</button>
  )
}