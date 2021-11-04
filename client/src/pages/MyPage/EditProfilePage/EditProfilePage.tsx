import React, { useState, useEffect } from "react";
import {
  Body,
  MainArea,
  Container,
  TopContainer,
  Title,
  EditPasswordContainer,
  MiddleContainer,
  LeftContainer,
  RightContainer,
  ImgTitleContainer,
  DeleteProfileImg,
  UploadPhotoArea,
  InputTitle,
  InputContainer,
  InputField,
  ValidationBtn,
  MsgContainer,
  BtnContainer,
  BlackBtn,
  WhiteBtn,
} from "./EditProfilePage.style";
import ProfileImgUpload from "../ProfileImgUpload/ProfileImgUpload";
import { Link } from "react-router-dom";
import { RootState } from "../../../reducers/rootReducer";
import { setUser } from "../../../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { PencilIcon, CameraIcon, MapMarkIcon } from "../../../icons/Icons";
import EditPassword from "../../../components/Modals/EditPassword/EditPassword";
import WarningIcon from "../../../icons/Icons";
import Inspect from "../../SignUpPage/Inspect";
import axios from "axios";
import KakaoMap from "../../../components/KakaoMap/KakaoMap";
import SearchAddress from "../../../components/SearchAddress/SearchAddress";

