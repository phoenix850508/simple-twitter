// React Hook
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// 元件類
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopUserSectionOther from 'components/TopUserSectionOther/TopUserSectionOther';
import ChangeUserContent from "components/ChangeUserContent/ChangeUserContent.jsx";
import TweetCollection from "components/TweetCollection/TweetCollection.jsx";
import ReplyCollectionUser from 'components/ReplyCollectionUser/ReplyCollectionUser';
import LikeCollection from 'components/LikeCollection/LikeCollection';
// API
import { getUserTweets, getUserReplies, getUserLikes, getUser } from '../api/tweets';


export default function UserOtherPage() {
  const navigate = useNavigate();
  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState('tweets')
  // tweets 存在這
  const [tweets, setTweets] = useState([]);
  // 已回覆內容存在這
  const [replies, setReplies] = useState([]);
  // 喜歡過的推特存在這
  const [likes, setLikes] = useState([]);
  // 是否已訂閱該使用者
  const [notification, setNotification] = useState(false)
  // 其他使用者的帳號資訊
  const [otherUserDetail, setOtherUserDetail] = useState({})
  // userInfo 資料從 localStorage 拿
  const savedOtherUserId = localStorage.getItem("otherUserId")


  // 變更瀏覽區塊
  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  // 變更訂閱通知
  function handleNotiClick() {
    setNotification(!notification)
  }

  // 將 UserOtherFollowPage 要用的瀏覽項目先存起來並跳轉頁面
  function handleFollowDetailClick(followContent) {
    localStorage.setItem("followContent", followContent);
    navigate('/user/other/follow')
  }

  // 透過 API 撈資料
  useEffect(() => {
    // 所有該使用者的推文
    const getTweetsAsync = async () => {
      try {
        // 用 Context 裡的 user id 去撈他的推文
        const tweets = await getUserTweets(savedOtherUserId);
        setTweets(tweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error(error);
      }
    };
    // 所有該使用者的已回覆的內容
    const getUserRepliesAsync = async () => {
      try {
        // 用 Context 裡的 user id 去撈他的回覆內容
        const replies = await getUserReplies(savedOtherUserId);
        setReplies(replies.map((reply) => ({ ...reply })));
      } catch (error) {
        console.error(error);
      }
    };
    // 所有該使用者的已喜歡的內容
    const getUserLikesAsync = async () => {
      try {
        const { data } = await getUserLikes(savedOtherUserId)
        setLikes(data.map((like) => ({ ...like })))
      } catch (error) {
        console.error(error);
      }
    }
    // 撈取該使用者資訊，因為 localStorage 沒有
    const getUserAsync = async () => {
      try {
        const data = await getUser(savedOtherUserId)
        const otherUserDetail = data.data
        setOtherUserDetail({ ...otherUserDetail })
      } catch (error) {
        console.error(error);
      }
    }

    if (savedOtherUserId) {
      getTweetsAsync();
      getUserRepliesAsync();
      getUserLikesAsync();
      getUserAsync();
    }
  }, [savedOtherUserId]);

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopUserSectionOther notification={notification} handleNotiClick={handleNotiClick} userDetail={otherUserDetail} handleFollowDetailClick={handleFollowDetailClick} />
        <ChangeUserContent userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'tweets' && <TweetCollection tweets={tweets} />}
        {userContent === 'replies' && <ReplyCollectionUser replies={replies} userDetail={otherUserDetail} />}
        {userContent === 'likes' && <LikeCollection likes={likes} />}
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}