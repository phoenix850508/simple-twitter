import { useState, useEffect } from 'react'
import styles from './UserSelfFollowPage.module.scss'
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import PrePageBtn from 'components/PrevPageBtn/PrevPageBtn';
import ChangeUserContentForFollow from 'components/ChangeUserContentForFollow/ChangeUserContentForFollow.jsx';
import FollowerCollection from 'components/Follow/FollowerCollection/FollowerCollection';
import FollowingCollection from 'components/Follow/FollowingCollection/FollowingCollection';
// API
import { getUserFollowings, getUserFollowers, getUser } from '../api/tweets';

export default function UserSelfFollowPage() {
  // 先從 localStorage 拿使用者在 UserOtherPage 存的 userContent 當作初始值
  const savedFollowContent = localStorage.getItem("followContent");
  // userInfo 資料從 localStorage 拿
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
  const savedUserId = savedUserInfoParsed.id

  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState(savedFollowContent)
  // 儲存 user other 的 followings
  const [userFollowings, setUserFollowings] = useState([])
  // 儲存 user other 的 followers
  const [userFollowers, setUserFollowers] = useState([])
  const [tweetCount, setTweetCount] = useState(null)

  // 改變瀏覽區塊
  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  // 透過 API 撈取該使用者 follow 資訊
  useEffect(() => {
    // 撈取 followings 資訊
    const getUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(savedUserId)
        // 只會 set 一次所以不用淺拷貝
        setUserFollowings(followings)
      } catch (error) {
        console.error(error);
      }
    }
    // 撈取 followers 資訊
    const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(savedUserId)
        // 只會 set 一次所以不用淺拷貝
        setUserFollowers(followers)
      } catch (error) {
        console.error(error);
      }
    }
    // 撈取該使用者資訊
    const getUserAsync = async () => {
      try {
        const response = await getUser(savedUserId)
        setTweetCount(response.data.tweetCount)
      } catch (error) {
        console.error(error);
      }

    }
    getUserFollowingsAsync();
    getUserFollowersAsync()
    getUserAsync()
  }, [savedUserId]);

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <div className={styles.prePageBtnForFollow} >
          <PrePageBtn toPage='/user/self' name={savedUserInfoParsed.name} tweetCount={tweetCount} />
        </div>
        <ChangeUserContentForFollow userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'followers' && <FollowerCollection followers={userFollowers} />}
        {userContent === 'followings' && <FollowingCollection followings={userFollowings} />}
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}