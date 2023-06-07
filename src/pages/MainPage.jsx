import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";

export default function MainPage() {
  return (
    <MainContainer>
      <LeftBanner />
      <RightBanner />
    </MainContainer>
  )
}