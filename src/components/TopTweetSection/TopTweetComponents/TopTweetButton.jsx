import styles from './TopTweetButton.module.scss'
import clsx from 'clsx'

export default function TopTweetButton({btnName, text, onClick}) {
  return (
    <button className={clsx(styles.tweetBtn, btnName)} onClick={onClick} >{text}</button>
  )
}