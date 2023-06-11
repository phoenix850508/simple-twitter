// React Hook
import { useState, useEffect } from 'react'
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
import { useAuth } from 'context/AuthContext.jsx';

export default function ReplyListPage() {
  // 使用蟲洞從 authContext.js 拿資料：tweetId 與底下回覆
  const { tweetId, tweetReplyList, setTweetReplyList } = useAuth();

  console.log('ReplyListPage 裡從 Context 抓到的推文 id: ', tweetId)

  // 透過 API 撈該推文底下的回覆資料
  useEffect(() => {
    const getTweetReplyListAsync = async () => {
      try {
        // 用 Context 裡的 tweetId 去撈
        const tweetReplyList = await getTweetReplyList(tweetId);
        console.log('ReplyListPage 裡的 tweetReplyList: ', tweetReplyList)
        setTweetReplyList(tweetReplyList.map((reply) => ({ ...reply })));
      } catch (error) {
        console.error(error);
      }
    };
    getTweetReplyListAsync();
    console.log('ReplyListPage 裡的 tweetReplyList222: ', tweetReplyList)
  }, [tweetId, setTweetReplyList]);

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopReplyListSection />
        <ReplyCollection />
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}