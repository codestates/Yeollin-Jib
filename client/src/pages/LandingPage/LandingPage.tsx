import { Link } from "react-router-dom";
import {
  AllLandingContainer,
  FirstLandingContainer,
  FirstText,
  GotoMainButton,
  FirstSecondText,
  FirstTextContainer,
  FirstImageContainer,
  FirstBodyContainer,
  BigCircle,
  SmallCircle,
  SecLandingContainer,
  SecBodyContainer,
  SecBoxContainer,
  SecImgContainer,
  SecBigTxtContainer,
  SecDescrContainer,
  SecAllBoxContainer,
} from "./LandingPage.style";

function LandingPage() {
  const SecondLandingPageTxt = [
    {
      title: "물품 나눔",
      img: "./images/landingimg1.svg",
      descr: [
        "열린집은 이사를 앞두고 처분하기",
        "어려운 짐을 나눔하는 플랫폼입니다",
      ],
    },
    {
      title: "열린집 위치 확인",
      img: "./images/landingimg2.svg",
      descr: ["열린집은 만남 위치를", "지도로 확인할 수 있습니다."],
    },
    {
      title: "1:1 채팅",
      img: "./images/landingimg3.svg",
      descr: ["열린집은 글 작성자와", "1:1 채팅을 진행할 수 있습니다."],
    },
  ];

  return (
    <AllLandingContainer>
      <SmallCircle></SmallCircle>
      <FirstLandingContainer>
        <BigCircle></BigCircle>
        <FirstBodyContainer>
          <FirstImageContainer>
            <img src="./images/landing1.svg" alt="landingpage_img1"></img>
          </FirstImageContainer>
          <FirstTextContainer>
            <FirstText>
              <div>이사를 앞두고</div>
              <div>처분하기 어려운 짐들이 있으신가요?</div>
              <div>버리기에는 아까운 누군가에게 주고싶은</div>
              <div>매력적인 물건들이 있으신가요?</div>
            </FirstText>
            <FirstSecondText>
              열린집에서 물건을 손쉽게 나눔해보세요 !
            </FirstSecondText>
            <Link to="/main">
              <GotoMainButton>열린집 보러가기</GotoMainButton>
            </Link>
          </FirstTextContainer>
        </FirstBodyContainer>
      </FirstLandingContainer>
      <SecLandingContainer>
        <SecBodyContainer>
          <SecAllBoxContainer>
            {SecondLandingPageTxt.map((el) => {
              return (
                <SecBoxContainer>
                  <SecImgContainer>
                    <img src={el.img} alt={el.title}></img>
                  </SecImgContainer>
                  <SecBigTxtContainer>{el.title}</SecBigTxtContainer>
                  <SecDescrContainer>
                    {el.descr.map((el) => {
                      return <div>{el}</div>;
                    })}
                  </SecDescrContainer>
                </SecBoxContainer>
              );
            })}
          </SecAllBoxContainer>
        </SecBodyContainer>
      </SecLandingContainer>
    </AllLandingContainer>
  );
}

export default LandingPage;
