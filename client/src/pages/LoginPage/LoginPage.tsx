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

function LoginPage() {
  const dispatch = useDispatch();

  // 스토어 값 가져오기
  const { isLogin } = useSelector((state: RootState) => state.authReducer);

  // 이메일과 비밀번호 인풋값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  // 이메일 값을 저장
  const setEmailData = (e: any): void => {
    setEmail(e.target.value);
  };

  // 비밀번호 값을 저장
  const setPasswordData = (e: any): void => {
    setPassword(e.target.value);
  };

  // 입력받은 이메일과 비밀번호를 dispatch로 setAuth에 넣어 함수 실행
  const handleLoginBtn = (email: string, password: string): void => {
    dispatch(setAuth({ email: email, password: password }));
    // 로그인이 false면 메시지 노출
    if (!isLogin) {
      setIsValid(false);
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
              {isValid ? null : (
                <>
                  <img src="./images/warning.svg" alt="warning" />
                  <div>이메일과 비밀번호를 다시한번 확인해 주세요.</div>
                </>
              )}
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
