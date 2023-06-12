// React Hook
import { useState, useEffect, useContext } from 'react'
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
import { getUserTweets, getUserReplies, getUserLikes } from '../api/tweets';
// 引用封裝好的 Context 資訊
import { AuthContext } from 'context/AuthContext.jsx';



export default function UserSelfPage() {
  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState('tweets')
  // tweets 存在這
  const [tweets, setTweets] = useState([]);
  // 已回覆內容存在這
  const [replies, setReplies] = useState([]);
  // 喜歡過的推特存在這
  const [likes, setLikes] = useState([]);
  // 使用蟲洞從 authContext.js 拿資料：使用者資訊
  // const { userInfo } = useContext(AuthContext);
  // userInfo 資料從 localStorage 拿
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
  const savedUserInfoId = savedUserInfoParsed.id

  // 變更瀏覽區塊
  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  // 透過 API 撈推文資料、已回覆內容
  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        // 用 Context 裡的 user id 去撈他的推文
        const tweets = await getUserTweets(savedUserInfoId);
        setTweets(tweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error(error);
      }
    };
    const getUserRepliesAsync = async () => {
      try {
        // 用 Context 裡的 user id 去撈他的回覆內容
        const replies = await getUserReplies(savedUserInfoId);
        setReplies(replies.map((reply) => ({ ...reply })));
      } catch (error) {
        console.error(error);
      }
    };
    const getUserLikesAsync = async() => {
      try {
        const {data} = await getUserLikes(currentUser.id)
        setLikes(data.map((like) => ({ ...like })))
      } catch(error) {
        console.error(error);
      }
    }
    if(currentUser) {
      getTweetsAsync();
      getUserRepliesAsync();
      getUserLikesAsync();
      console.log('UserSelfPage 的 currentUser: ', currentUser)
      console.log('UserSelfPage 的 isAuthenticated: ', isAuthenticated)
    }
  }, [currentUser, isAuthenticated]);

  return (
    <MainContainer >
      <LeftBanner />
      <MiddleColumnContainer>
        <TopUserSection />
        <ChangeUserContent userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'tweets' && <TweetCollection tweets={tweets} />}
        {userContent === 'replies' && <ReplyCollectionUser replies={replies} />}
        {userContent === 'likes' && <LikeCollection likes={likes} />}
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer >
  )
}