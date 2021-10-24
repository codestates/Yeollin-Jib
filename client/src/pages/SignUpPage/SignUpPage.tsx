import React from "react";
import {
  Container,
  ContentContainer,
  TitleWrapper,
  Title,
  InputTitle,
  InputField,
  InvalidMessage,
  SignupBtn,
  LoginBtn,
  MsgContainer,
} from "./SignUpPage.style";
import { Link } from "react-router-dom";

function SignUpPage() {
  // 닉네임
  // 조건 : 2글자 이상, 한글, 영어, 숫자만 가능합니다.
  // 중복 : 이미 가입된 닉네임입니다.
  // OK : 사용 가능한 닉네임입니다.

  // 이메일
  // 조건 : 올바른 형식의 이메일을 작성해 주세요.
  // 중복: 이미 가입된 이메일입니다.
  // OK: 사용 가능한 이메일입니다.

  // 비밀번호
  // 조건 : 8~16글자, 영문 대소문자, 숫자, 특수문자를 사용하세요.
  // OK : 사용 가능한 비밀번호입니다.

  // 비밀번호 확인
  // 불일치 : 비밀번호를 다시 확인해 주세요.
  // OK : 비밀번호가 일치합니다.

  return (
    <Container>
      <ContentContainer>
        <TitleWrapper>
          <Title>회원가입</Title>
        </TitleWrapper>
        <InputTitle>닉네임</InputTitle>
        <InputField type="text" />
        <MsgContainer>
          <img src="./images/warning.svg" alt="warning" />
          <div>2글자 이상, 한글, 영어, 숫자만 가능합니다.</div>
        </MsgContainer>
        <InputTitle>이메일</InputTitle>
        <InputField type="text" />
        <MsgContainer>
          <img src="./images/warning.svg" alt="warning" />
          <div>올바른 형식의 이메일을 작성해 주세요.</div>
        </MsgContainer>
        <InputTitle>비밀번호</InputTitle>
        <InputField type="password" />
        <MsgContainer>
          <img src="./images/warning.svg" alt="warning" />
          <div>8~16글자, 영문 대소문자, 숫자, 특수문자를 사용하세요.</div>
        </MsgContainer>
        <InputTitle>비밀번호 확인</InputTitle>
        <InputField type="password" />
        <MsgContainer>
          <img src="./images/warning.svg" alt="warning" />
          <div>비밀번호를 다시 확인해 주세요.</div>
        </MsgContainer>
        <InvalidMessage>
          <img src="./images/warning.svg" alt="warning" />
          <div>모든 항복을 바르게 입력해 주세요.</div>
        </InvalidMessage>
        <SignupBtn>회원가입</SignupBtn>
        <Link to={"/login"}>
          <LoginBtn>이미 가입하셨나요? 로그인 하러가기</LoginBtn>
        </Link>
      </ContentContainer>
    </Container>
  );
}

export default SignUpPage;
