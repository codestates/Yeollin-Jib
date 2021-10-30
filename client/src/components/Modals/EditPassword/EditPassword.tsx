import { useState, useEffect } from "react";
import {
  ModalBackground,
  ModalContainer,
  TitleWrapper,
  Title,
  InputTitle,
  InputField,
  MsgContainer,
  InvalidMessage,
  BtnContainer,
  BlackBtn,
  WhiteBtn,
  CompletedMsg,
} from "./EditPassword.style";
import Inspect from "../../../pages/SignUpPage/Inspect";
import WarningIcon from "../../../icons/Icons";
import axios from "axios";
import { RootState } from "../../../reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../../reducers/authReducer";

interface IProps {
  setIsOpened: (bool: boolean) => void;
}

function EditPassword({ setIsOpened }: IProps) {
  const dispatch = useDispatch();

  // 저장된 토큰값을 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  // 인풋값
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  // 각 인풋에 대한 상태 메시지
  const [passwordAlert, setPasswordAlert] = useState<string>("");
  const [checkPasswordAlert, setCheckPasswordAlert] = useState<string>("");

  // 각 인풋값이 바르게 작성되었는지 확인
  const [isRightPassword, setIsRightPassword] = useState<boolean>(false);
  const [isRightCheckPassword, setIsRightCheckPassword] =
    useState<boolean>(false);

  // 모든 값이 제대로 입력되어 있는지 확인
  const [isCompleted, setIsCompleted] = useState<boolean>(true);

  // 인풋값을 받아 상태로 저장
  const setPasswordData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const checkPasswordData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckPassword(e.target.value);
  };

  // 회원가입 완료
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  // 관련된 상태값이 바뀜에 따라 alert 메시지 변경
  useEffect(() => {
    if (Inspect(password, "password")) {
      setPasswordAlert("사용 가능한 비밀번호입니다.");
      setIsRightPassword(true);
    } else {
      setPasswordAlert("8~16글자, 영문 대소문자, 숫자, 특수문자를 사용하세요.");
      setIsRightPassword(false);
    }
    setIsCompleted(true);
  }, [password]);

  useEffect(() => {
    if (password !== checkPassword) {
      setCheckPasswordAlert("비밀번호를 다시 확인해 주세요.");
      setIsRightCheckPassword(false);
    } else {
      setCheckPasswordAlert("비밀번호가 일치합니다.");
      setIsRightCheckPassword(true);
    }
    setIsCompleted(true);
  }, [checkPassword, password]);

  // 확인 버튼을 눌렀을 때
  const handleSubmitBtn = async () => {
    if (
      // 모든 요소가 true가 아니면 isCompleted는 false
      !isRightPassword ||
      !isRightCheckPassword
    ) {
      setIsCompleted(false);
    } else {
      // 모든 요소가 true면 isCompleted는 true, 비밀번호 수정 요청을 보냄
      setIsCompleted(true);
      const result = await axios.patch(
        `${process.env.REACT_APP_API_URL}/user`,
        {
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (result.status === 403) {
        // 요청을 보냈는데 refreshToken이 만료되었을 경우 로그아웃
        dispatch(setLogOut());
      } else if (result.status === 200) {
        // 성공적으로 비밀번호를 변경했을 경우
        setIsSubmited(true);
      } else {
        setIsCompleted(false);
      }
    }
  };

  return (
    <ModalBackground>
      <ModalContainer isSubmited={isSubmited ? true : false}>
        <TitleWrapper>
          <Title>비밀번호 변경</Title>
        </TitleWrapper>
        {/*비밀번호 변경 완료---------------------------------------------------------*/}
        {isSubmited ? (
          <>
            <CompletedMsg>비밀번호 변경이 완료되었습니다.</CompletedMsg>
            <BtnContainer>
              <BlackBtn onClick={() => setIsOpened(false)}>확인</BlackBtn>
            </BtnContainer>
          </>
        ) : (
          <>
            {/*비밀번호 변경 페이지---------------------------------------------------------*/}
            <InputTitle>비밀번호</InputTitle>
            <InputField type="password" onChange={(e) => setPasswordData(e)} />
            <MsgContainer isColor={isRightPassword}>
              {password !== "" ? (
                <>
                  <WarningIcon
                    color={isRightPassword ? "#2d2d2d" : "#f44336"}
                  />
                  <div>{passwordAlert}</div>
                </>
              ) : null}
            </MsgContainer>
            <InputTitle>비밀번호 확인</InputTitle>
            <InputField
              type="password"
              onChange={(e) => checkPasswordData(e)}
            />
            <MsgContainer isColor={isRightCheckPassword}>
              {checkPassword !== "" ? (
                <>
                  <WarningIcon
                    color={isRightCheckPassword ? "#2d2d2d" : "#f44336"}
                  />
                  <div>{checkPasswordAlert}</div>
                </>
              ) : null}
            </MsgContainer>
            <InvalidMessage>
              {!isCompleted ? (
                <>
                  <img src="./images/warning.svg" alt="warning" />
                  <div>모든 항목을 바르게 입력해 주세요.</div>
                </>
              ) : null}
            </InvalidMessage>
            {/*변경 및 취소 버튼---------------------------------------------------------*/}
            <BtnContainer>
              <BlackBtn onClick={() => handleSubmitBtn()}>변경</BlackBtn>
              <WhiteBtn onClick={() => setIsOpened(false)}>취소</WhiteBtn>
            </BtnContainer>
          </>
        )}
      </ModalContainer>
    </ModalBackground>
  );
}

export default EditPassword;
