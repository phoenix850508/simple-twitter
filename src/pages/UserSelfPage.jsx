import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopUserSection from "components/TopUserSection/TopUserSection.jsx";
// import TweetCollection from "components/TweetCollection/TweetCollection.jsx";

export default function UserSelfPage() {
  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopUserSection />
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}