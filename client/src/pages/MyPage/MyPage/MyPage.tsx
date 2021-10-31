import { useState } from "react";
import {
  Container,
  SideContainer,
  MyInfoContainer,
  ProfileContainer,
  ProfileImg,
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
import { RootState } from "../../../reducers/rootReducer";
import { useSelector } from "react-redux";
import MyPost from "../../../components/MyPost/MyPost";
import MyComment from "../../../components/MyComment/MyComment";
import MyFavoritePost from "../../../components/MyFavoritePost/MyFavoritePost";
import MyChattingRoom from "../../../components/MyChattingRoom/MyChattingRoom";
import DeleteAccount from "../../../components/Modals/DeleteAccount/DeleteAccount";

function MyPage() {
  // 유저 정보를 스토어에서 가져옴
  const { email, nickname, userArea, imagePath, myComment, myPost, myStorage } =
    useSelector((state: RootState) => state.userReducer);

  // 주소 데이터의 상태 : 유저가 주소를 등록하지 않았다면 초기 메시지를, 등록했다면 등록한 지역을 보여줌
  const [userAreaData, setUserAreaData] =
    useState<string>("주소를 등록해 주세요.");

  if (userArea) {
    setUserAreaData(userAreaData);
  }

  // 선택한 탭의 이름을 저장
  const [tapName, setTapName] = useState<string>("내가 쓴 게시글");

  const handleTapBtn = (tapName: string) => {
    setTapName(tapName);
  };
  // 회원 탈퇴 상태
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Container>
      <SideContainer>
        <MyInfoContainer>
          {/*프로필 사진---------------------------------------------------------------*/}
          <ProfileContainer>
            {!imagePath ? (
              // <ProfileImg src="imagePath" alt="Profile" />
              <img src="./images/profile.svg" alt="profile" />
            ) : (
              // 프로필 사진을 등록하지 않아 imagePath가 null일 경우, 기본 프로필 이미지 노출
              <img src="./images/profile.svg" alt="profile" />
            )}
            {/*닉네임, 이메일, 주소------------------------------------------------------*/}
            <Profile>
              <div className="Profile_Nickname">{nickname}</div>
              <div className="Profile_Email">{email}</div>
              <Adress>
                <img src="./images/mapMark.svg" alt="mapMark" />
                <div>{userAreaData}</div>
              </Adress>
            </Profile>
          </ProfileContainer>
          <InfoContainer>
            {/*유저가 가진 데이터--------------------------------------------------------*/}
            <UserInfo>
              {/*유저가 작성한 게시글-----------------------------------------------------*/}
              <InfoIcon>
                <img src="./images/postMark.svg" alt="postMark" />
              </InfoIcon>
              <div className="Info_Text">내가 쓴 게시글</div>
              <div className="Info_Count">{myPost}개</div>
            </UserInfo>
            <UserInfo>
              {/*유저가 쓴 댓글---------------------------------------------------------*/}
              <InfoIcon>
                <img src="./images/commentMark.svg" alt="commentMark" />
              </InfoIcon>
              <div className="Info_Text">내가 쓴 댓글</div>
              <div className="Info_Count">{myComment}개</div>
            </UserInfo>
            <UserInfo>
              {/*유저가 찜한 게시글-----------------------------------------------------*/}
              <InfoIcon>
                <img src="./images/likeMark.svg" alt="likeMark" />
              </InfoIcon>
              <div className="Info_Text">내가 찜한 게시글</div>
              <div className="Info_Count">{myStorage}개</div>
            </UserInfo>
          </InfoContainer>
        </MyInfoContainer>
        {/*모바일 환경에서의 정보 수정 탈퇴 버튼---------------------------------------------*/}
        <SmallBtnContainer>
          <Link to={"/editprofile"}>
            <BlackSmallBtn>정보 수정</BlackSmallBtn>
          </Link>
          <WhiteSmallBtn onClick={() => setIsOpened(true)}>
            회원 탈퇴
          </WhiteSmallBtn>
        </SmallBtnContainer>
        {/*마이페이지의 4가지 탭--------------------------------------------------------*/}
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
        {/*웹 환경에서의 정보 수정 탈퇴 버튼----------------------------------------------*/}
        <BtnContainer>
          <Link to={"/editprofile"}>
            <BlackBtn>정보 수정</BlackBtn>
          </Link>
          {isOpened ? (
            <DeleteAccount
              setIsOpened={(bool: boolean) => setIsOpened(bool)}
            ></DeleteAccount>
          ) : null}
          <WhiteBtn onClick={() => setIsOpened(true)}>회원 탈퇴</WhiteBtn>
        </BtnContainer>
      </SideContainer>
      {/*각 탭에 대한 컨텐츠---------------------------------------------------------*/}
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
