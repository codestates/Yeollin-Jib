import { useState } from "react";
import {
  Container,
  SideContainer,
  MyInfoContainer,
  ProfileContainer,
  Profile,
  Adress,
  InfoContainer,
  UserInfo,
  InfoIcon,
  TapContainer,
  Tap,
  BtnContainer,
  SmallBtnContainer,
  BlackBtn,
  BlackSmallBtn,
  WhiteBtn,
  WhiteSmallBtn,
  ContentContainer,
  Title,
  Content,
} from "./MyPage.style";
import { Link } from "react-router-dom";
import MyPost from "../../../components/MyPost/MyPost";
import MyComment from "../../../components/MyComment/MyComment";
import MyFavoritePost from "../../../components/MyFavoritePost/MyFavoritePost";
import MyChattingRoom from "../../../components/MyChattingRoom/MyChattingRoom";

function MyPage() {
  // 선택한 탭의 이름을 저장
  const [tapName, setTapName] = useState<string>("내가 쓴 게시글");

  const handleTapBtn = (tapName: string) => {
    setTapName(tapName);
  };

  return (
    <Container>
      <SideContainer>
        <MyInfoContainer>
          <ProfileContainer>
            <img src="./images/profile.svg" alt="profile" />
            <Profile>
              <div className="Profile_Nickname">까까</div>
              <div className="Profile_Email">kkakka123@gmail.com</div>
              <Adress>
                <img src="./images/mapMark.svg" alt="mapMark" />
                <div>경기도 남양주시 별내동</div>
              </Adress>
            </Profile>
          </ProfileContainer>
          <InfoContainer>
            <UserInfo>
              <InfoIcon>
                <img src="./images/postMark.svg" alt="postMark" />
              </InfoIcon>
              <div className="Info_Text">내가 쓴 게시글</div>
              <div className="Info_Count">0개</div>
            </UserInfo>
            <UserInfo>
              <InfoIcon>
                <img src="./images/commentMark.svg" alt="commentMark" />
              </InfoIcon>
              <div className="Info_Text">내가 쓴 댓글</div>
              <div className="Info_Count">0개</div>
            </UserInfo>
            <UserInfo>
              <InfoIcon>
                <img src="./images/likeMark.svg" alt="likeMark" />
              </InfoIcon>
              <div className="Info_Text">내가 찜한 게시글</div>
              <div className="Info_Count">0개</div>
            </UserInfo>
          </InfoContainer>
        </MyInfoContainer>
        <SmallBtnContainer>
          <Link to={"/editprofile"}>
            <BlackSmallBtn>정보 수정</BlackSmallBtn>
          </Link>
          <WhiteSmallBtn>회원 탈퇴</WhiteSmallBtn>
        </SmallBtnContainer>
        <TapContainer>
          <Tap
            onClick={() => {
              handleTapBtn("내가 쓴 게시글");
            }}
            isClicked={tapName === "내가 쓴 게시글" ? true : false}
          >
            내가 쓴 게시글
          </Tap>
          <Tap
            onClick={() => {
              handleTapBtn("내가 쓴 댓글");
            }}
            isClicked={tapName === "내가 쓴 댓글" ? true : false}
          >
            내가 쓴 댓글
          </Tap>
          <Tap
            onClick={() => {
              handleTapBtn("내가 찜한 게시글");
            }}
            isClicked={tapName === "내가 찜한 게시글" ? true : false}
          >
            내가 찜한 게시글
          </Tap>
          <Tap
            onClick={() => {
              handleTapBtn("채팅방");
            }}
            isClicked={tapName === "채팅방" ? true : false}
          >
            채팅방
          </Tap>
        </TapContainer>
        <BtnContainer>
          <Link to={"/editprofile"}>
            <BlackBtn>정보 수정</BlackBtn>
          </Link>
          <WhiteBtn>회원 탈퇴</WhiteBtn>
        </BtnContainer>
      </SideContainer>
      <ContentContainer>
        <Title>{tapName}</Title>
        <Content
          isColumn={
            tapName === "채팅방" || tapName === "내가 쓴 댓글" ? true : false
          }
        >
          {tapName === "내가 쓴 게시글" ? <MyPost /> : null}
          {tapName === "내가 쓴 댓글" ? <MyComment /> : null}
          {tapName === "내가 찜한 게시글" ? <MyFavoritePost /> : null}
          {tapName === "채팅방" ? <MyChattingRoom /> : null}
        </Content>
      </ContentContainer>
    </Container>
  );
}

export default MyPage;
