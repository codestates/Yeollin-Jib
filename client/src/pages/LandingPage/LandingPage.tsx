import {
  AllLandingContainer,
  FirstLandingContainer,
  FirstText,
  GotoMainButton,
  FirstSecondText,
  FirstTextContainer,
  FirstImageContainer,
  FirstBodyContainer,
} from "./LandingPage.style";

function LandingPage() {
  return (
    <AllLandingContainer>
      <FirstLandingContainer>
        <FirstBodyContainer>
          <FirstTextContainer>
            <FirstText>
              이사를 앞두고<br></br>처분하기 어려운 짐들이 있으신가요?<br></br>{" "}
              버리기에는 아까운 누군가에게 주고싶은<br></br>매력적인 물건들이
              있으신가요?
            </FirstText>
            <FirstSecondText>
              열린집에서 물건을 손쉽게 나눔해보세요 !
            </FirstSecondText>
            <GotoMainButton>열린집 보러가기</GotoMainButton>
          </FirstTextContainer>
          <FirstImageContainer>
            <img src="./images/landing1.svg" alt="landingpage_img1"></img>
          </FirstImageContainer>
        </FirstBodyContainer>
      </FirstLandingContainer>
    </AllLandingContainer>
  );
}

export default LandingPage;
