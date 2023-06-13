import { useState, useEffect } from 'react'
import styles from './UserOtherFollowPage.module.scss'
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import PrePageBtn from 'components/PrevPageBtn/PrevPageBtn';
import ChangeUserContentForFollow from 'components/ChangeUserContentForFollow/ChangeUserContentForFollow.jsx';
import FollowerCollection from 'components/Follow/FollowerCollection/FollowerCollection';
import FollowingCollection from 'components/Follow/FollowingCollection/FollowingCollection';
// API
import { getUserFollowings, getUserFollowers } from '../api/tweets';

export default function UserOtherFollowPage() {
  // 先從 localStorage 拿使用者在 UserOtherPage 存的 userContent 當作初始值
  const savedFollowContent = localStorage.getItem("followContent");
  // userInfo 資料從 localStorage 拿
  const savedOtherUserId = localStorage.getItem("otherUserId")
  // 使用者點擊瀏覽項目最新狀態，奇怪的是，如果 useState 內 savedFollowContent 未用 {} 包起來 useEffect 就會出錯
  const [userContent, setUserContent] = useState(savedFollowContent)
  // 儲存 user other 的 followings
  const [otherUserFollowings, setOtherUserFollowings] = useState([])
  // 儲存 user other 的 followers
  const [otherUserFollowers, setOtherUserFollowers] = useState([])

  // 改變使用者瀏覽區塊
  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  // 透過 API 撈取該使用者 follow 資訊
  useEffect(() => {
    // 撈取 followings 資訊
    const getUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(savedOtherUserId)
        console.log('UserOtherFollowPage 裡的 getUserFollowings 回傳值: ', followings)
        // 只會 set 一次所以不用淺拷貝
        setOtherUserFollowings(followings)
      } catch (error) {
        console.error(error);
      }
    }
    // 撈取 followers 資訊
    const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(savedOtherUserId)
        console.log('UserOtherFollowPage 裡的 getUserFollowers 回傳值: ', followers)
        // 只會 set 一次所以不用淺拷貝
        setOtherUserFollowers(followers)
      } catch (error) {
        console.error(error);
      }
    }
    getUserFollowingsAsync();
    getUserFollowersAsync()
  }, [savedOtherUserId]);


  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <div className={styles.prePageBtnForFollow}>
          <PrePageBtn />
        </div>
        <ChangeUserContentForFollow userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'followers' && <FollowerCollection followers={otherUserFollowers} />}
        {userContent === 'followings' && <FollowingCollection followings={otherUserFollowings} />}
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}