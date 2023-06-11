// React Hook
import { useState, useEffect } from 'react'
// 元件類
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopTweetSection from "components/TopTweetSection/TopTweetSection.jsx";
import TweetCollection from "components/TweetCollection/TweetCollection.jsx";
// API
import { getTweets } from '../api/tweets';


export default function MainPage() {
  // tweets 存在這
  const [tweets, setTweets] = useState([]);

  // 透過 API 撈初始資料
  // useEffect(() => {
  //   const getTweetsAsync = async () => {
  //     try {
  //       const tweets = await getTweets();
  //       setTweets(tweets.map((tweet) => ({ ...tweet })));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getTweetsAsync();
  // }, []);

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopTweetSection />
        {/* <TweetCollection tweets={tweets} /> */}
        <TweetCollection />
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}