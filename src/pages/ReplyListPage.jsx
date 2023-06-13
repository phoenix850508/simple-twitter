// React Hook
import { useState, useEffect, useContext } from 'react'
// 元件類
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopReplyListSection from "components/TopReplyListSection/TopReplyListSection";
import ReplyCollection from "components/ReplyCollection/ReplyCollection";
// API
import { getTweetReplyList, getSingleTweet } from '../api/tweets';
// 引用封裝好的 Context 資訊
import { AuthContext } from 'context/AuthContext.jsx';

export default function ReplyListPage() {
  // 儲存使用者點擊想看的 tweetId 的底下回覆
  const [tweetReplyList, setTweetReplyList] = useState([]);
  // 儲存該推文發文者資訊
  const [singleTweetUserAccount, setSingleTweetUserAccount] = useState([]);
  // 使用蟲洞從 authContext.js 拿資料：tweetId 與底下回覆
  // const { tweetId } = useContext(AuthContext); 這個寫法 useEffect 裡 id 是 null==
  // tweetId 資料從 localStorage 拿
  const savedTweetId = localStorage.getItem("tweetId");

  // 透過 API 撈資料
  useEffect(() => {
    // 該推文底下的回覆資料
    const getTweetReplyListAsync = async () => {
      try {
        // 用 Context 裡的 tweetId 去撈
        const tweetReplyList = await getTweetReplyList(savedTweetId);
        setTweetReplyList(tweetReplyList.map((reply) => ({ ...reply })));
      } catch (error) {
        console.error(error);
      }
    };
    // 該推文發文者資訊
    const getSingleTweetAsync = async () => {
      try {
        // 用 localStorage 裡的 tweetId 去撈
        const singleTweet = await getSingleTweet(savedTweetId);
        console.log('ReplyListPage 裡的 singleTweet: ', singleTweet)
        setSingleTweetUserAccount(singleTweet.User.account);
      } catch (error) {
        console.error(error);
      }
    };
    getTweetReplyListAsync();
    getSingleTweetAsync();
  }, [savedTweetId]);

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopReplyListSection />
        <ReplyCollection tweetReplyList={tweetReplyList} replyTo={singleTweetUserAccount} />
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}