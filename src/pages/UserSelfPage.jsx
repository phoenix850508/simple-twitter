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
  // userInfo 資料從 localStorage 拿
  const savedUserInfo = localStorage.getItem("userInfo")
  const savedUserInfoParsed = JSON.parse(savedUserInfo)
  const savedUserInfoId = savedUserInfoParsed.id

  // 變更瀏覽區塊
  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  // 透過 API 撈資料
  useEffect(() => {
    // 所有自己的推文
    const getTweetsAsync = async () => {
      try {
        // 用 Context 裡的 user id 去撈他的推文
        const tweets = await getUserTweets(savedUserInfoId);
        setTweets(tweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error(error);
      }
    };
    // 所有自己已回覆的內容
    const getUserRepliesAsync = async () => {
      try {
        // 用 Context 裡的 user id 去撈他的回覆內容
        const replies = await getUserReplies(savedUserInfoId);
        setReplies(replies.map((reply) => ({ ...reply })));
      } catch (error) {
        console.error(error);
      }
    };
    // 所有自己已喜歡的內容
    const getUserLikesAsync = async () => {
      try {
        const { data } = await getUserLikes(savedUserInfoId)
        setLikes(data.map((like) => ({ ...like })))
      } catch (error) {
        console.error(error);
      }
    }
    if (savedUserInfoId) {
      getTweetsAsync();
      getUserRepliesAsync();
      getUserLikesAsync();
    }
  }, [savedUserInfoId]);

  return (
    <MainContainer >
      <LeftBanner />
      <MiddleColumnContainer>
        <TopUserSection />
        <ChangeUserContent userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'tweets' && <TweetCollection tweets={tweets} />}
        {userContent === 'replies' && <ReplyCollectionUser replies={replies} userDetail={savedUserInfoParsed} />}
        {userContent === 'likes' && <LikeCollection likes={likes} />}
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer >
  )
}