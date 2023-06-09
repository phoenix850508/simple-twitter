import { useState } from 'react'
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopUserSection from "components/TopUserSection/TopUserSection.jsx";
import ChangeUserContent from "components/ChangeUserContent/ChangeUserContent.jsx";
import TweetCollection from "components/TweetCollection/TweetCollection.jsx";
import ReplyCollection from 'components/ReplyCollection/ReplyCollection';
import LikeCollection from 'components/LikeCollection/LikeCollection';


export default function UserSelfPage() {
  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState('tweets')

  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopUserSection />
        <ChangeUserContent userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'tweets' && <TweetCollection />}
        {userContent === 'replies' && <ReplyCollection />}
        {userContent === 'likes' && <LikeCollection />}
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}