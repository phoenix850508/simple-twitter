import styles from './TopTweetButton.module.scss'
import clsx from 'clsx'

export default function TopTweetButton({btnName, text}) {
  return (
    <button className={clsx(styles.tweetBtn, btnName)}>{text}</button>
  )
}