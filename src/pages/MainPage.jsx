import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopTweetSection from "components/TopTweetSection/TopTweetSection.jsx";
import TweetCollection from "components/TweetCollection/TweetCollection.jsx";

export default function MainPage() {
  return (
    <MainContainer>
      <LeftBanner />
      <MiddleColumnContainer>
        <TopTweetSection />
        <TweetCollection />
      </MiddleColumnContainer>
      <RightBanner />
    </MainContainer>
  )
}