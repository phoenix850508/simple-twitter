// React Hook
import { useState, useEffect, useContext } from 'react'
// 元件類
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopTweetSection from "components/TopTweetSection/TopTweetSection.jsx";
import TweetCollection from "components/TweetCollection/TweetCollection.jsx";
// API
import { getAllTweets } from '../api/tweets';
// 引用封裝好的 Context 資訊
import { AuthContext } from 'context/AuthContext.jsx';


export default function MainPage() {
  // tweets 存在這
  const [tweets, setTweets] = useState([]);
  const { isTweetUpdated, isAuthenticated, setIsTweetUpdated } = useContext(AuthContext);

  // 為了顯示左側按鈕顏色需做判斷，共有 1、2、3
  const currentPage = 1

  // 透過 API 撈初始資料
  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getAllTweets();
        setTweets(tweets.map((tweet) => ({ ...tweet })));
      } catch (error) {
        console.error(error);
      }
    };
    if(isAuthenticated) {
      getTweetsAsync();
      setIsTweetUpdated(false)
    }
  }, [isTweetUpdated, isAuthenticated, setIsTweetUpdated]);

  return (
    <MainContainer>
      <LeftBanner currentPage={currentPage} />
      <MiddleColumnContainer>
        <TopTweetSection />
        <TweetCollection tweets={tweets} fromPage='/main' />
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}