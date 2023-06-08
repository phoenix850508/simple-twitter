import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import TopTweetSection from 'components/topTweetSection/TopTweetSection.jsx'

export default function MainPage() {
  return (
    <MainContainer>
      <LeftBanner />
      <TopTweetSection />
    </MainContainer>
  )
}