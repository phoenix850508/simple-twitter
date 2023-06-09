import MainContainer from "components/MainContainer/MainContainer.jsx";
import LeftBanner from "components/LeftBanner/LeftBanner.jsx";
import RightBanner from "components/RightBanner/RightBanner.jsx";
import MiddleColumnContainer from "components/MiddleColumnContainer/MiddleColumnContainer.jsx";
import TopReplyListSection from "components/TopReplyListSection/TopReplyListSection";
import ReplyCollection from "components/ReplyCollection/ReplyCollection";


export default function ReplyListPage() {
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