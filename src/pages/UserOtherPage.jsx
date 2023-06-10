import { useState } from 'react'
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopUserSectionOther from 'components/TopUserSectionOther/TopUserSectionOther';
import ChangeUserContent from "components/ChangeUserContent/ChangeUserContent.jsx";
import TweetCollection from "components/TweetCollection/TweetCollection.jsx";
import ReplyCollection from 'components/ReplyCollection/ReplyCollection';
import LikeCollection from 'components/LikeCollection/LikeCollection';


export default function UserOtherPage() {
  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState('tweets')
  // 是否已訂閱該使用者
  const [notification, setNotification] = useState(false)

  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  function handleNotiClick() {
    setNotification(!notification)
  }

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopUserSectionOther notification={notification} handleNotiClick={handleNotiClick} />
        <ChangeUserContent userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'tweets' && <TweetCollection />}
        {userContent === 'replies' && <ReplyCollection />}
        {userContent === 'likes' && <LikeCollection />}
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}