// React Hook
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// 元件類
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopUserSection from "components/TopUserSection/TopUserSection.jsx";
import ChangeUserContent from "components/ChangeUserContent/ChangeUserContent.jsx";
import TweetCollection from "components/TweetCollection/TweetCollection.jsx";
import ReplyCollectionUser from 'components/ReplyCollectionUser/ReplyCollectionUser';
import LikeCollection from 'components/LikeCollection/LikeCollection';
// API
import { getUser, getUserTweets, getUserReplies, getUserLikes } from '../api/tweets';
import { AuthContext } from 'context/AuthContext'


export default function UserSelfPage() {
  const navigate = useNavigate();
  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState('tweets')
  // tweets 存在這
  const [tweets, setTweets] = useState([]);
  // 已回覆內容存在這
  const [replies, setReplies] = useState([]);
  // 喜歡過的推特存在這
  const [likes, setLikes] = useState([]);
  const { isUpdatedReplies, isTweetUpdated, isUpdateLikes } = useContext(AuthContext)
  // 使用者詳細帳號資訊
  const [userDetail, setUserDetail] = useState({})
  // userId 從 localStorage 拿
  const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"))
  const savedUserInfoId = savedUserInfo.id
  const role = savedUserInfo.role

  // 設置 flag 讓 TopUserSectionOther 與 RightBanner 能彼此連動
  const [flagForRendering, setFlagForRendering] = useState(false);

  // 為了顯示左側按鈕顏色需做判斷，共有 1、2、3
  const currentPage = 2

  // 變更瀏覽區塊
  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  // 將 UserOtherFollowPage 要用的瀏覽項目先存起來並跳轉頁面
  function handleFollowDetailClick(followContent) {
    localStorage.setItem("followContent", followContent);
    navigate('/user/self/follow')
  }

  // 透過 API 撈資料
  useEffect(() => {
    // 所有自己的推文
    const getTweetsAsync = async () => {
      try {
        // 用 Context 裡的 user id 去撈他的推文
        const tweets = await getUserTweets(savedUserInfoId);
        // 多寫一層條件式判斷是否有回傳值，若無則方便顯示相關提醒字樣
        if (tweets) {
          setTweets(tweets.map((tweet) => ({ ...tweet })));
        } else {
          setTweets(null)
        }
      } catch (error) {
        console.error(error);
      }
    };
    // 所有自己已回覆的內容
    const getUserRepliesAsync = async () => {
      try {
        // 用 Context 裡的 user id 去撈他的回覆內容
        const replies = await getUserReplies(savedUserInfoId);
        if (replies) {
          setReplies(replies.map((reply) => ({ ...reply })));
        } else {
          setReplies(null)
        }
      } catch (error) {
        console.error(error);
      }
    };
    // 所有自己已喜歡的內容
    const getUserLikesAsync = async () => {
      try {
        const { data } = await getUserLikes(savedUserInfoId)
        if ({ data }) {
          setLikes(data.map((like) => ({ ...like })))
        } else {
          setLikes(null)
        }
      } catch (error) {
        console.error(error);
      }
    }
    // 撈取該使用者資訊，因為 localStorage 沒有 followingCount
    const getUserAsync = async () => {
      try {
        const data = await getUser(savedUserInfoId)
        const userDetail = data.data
        setUserDetail({ ...userDetail })
      } catch (error) {
        console.error(error);
      }
    }
    // 驗證角色，如果是管理者那就導回管理者自己的頁面
    if (savedUserInfoId && role === 'admin') {
      navigate('/admin_users');
    } else if (savedUserInfoId && role === 'user') {
      getTweetsAsync();
      getUserRepliesAsync();
      getUserLikesAsync();
      getUserAsync()
    } else {
      navigate('/login');
    }
  }, [savedUserInfoId, flagForRendering, isUpdatedReplies, isTweetUpdated, isUpdateLikes, navigate, role]);

  return (
    <MainContainer >
      <LeftBanner currentPage={currentPage} />
      <MiddleColumnContainer>
        <TopUserSection
          handleFollowDetailClick={handleFollowDetailClick}
          followingCount={userDetail.followingCount}
          followerCount={userDetail.followerCount}
        />
        <ChangeUserContent userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'tweets' && <TweetCollection tweets={tweets} userDetail={savedUserInfo} fromPage='/user/self' />}
        {userContent === 'replies' && <ReplyCollectionUser replies={replies} userDetail={savedUserInfo} />}
        {userContent === 'likes' && <LikeCollection likes={likes} userDetail={savedUserInfo} />}
      </MiddleColumnContainer>
      <RightBanner
        flagForRendering={flagForRendering}
        setFlagForRendering={setFlagForRendering}
      />
    </MainContainer >
  )
}