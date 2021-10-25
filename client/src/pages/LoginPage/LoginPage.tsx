import { useState } from "react";
import {
  Container,
  ContentContainer,
  TitleWrapper,
  Title,
  InputTitle,
  InputField,
  InvalidMessage,
  LoginBtn,
  SocialLoginBtn,
  SignupBtn,
} from "./LoginPage.style";
import { RootState } from "../../reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../reducers/authReducer";
import { Link, Redirect } from "react-router-dom";
import Inspect from "../SignUpPage/Inspect";

function LoginPage() {
  const dispatch = useDispatch();

  // 스토어 값 가져오기
  const { isLogin } = useSelector((state: RootState) => state.authReducer);

  // 이메일과 비밀번호 인풋값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 입력받은 이메일과 비밀번호가 로그인이 가능한 지
  const [isInValid, setIsInValid] = useState(false);

  // 서버에 요청을 보낸 후 메시지
  const [alert, setAlert] = useState("");

  // 이메일 값을 저장
  const setEmailData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  // 비밀번호 값을 저장
  const setPasswordData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  // 입력받은 이메일과 비밀번호를 올바른 양식인지 검사하여 dispatch로 setAuth에 서버에 로그인 요청
  const handleLoginBtn = (email: string, password: string) => {
    if (Inspect(email, "email") && Inspect(password, "password")) {
      dispatch(setAuth({ email: email, password: password }));
    } else {
      setAlert("이메일과 비밀번호를 확인해 주세요.");
      setIsInValid(true);
    }
  };

  return (
    <>
      {isLogin ? (
        <Redirect to="/main"></Redirect>
      ) : (
        <Container>
          <ContentContainer>
            <TitleWrapper>
              <Title>로그인</Title>
            </TitleWrapper>
            <InputTitle>이메일</InputTitle>
            <InputField type="text" onChange={(e) => setEmailData(e)} />
            <InputTitle>비밀번호</InputTitle>
            <InputField type="password" onChange={(e) => setPasswordData(e)} />
            <InvalidMessage>
              {isInValid ? (
                <>
                  <img src="./images/warning.svg" alt="warning" />
                  <div>{alert}</div>
                </>
              ) : null}
            </InvalidMessage>
            <LoginBtn onClick={() => handleLoginBtn(email, password)}>
              로그인
            </LoginBtn>
            <SocialLoginBtn>
              <img src="./images/googleLogo.svg" alt="google" />
              <div>구글 로그인</div>
            </SocialLoginBtn>
            <SocialLoginBtn>
              <img src="./images/kakaoLogo.svg" alt="kakao" />
              <div>카카오 로그인</div>
            </SocialLoginBtn>
            <Link to={"/signup"}>
              <SignupBtn>아직 이메일이 없으신가요? 회원가입 하러가기</SignupBtn>
            </Link>
          </ContentContainer>
        </Container>
      )}
    </>
  );
}

export default LoginPage;
