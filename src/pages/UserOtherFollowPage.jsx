import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
import { getUserFollowings, getUserFollowers, getUser } from '../api/tweets';

export default function UserOtherFollowPage() {
  const navigate = useNavigate()
  // 先從 localStorage 拿使用者在 UserOtherPage 存的 userContent 當作初始值
  const savedFollowContent = localStorage.getItem("followContent");
  // userInfo 資料從 localStorage 拿
  const savedOtherUserId = localStorage.getItem("otherUserId")
  // 使用者點擊瀏覽項目最新狀態，奇怪的是，如果 useState 內 savedFollowContent 未用 {} 包起來 useEffect 就會出錯
  // 但不知為何現在是正常的
  const [userContent, setUserContent] = useState(savedFollowContent)
  // 儲存 user other 的 followings
  const [otherUserFollowings, setOtherUserFollowings] = useState([])
  // 儲存 user other 的 followers
  const [otherUserFollowers, setOtherUserFollowers] = useState([])
  const [tweetCount, setTweetCount] = useState(null)
  const [otherUserName, setOtherUserName] = useState(null)
  // 負責觸發 UserSelfFollowPage 與 RightBanner 重新渲染
  const [flagForRendering, setFlagForRendering] = useState(false)

  // 改變使用者瀏覽區塊
  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  // userInfo 資料從 localStorage 拿
  const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"))
  const savedUserId = savedUserInfo.id
  const role = savedUserInfo.role

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
    // 撈取該使用者資訊
    const getUserAsync = async () => {
      try {
        const response = await getUser(savedOtherUserId)
        setTweetCount(response.data.tweetCount)
        setOtherUserName(response.data.name)
      } catch (error) {
        console.error(error);
      }

    }
    // 驗證角色，如果是管理者那就導回管理者自己的頁面，若為登入的使用者則維持在原頁面並撈資料
    if (savedUserId && savedOtherUserId && userContent && role === 'user') {
      getUserFollowingsAsync();
      getUserFollowersAsync()
      getUserAsync()
      // 還沒點想看的內容或點擊使用者就直接到這頁就要請使用者回到首頁
    } else if (savedUserId && role === 'user') {
      navigate('/main');
    } else if (savedUserId && role === 'admin') {
      navigate('/admin_users');
      // 剩下的請先登入
    } else {
      navigate('/login');
    }
  }, [savedOtherUserId, flagForRendering, savedUserId, userContent, navigate, role]);


  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <div className={styles.prePageBtnForFollow}>
          <PrePageBtn toPage='/user/other' name={otherUserName} tweetCount={tweetCount} />
        </div>
        <ChangeUserContentForFollow userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'followers' && <FollowerCollection followers={otherUserFollowers} flagForRendering={flagForRendering} setFlagForRendering={setFlagForRendering} />}
        {userContent === 'followings' && <FollowingCollection followings={otherUserFollowings} flagForRendering={flagForRendering} setFlagForRendering={setFlagForRendering} />}
      </MiddleColumnContainer>
      <RightBanner flagForRendering={flagForRendering} setFlagForRendering={setFlagForRendering} />
    </MainContainer>
  )
}