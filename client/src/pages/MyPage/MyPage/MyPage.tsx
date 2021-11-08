import { useEffect, useState } from "react";
import {
  Body,
  MainArea,
  Container,
  SideContainer,
  MyInfoContainer,
  ProfileContainer,
  ProfileImg,
  Profile,
  Address,
  InfoContainer,
  UserInfo,
  InfoIcon,
  TapContainer,
  Tap,
  ChatrommTap,
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
import { Link, Redirect } from "react-router-dom";
import { RootState } from "../../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import MyPost from "../../../components/MyPost/MyPost";
import MyComment from "../../../components/MyComment/MyComment";
import MyFavoritePost from "../../../components/MyFavoritePost/MyFavoritePost";
import DeleteAccount from "../../../components/Modals/DeleteAccount/DeleteAccount";
import { setTapName } from "../../../reducers/myPageReducer";

function MyPage() {
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state: RootState) => state.authReducer);

  // 회원 탈퇴 상태
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // 유저 정보를 스토어에서 가져옴
  const {
    email,
    nickname,
    userArea,
    imagePath,
    myComment,
    myPost,
    myStorage,
    loginType,
  } = useSelector((state: RootState) => state.userReducer);

  // 주소 데이터의 상태 : 유저가 주소를 등록하지 않았다면 초기 메시지를, 등록했다면 등록한 지역을 보여줌
  const [userAreaData, setUserAreaData] =
    useState<string>("주소를 등록해 주세요.");

  useEffect(() => {
    if (userArea) {
      // 구 레벨의 주소까지만 나오도록 처리
      const areaArr = userArea.split(" ");
      setUserAreaData(`${areaArr[0]} ${areaArr[1]} ${areaArr[2]}`);
    }
  }, [userArea]);

  // 스토어에 저장한 탭의 이름을 불러옴
  const { tapName } = useSelector((state: RootState) => state.myPageReducer);

  // 선택한 탭의 이름을 스토어에 저장
  const handleTapBtn = (tapName: string) => {
    dispatch(setTapName(tapName));
  };

  const scrollHandler = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <Body>
      <MainArea>
        {!isLogin ? (
          <Redirect to="/main"></Redirect>
        ) : (
          <Container>
            <SideContainer>
              <MyInfoContainer>
                {/*프로필 사진---------------------------------------------------------------*/}
                <ProfileContainer>
                  {imagePath ? (
                    !loginType || !imagePath.includes(":") ? (
                      // 프로필 사진 이미지 데이터의 상태 : 유저가 프로필 사진을 등록하지 않았다면 기본 프로필 이미지를, 등록했다면 등록한 이미지를 보여줌
                      // 컴퓨터에서 파일 이름에 특수문자 ":"를 넣을 수 없다는 점을 이용하여 소셜로그인시 저장된 프로필 사진인지, 열린집을 통해 업데이트한 사진인지 판별
                      <ProfileImg
                        src={`${process.env.REACT_APP_API_URL}/uploads/${imagePath}`}
                        alt="Profile"
                      />
                    ) : (
                      // 소셜로그인 상태일 경우, 이미지 url을 그대로 src로 사용
                      <ProfileImg src={`${imagePath}`} alt="Profile" />
                    )
                  ) : (
                    <ProfileImg src={`./images/profile.svg`} alt="Profile" />
                  )}
                  {/*닉네임, 이메일, 주소------------------------------------------------------*/}
                  <Profile>
                    <div className="Profile_Nickname">{nickname}</div>
                    <div className="Profile_Email">{email}</div>
                    <Address>
                      <img src="./images/mapMark.svg" alt="mapMark" />
                      <div>{userAreaData}</div>
                    </Address>
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
                <Link to={"/editprofile"} onClick={() => scrollHandler()}>
                  <BlackSmallBtn>정보 수정</BlackSmallBtn>
                </Link>
                <WhiteSmallBtn onClick={() => setIsOpened(true)}>
                  회원 탈퇴
                </WhiteSmallBtn>
              </SmallBtnContainer>
              {/*마이페이지의 4가지 탭---------------------------------------------------------*/}
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
                <Link to="/chatroom" style={{ textDecoration: "none" }}>
                  <ChatrommTap>채팅방</ChatrommTap>
                </Link>
              </TapContainer>
              {/*웹 환경에서의 정보 수정 탈퇴 버튼----------------------------------------------*/}
              <BtnContainer
                isColumn={tapName === "내가 쓴 댓글" ? true : false}
              >
                <Link to={"/editprofile"} onClick={() => scrollHandler()}>
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
              <Content isColumn={tapName === "내가 쓴 댓글" ? true : false}>
                {tapName === "내가 쓴 게시글" ? <MyPost /> : null}
                {tapName === "내가 쓴 댓글" ? <MyComment /> : null}
                {tapName === "내가 찜한 게시글" ? <MyFavoritePost /> : null}
              </Content>
            </ContentContainer>
          </Container>
        )}
      </MainArea>
    </Body>
  );
}

export default MyPage;
