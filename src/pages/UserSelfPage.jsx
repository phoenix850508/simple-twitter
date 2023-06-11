// React Hook
import { useState, useEffect } from 'react'
// 元件類
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopUserSection from "components/TopUserSection/TopUserSection.jsx";
import ChangeUserContent from "components/ChangeUserContent/ChangeUserContent.jsx";
import TweetCollection from "components/TweetCollection/TweetCollection.jsx";
import ReplyCollection from 'components/ReplyCollection/ReplyCollection';
import LikeCollection from 'components/LikeCollection/LikeCollection';
// API
import { getTweets } from '../api/tweets';



export default function UserSelfPage() {
  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState('tweets')
  // tweets 存在這
  const [tweets, setTweets] = useState([]);

  // 變更瀏覽區塊
  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  // 透過 API 撈初始資料
  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopUserSection />
        <ChangeUserContent userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'tweets' && <TweetCollection tweets={tweets} />}
        {userContent === 'replies' && <ReplyCollection />}
        {userContent === 'likes' && <LikeCollection />}
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}