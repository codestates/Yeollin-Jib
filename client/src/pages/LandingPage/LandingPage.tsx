import { Link } from "react-router-dom";
import {
  AllLandingContainer,
  FirstLandingContainer,
  FirstText,
  GotoMainButton,
  FirstSecondText,
  FirstTextContainer,
  FirstImageContainer,
  BigCircle,
  SmallCircle,
  VerySmallCircle,
  SecLandingContainer,
  SecBodyContainer,
  SecBoxContainer,
  SecImgContainer,
  SecBigTxtContainer,
  SecDescrContainer,
  SecAllBoxContainer,
  ThirLandingContainer,
  ThirBodyContainer,
  ThirTextContainer,
  SevLandingContainer,
  ThirImageContainer,
  TitleContainer,
  DescrContainer,
  AllContainer,
  Circle,
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

  const LandingPageTxt = [
    {
      title: ["01.", "우리 지역을 검색해", "어떤 열린집들이 있는지 살펴보세요"],
      img: "./images/landing2.svg",
      descr: ["지역별, 물품별로 보다 쉽게 검색이 가능합니다."],
    },
    {
      title: [
        "02.",
        "게시글 내 위치를 확인하고 채팅을 보내",
        "열린집 방문 약속을 잡으세요",
      ],
      img: "./images/landing3.svg",
      descr: [
        "만남 위치가 지도로 삽입되어 있어 확인이",
        "편리하고, 글 작성자와 1:1 채팅을 할 수 있습니다.",
      ],
    },
    {
      title: ["03.", "열린집에 방문해서", "즐거운 나눔을 진행하세요"],
      img: "./images/landing4.svg",
      descr: ["열린집에서 마음에 드는 물품을 나눔받으세요."],
    },
    {
      title: ["04.", "마감시간이 지난 게시글은", "두고 떠나세요"],
      img: "./images/landing5.svg",
      descr: [
        "지정한 나눔시간이 지나면",
        "열린집에서 자동으로 나눔완료 처리됩니다.",
      ],
    },
  ];

  // 마지막 버튼 밑으로 스크롤이 내려간 상태로 메인으로 연결되는 것을 방지해 주는 핸들러
  const scrollHandler = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <AllLandingContainer>
      <SmallCircle></SmallCircle>
      <VerySmallCircle></VerySmallCircle>
      <BigCircle></BigCircle>
      <FirstLandingContainer>
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
      </FirstLandingContainer>
      <SecLandingContainer>
        <SecBodyContainer>
          <SecAllBoxContainer>
            {SecondLandingPageTxt.map((el) => {
              return (
                <SecBoxContainer key={el.title}>
                  <SecImgContainer>
                    <img src={el.img} alt={el.title}></img>
                  </SecImgContainer>
                  <SecBigTxtContainer>{el.title}</SecBigTxtContainer>
                  <SecDescrContainer>
                    {el.descr.map((el) => {
                      return <div key={el[0]}>{el}</div>;
                    })}
                  </SecDescrContainer>
                </SecBoxContainer>
              );
            })}
          </SecAllBoxContainer>
        </SecBodyContainer>
      </SecLandingContainer>
      {LandingPageTxt.map((el, idx) => {
        return (
          <ThirLandingContainer key={el.title[0]}>
            <ThirBodyContainer>
              <AllContainer idx={idx}>
                <ThirTextContainer>
                  <Circle></Circle>
                  <TitleContainer>
                    {el.title.map((el) => {
                      return <div key={el[0]}>{el}</div>;
                    })}
                  </TitleContainer>
                  <DescrContainer>
                    {el.descr.map((el) => {
                      return <div key={el[0]}>{el}</div>;
                    })}
                  </DescrContainer>
                </ThirTextContainer>
                <ThirImageContainer idx={idx}>
                  {" "}
                  <img src={el.img} alt={el.title[0]}></img>
                </ThirImageContainer>
              </AllContainer>
            </ThirBodyContainer>
          </ThirLandingContainer>
        );
      })}
      <SevLandingContainer>
        {" "}
        <Link to="/main">
          <GotoMainButton onClick={() => scrollHandler()}>
            열린집 보러가기
          </GotoMainButton>
        </Link>
      </SevLandingContainer>
    </AllLandingContainer>
  );
}

export default LandingPage;
