import { useEffect, useState } from "react";
import {
  Body,
  MainArea,
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
  AdviceContainer,
} from "./LoginPage.style";
import { RootState } from "../../reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setSocialLogin } from "../../reducers/authReducer";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";
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

  // 인풋 입력 후 엔터를 치면 로그인 요청을 보냄
  const handleKeyPress = (
    e: React.KeyboardEvent,
    email: string,
    password: string
  ) => {
    if (e.key === "Enter") {
      handleLoginBtn(email, password);
    }
  };

  // 구글 로그인 버튼을 누르면 서버에 구글 로그인 요청
  const handleGoogleLoginBtn = async () => {
    await window.location.assign(
      `${process.env.REACT_APP_API_URL}/user/login/google`
    );
  };

  // 카카오 로그인 버튼을 누르면 서버에 카카오 로그인 요청
  const handleKakaoLoginBtn = async () => {
    await window.location.assign(
      `${process.env.REACT_APP_API_URL}/user/login/kakao`
    );
  };

  // 서버에서 쿼리에 access_token을 보내주면 현재 url을 감지해 access_token을 저장
  useEffect(() => {
    const query = queryString.parse(window.location.search);
    if (query.access_token) {
      dispatch(setSocialLogin(query.access_token));
    }
  }, [window.location]);

  return (
    <Body>
      <MainArea>
        {isLogin ? (
          <Redirect to="/main"></Redirect>
        ) : (
          <>
            <Container>
              <ContentContainer>
                <TitleWrapper>
                  <Title>로그인</Title>
                </TitleWrapper>
                {/*이메일 입력---------------------------------------------------------*/}
                <InputTitle>이메일</InputTitle>
                <InputField
                  type="text"
                  onChange={(e) => setEmailData(e)}
                  onKeyPress={(e) => handleKeyPress(e, email, password)}
                />
                {/*비밀번호 입력---------------------------------------------------------*/}
                <InputTitle>비밀번호</InputTitle>
                <InputField
                  type="password"
                  onChange={(e) => setPasswordData(e)}
                  onKeyPress={(e) => handleKeyPress(e, email, password)}
                />
                <InvalidMessage>
                  {isInValid ? (
                    <>
                      <img src="./images/warning.svg" alt="warning" />
                      <div>{alert}</div>
                    </>
                  ) : null}
                </InvalidMessage>
                {/*로그인 버튼---------------------------------------------------------*/}
                <LoginBtn onClick={() => handleLoginBtn(email, password)}>
                  로그인
                </LoginBtn>
                {/*소셜 로그인 버튼---------------------------------------------------------*/}
                <SocialLoginBtn onClick={() => handleGoogleLoginBtn()}>
                  <img src="./images/googleLogo.svg" alt="google" />
                  <div>구글 로그인</div>
                </SocialLoginBtn>
                <SocialLoginBtn onClick={() => handleKakaoLoginBtn()}>
                  <img src="./images/kakaoLogo.svg" alt="kakao" />
                  <div>카카오 로그인</div>
                </SocialLoginBtn>
                {/*회원가입 버튼————————————————————————————*/}
                <Link to={"/signup"}>
                  <SignupBtn>
                    아직 이메일이 없으신가요? 회원가입 하러가기
                  </SignupBtn>
                </Link>
              </ContentContainer>
              <AdviceContainer>
                <div>카카오 로그인을 이용하실 경우</div>
                <div>정보 제공 약관에 전체 동의를 부탁드립니다.</div>
              </AdviceContainer>
            </Container>
          </>
        )}
      </MainArea>
    </Body>
  );
}

export default LoginPage;
