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
import { getTweetReplyList } from '../api/tweets';
// 引用封裝好的 Context 資訊
import { AuthContext } from 'context/AuthContext.jsx';

export default function ReplyListPage() {
  // 儲存使用者點擊想看的 tweetId 的底下回覆
  const [tweetReplyList, setTweetReplyList] = useState([]);
  // 使用蟲洞從 authContext.js 拿資料：tweetId 與底下回覆
  // const { tweetId } = useContext(AuthContext); 這個寫法 useEffect 裡 id 是 null==
  // tweetId 資料從 localStorage 拿
  const savedTweetId = localStorage.getItem("tweetId");

  // 透過 API 撈該推文底下的回覆資料
  useEffect(() => {
    const getTweetReplyListAsync = async () => {
      try {
        // 用 Context 裡的 tweetId 去撈
        const tweetReplyList = await getTweetReplyList(savedTweetId);
        setTweetReplyList(tweetReplyList.map((reply) => ({ ...reply })));
      } catch (error) {
        console.error(error);
      }
    };
    getTweetReplyListAsync();
  }, [savedTweetId]);

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopReplyListSection />
        <ReplyCollection tweetReplyList={tweetReplyList} />
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}