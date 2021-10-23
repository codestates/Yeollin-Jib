import React from "react";
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

function LoginPage() {
  return (
    <Container>
      <ContentContainer>
        <TitleWrapper>
          <Title>로그인</Title>
        </TitleWrapper>
        <InputTitle>이메일</InputTitle>
        <InputField />
        <InputTitle>비밀번호</InputTitle>
        <InputField type="password" />
        <InvalidMessage>
          <img src="./images/warning.svg" alt="warning" />
          <div>이메일과 비밀번호를 다시한번 확인해 주세요.</div>
        </InvalidMessage>
        <LoginBtn>로그인</LoginBtn>
        <SocialLoginBtn>
          <img src="./images/googleLogo.svg" alt="google" />
          <div>구글 로그인</div>
        </SocialLoginBtn>
        <SocialLoginBtn>
          <img src="./images/kakaoLogo.svg" alt="kakao" />
          <div>카카오 로그인</div>
        </SocialLoginBtn>
        <SignupBtn>아직 이메일이 없으신가요? 회원가입 하러가기</SignupBtn>
      </ContentContainer>
    </Container>
  );
}

export default LoginPage;