function EditProfilePage() {
  const dispatch = useDispatch();

  // 비밀번호 변경 모달의 상태
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // 저장된 토큰값을 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  // 유저 정보를 스토어에서 가져옴
  const { nickname, imagePath, userArea, loginType } = useSelector(
    (state: RootState) => state.userReducer
  );

  // 새롭게 입력받을 데이터(인풋값)
  const [newNickname, setNewNickname] = useState<string>(nickname);

  // 닉네임 인풋값에 대한 상태 메시지
  const [nicknameAlert, setNicknameAlert] = useState<string>("");

  // 닉네임이 바르게 작성되었는지 확인
  const [isRightNickname, setIsRightNickname] = useState<boolean>(false);

  // 각 인풋값을 받아 상태로 저장
  const setNicknameData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewNickname(e.target.value);
  };

  // 닉네임 상태값이 바뀜에 따라 alert 메시지 변경
  useEffect(() => {
    if (Inspect(newNickname, "nickname")) {
      // 유효 조건을 통과했을 경우 중복 확인 필요
      setNicknameAlert("중복 확인이 필요합니다.");
    } else {
      // 유효 조건을 통과하지 못했을 경우, 유효 조건을 알려줌
      setNicknameAlert("2~10글자, 한글, 영어, 숫자만 가능합니다.");
    }
    // 위의 두 경우 모두 올바른 값이 아니지만, 값이 입력됨
    setIsRightNickname(false);
  }, [newNickname]);

  // 닉네임 중복 확인
  interface Iresponse {
    data: {
      message: string;
    };
  }

  const handleNicknameBtn = async () => {
    if (newNickname === "") {
      // 아무 값도 입력하지 않은 상태에서 중복 버튼을 눌렀을 경우 유효 조건이 나오도록 "0"으로 설정
      setNewNickname("0");
    } else if (Inspect(newNickname, "nickname")) {
      // 유효 조건을 통과한 닉네임일 경우 서버에 중복 검사 요청을 보님
      const result: Iresponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/nickname?nickname=${newNickname}`,
        {
          withCredentials: true,
        }
      );

      const message: string = result.data.message;
      if (message === "사용할 수 있는 닉네임입니다.") {
        setNicknameAlert("사용 가능한 닉네임입니다.");
        setIsRightNickname(true);
      } else if (message === "닉네임이 중복됩니다.") {
        setNicknameAlert("이미 가입된 닉네임입니다.");
        setIsRightNickname(false);
      }
    }
  };

  // 업로드 할 프로필 사진의 상태
  // 파일의 경로(string 또는 null)
  const [userImagePath, setUserImagePath] = useState<string | null>(imagePath);

  // 프로필 파일(배열)
  const [profileImg, setProfileImg] = useState<any[] | undefined[]>([]);

  const setProfileImgData = (file: any) => {
    setUserImagePath(null);
    let newFile = [];
    file[0].preview = URL.createObjectURL(file[0]);
    newFile.push(file[0]);
    setProfileImg(newFile);
  };

  const deleteProfileImgHandle = () => {
    setUserImagePath(null);
    setProfileImg([]);
  };

  // 주소 입력 상태
  const [addressInput, setAddressInput] = useState("");

  const searchAddressHandle = (address: string) => {
    setAddressInput(address);
  };

  // 확인 버튼을 눌렀을 때
  const handleSubmitBtn = async () => {
    if (!profileImg[0] && !userImagePath) {
      // 프로필 사진을 삭제하고 싶을 때 : 업로드한 profileImg가 없고, userImagePath도 null로 변경한 상태
      const result = await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/photo`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          data: {
            imagePath,
          },
        }
      );

      if (result.status === 200) {
        dispatch(setUser(accessToken));
      }
    }

    const formData = new FormData();

    if (nickname !== newNickname) {
      formData.append("nickname", newNickname);
    }

    if (userArea !== addressInput) {
      formData.append("userArea", addressInput);
    }

    if (profileImg[0] || userImagePath !== null) {
      // 새로 업로드할 프로필 파일이 있거나, 기존 프로필 사진을 유지할 때
      formData.append("imagePath", profileImg[0]);
    }

    const result = await axios.patch(
      `${process.env.REACT_APP_API_URL}/user`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (result.status === 200) {
      dispatch(setUser(accessToken));
    }
  };

  // 인풋 입력 후 엔터를 치면 닉네임 중복확인 요청을 보냄
  const handleNicknameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (Inspect(nickname, "nickname")) {
        handleNicknameBtn();
      }
    }
  };

  return (
    <Body>
      <MainArea>
        <Container>
          {/*상단 타이틀---------------------------------------------------------*/}
          <TopContainer>
            <Title>정보 수정</Title>
            <EditPasswordContainer onClick={() => setIsOpened(true)}>
              <img src="./images/editPassword.svg" alt="edit" />
              <div>비밀번호 변경</div>
            </EditPasswordContainer>
            {/*비밀번호 변경 클릭시 비밀번호 변경 모달 등장------------------------------*/}
            {isOpened ? (
              <EditPassword
                setIsOpened={(bool: boolean) => setIsOpened(bool)}
              />
            ) : null}
          </TopContainer>
          {/*중간 컨텐츠---------------------------------------------------------*/}
          <MiddleContainer>
            <LeftContainer>
              {/*프로필 사진 입력-----------------------------------------------------*/}
              <UploadPhotoArea>
                <ImgTitleContainer>
                  <InputTitle>
                    <CameraIcon color={"#2d2d2d"} />
                    <div>프로필 사진</div>
                  </InputTitle>
                  <DeleteProfileImg onClick={() => deleteProfileImgHandle()}>
                    <img src="./images/delete.svg" alt="" />
                  </DeleteProfileImg>
                </ImgTitleContainer>
                <InputContainer>
                  {profileImg[0] === undefined && userImagePath === null ? (
                    <>
                      <div className="ProfileImg_Container">
                        <ProfileImgUpload
                          setProfileImgData={setProfileImgData}
                          profileImg={profileImg}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="ProfileImg_Container">
                      <ProfileImgUpload
                        setProfileImgData={setProfileImgData}
                        profileImg={profileImg}
                      />
                      {userImagePath ? (
                        !loginType ? (
                          // 프로필사진이 있고, 소셜로그인이 아닐 때
                          <img
                            className="ProfileImg_Thumb"
                            src={`${process.env.REACT_APP_API_URL}/uploads/${imagePath}`}
                            alt="Thumb"
                          />
                        ) : (
                          // 프로필사진이 있고, 소셜로그인일 때
                          <img
                            className="ProfileImg_Thumb"
                            src={`${imagePath}`}
                            alt="Thumb"
                          />
                        )
                      ) : (
                        <img
                          className="ProfileImg_Thumb"
                          src={profileImg[0].preview}
                          alt="Thumb"
                        />
                      )}
                    </div>
                  )}
                </InputContainer>
              </UploadPhotoArea>
            </LeftContainer>
            <RightContainer>
              {/*닉네임 입력------------------------------------------------------*/}
              <div>
                <InputTitle>
                  <PencilIcon color={"#2d2d2d"} />
                  <div>닉네임</div>
                </InputTitle>
                <InputContainer>
                  <InputField
                    defaultValue={nickname}
                    onChange={(e) => setNicknameData(e)}
                    onKeyPress={(e) => handleNicknameKeyPress(e)}
                  />
                  <ValidationBtn onClick={() => handleNicknameBtn()}>
                    중복 확인
                  </ValidationBtn>
                </InputContainer>
                <MsgContainer isColor={isRightNickname}>
                  {newNickname !== nickname ? (
                    <>
                      <WarningIcon
                        color={isRightNickname ? "#2d2d2d" : "#f44336"}
                      />
                      <div>{nicknameAlert}</div>
                    </>
                  ) : null}
                </MsgContainer>
              </div>
              {/*우리동네 주소 입력-------------------------------------------------*/}
              <div>
                <InputTitle>
                  <MapMarkIcon color={"#2d2d2d"} />
                  <div>우리 동네</div>
                </InputTitle>
                <InputContainer>
                  <InputField
                    placeholder={userArea ? userArea : "주소를 검색해 주세요."}
                    value={addressInput}
                    readOnly
                  />
                  <SearchAddress searchAddressHandle={searchAddressHandle} />
                </InputContainer>
              </div>
            </RightContainer>
          </MiddleContainer>
          {addressInput !== "" ? (
            <KakaoMap addressInput={addressInput} />
          ) : null}
          {/*확인 및 취소 버튼----------------------------------------------------*/}
          <BtnContainer>
            <Link to="/profile">
              <BlackBtn onClick={() => handleSubmitBtn()}>확인</BlackBtn>
            </Link>
            <Link to="/profile">
              <WhiteBtn>취소</WhiteBtn>
            </Link>
          </BtnContainer>
        </Container>
      </MainArea>
    </Body>
  );
}

export default EditProfilePage;
