import styles from './UserSelfFollowPage.module.scss'
import { useState } from 'react'
import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import PrePageBtn from 'components/PrevPageBtn/PrevPageBtn';
import ChangeUserContentForFollow from 'components/ChangeUserContentForFollow/ChangeUserContentForFollow.jsx';
import FollowerCollection from 'components/Follow/FollowerCollection/FollowerCollection';
import FollowingCollection from 'components/Follow/FollowingCollection/FollowingCollection';


export default function UserSelfFollowPage() {
  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState('followers')

  function handleChangeUserContentClick(targetValue) {
    setUserContent(targetValue)
  }

  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <div className={styles.prePageBtnForFollow}>
          <PrePageBtn />
        </div>
        <ChangeUserContentForFollow userContent={userContent} handleChangeUserContentClick={handleChangeUserContentClick} />
        {userContent === 'followers' && <FollowerCollection />}
        {userContent === 'followings' && <FollowingCollection />}
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}