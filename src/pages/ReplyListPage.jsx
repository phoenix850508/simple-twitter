// React Hook
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// 元件類
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopReplyListSection from "components/TopReplyListSection/TopReplyListSection";
import ReplyCollection from "components/ReplyCollection/ReplyCollection";
// API
import { getTweetReplyList, getSingleTweet } from '../api/tweets';
import { AuthContext } from 'context/AuthContext'

export default function ReplyListPage() {
  const navigate = useNavigate()
  // 儲存使用者點擊想看的 tweetId 的底下回覆
  const [tweetReplyList, setTweetReplyList] = useState([]);
  // 儲存該推文發文者資訊
  const [singleTweetInfo, setSingleTweetInfo] = useState(null);
  // const { tweetId } = useContext(AuthContext); 這個寫法 useEffect 裡 id 是 null==
  const { isUpdatedReplies } = useContext(AuthContext)
  // tweetId 資料從 localStorage 拿
  const savedTweetId = localStorage.getItem("tweetId");
  // userTweetAccount 資料從 localStorage 拿
  const savedUserTweetAccount = localStorage.getItem("userTweetAccount")

  // 撈取 localStorage 中的 userInfo 協助跳轉頁面
  let savedUserInfo = {}
  let savedUserInfoId = 0
  let role = ''
  if (localStorage.getItem("userInfo")) {
    savedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    role = savedUserInfo.role
    savedUserInfoId = savedUserInfo.id
  }


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
        // 只在渲染時 set 一次似乎不用拷貝？
        // setSingleTweetInfo({ ...singleTweet, User: { ...singleTweet.User } });
        setSingleTweetInfo(singleTweet);
      } catch (error) {
        console.error(error);
      }
    };
    // 驗證角色，如果是管理者那就導回管理者自己的頁面，若為登入的使用者則維持在原頁面並撈資料
    if (savedUserInfoId && savedTweetId && role === 'user') {
      getSingleTweetAsync();
      getTweetReplyListAsync();
      // 還沒點推文就直接到這頁就要請使用者回到首頁
    } else if (savedUserInfoId && role === 'user') {
      navigate('/main');
    } else if (savedUserInfoId && role === 'admin') {
      navigate('/admin_users');
      // 剩下的請先登入
    } else {
      navigate('/login');
    }
  }, [savedTweetId, isUpdatedReplies, savedUserInfoId, navigate, role]);

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopReplyListSection singleTweetInfo={singleTweetInfo} tweetId={savedTweetId} />
        <ReplyCollection tweetReplyList={tweetReplyList} replyTo={savedUserTweetAccount} />
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}