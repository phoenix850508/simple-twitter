import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()
  // 先從 localStorage 拿使用者在 UserOtherPage 存的 userContent 當作初始值
  const savedFollowContent = localStorage.getItem("followContent");
  // userInfo 資料從 localStorage 拿
  const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"))
  const savedUserId = savedUserInfo.id
  const role = savedUserInfo.role

  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState(savedFollowContent)
  // 儲存 user 的 followings
  const [userFollowings, setUserFollowings] = useState([])
  // 儲存 user 的 followers
  const [userFollowers, setUserFollowers] = useState([])
  const [tweetCount, setTweetCount] = useState(null)
  // 負責觸發 UserSelfFollowPage 與 RightBanner 重新渲染
  const [flagForRendering, setFlagForRendering] = useState(false)

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
    // 驗證角色，如果是管理者那就導回管理者自己的頁面，若為登入的使用者則維持在原頁面並撈資料
    if (savedUserId && userContent && role === 'user') {
      getUserFollowingsAsync();
      getUserFollowersAsync()
      getUserAsync()
      // 還沒點想看的內容就直接到這頁就要請使用者回到自己的頁面
    } else if (savedUserId && role === 'user') {
      navigate('/user/self');
    } else if (savedUserId && role === 'admin') {
      navigate('/admin_users');
      // 剩下的請先登入
    } else {
      navigate('/login');
    }
  }, [flagForRendering, userContent, savedUserId, navigate, role]);

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <div className={styles.prePageBtnForFollow} >
          <PrePageBtn toPage='/user/self' name={savedUserInfo.name} tweetCount={tweetCount} />
        </div>
        <ChangeUserContentForFollow userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'followers' && <FollowerCollection followers={userFollowers} flagForRendering={flagForRendering} setFlagForRendering={setFlagForRendering} />}
        {userContent === 'followings' && <FollowingCollection followings={userFollowings} flagForRendering={flagForRendering} setFlagForRendering={setFlagForRendering} />}
      </MiddleColumnContainer>
      <RightBanner flagForRendering={flagForRendering} setFlagForRendering={setFlagForRendering} />
    </MainContainer>
  )
}