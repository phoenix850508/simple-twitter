import { useState } from 'react'
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopUserSection from "components/TopUserSection/TopUserSection.jsx";
import ChangeUserContent from "components/ChangeUserContent/ChangeUserContent.jsx";
// import TweetCollection from "components/TweetCollection/TweetCollection.jsx";

export default function UserSelfPage() {
  // 購物籃商品清單最新狀態
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
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}