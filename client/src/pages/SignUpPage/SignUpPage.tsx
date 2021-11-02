import { useState, useEffect } from "react";
import {
  Body,
  MainArea,
  Container,
  ContentContainer,
  TitleWrapper,
  Title,
  InputTitle,
  InputContainer,
  InputField,
  SmallInputField,
  ValidationBtn,
  InvalidMessage,
  SignupLoginBtn,
  LoginBtn,
  MsgContainer,
  SignupContainer,
} from "./SignUpPage.style";
import { Link } from "react-router-dom";
import Inspect from "./Inspect";
import WarningIcon from "../../icons/Icons";
import axios from "axios";

function SignUpPage() {
  // 인풋값
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  // 각 인풋에 대한 상태 메시지
  const [nicknameAlert, setNicknameAlert] = useState<string>("");
  const [emailAlert, setEmailAlert] = useState<string>("");
  const [passwordAlert, setPasswordAlert] = useState<string>("");
  const [checkPasswordAlert, setCheckPasswordAlert] = useState<string>("");

  // 각 인풋값이 바르게 작성되었는지 확인
  const [isRightNickname, setIsRightNickname] = useState<boolean>(false);
  const [isRightEmail, setIsRightEmail] = useState<boolean>(false);
  const [isRightPassword, setIsRightPassword] = useState<boolean>(false);
  const [isRightCheckPassword, setIsRightCheckPassword] =
    useState<boolean>(false);

  // 모든 값이 입력되어 있는지 확인
  const [isCompleted, setIsCompleted] = useState<boolean>(true);

  // 회원가입 완료
  const [isSignup, setIsSignup] = useState<boolean>(false);

  // 각 인풋값을 받아 상태로 저장
  const setNicknameData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  const setEmailData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const setPasswordData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const setcheckPasswordData = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCheckPassword(e.target.value);
  };

  // 관련된 상태값이 바뀜에 따라 alert 메시지 변경
  useEffect(() => {
    if (Inspect(nickname, "nickname")) {
      // 유효 조건을 통과했을 경우 중복 확인 필요
      setNicknameAlert("중복 확인이 필요합니다.");
    } else {
      // 유효 조건을 통과하지 못했을 경우, 유효 조건을 알려줌
      setNicknameAlert("2글자 이상, 한글, 영어, 숫자만 가능합니다.");
    }
    // 위의 두 경우 모두 올바른 값이 아니지만, 값이 입력됨
    setIsRightNickname(false);
    setIsCompleted(true);
  }, [nickname]);

  useEffect(() => {
    if (Inspect(email, "email")) {
      // 유효 조건을 통과했을 경우 중복 확인 필요
      setEmailAlert("중복 확인이 필요합니다.");
    } else {
      // 유효 조건을 통과하지 못했을 경우, 유효 조건을 알려줌
      setEmailAlert("올바른 형식의 이메일을 작성해 주세요.");
    }
    // 위의 두 경우 모두 올바른 값이 아니지만, 값이 입력됨
    setIsRightEmail(false);
    setIsCompleted(true);
  }, [email]);

  useEffect(() => {
    if (Inspect(password, "password")) {
      // 올바른 값이 입력됨
      setPasswordAlert("사용 가능한 비밀번호입니다.");
      setIsRightPassword(true);
    } else {
      // 유효 조건을 통과하지 못했을 경우, 유효 조건을 알려줌
      setPasswordAlert("8~16글자, 영문 대소문자, 숫자, 특수문자를 사용하세요.");
      setIsRightPassword(false);
    }
    setIsCompleted(true);
  }, [password]);

  useEffect(() => {
    if (password !== checkPassword) {
      // 비빌번호가 일치하진 않지만 값이 입력됨
      setCheckPasswordAlert("비밀번호를 다시 확인해 주세요.");
      setIsRightCheckPassword(false);
    } else {
      // 올바른 값이 입력됨
      setCheckPasswordAlert("비밀번호가 일치합니다.");
      setIsRightCheckPassword(true);
    }
    setIsCompleted(true);
  }, [checkPassword, password]);

  // 닉네임 및 이메일 중복 확인
  interface Iresponse {
    data: {
      message: string;
    };
  }

  const handleNicknameBtn = async () => {
    if (nickname === "") {
      // 아무 값도 입력하지 않은 상태에서 중복 버튼을 눌렀을 경우 유효 조건이 나오도록 "0"으로 설정
      setNickname("0");
    } else if (Inspect(nickname, "nickname")) {
      // 유효 조건을 통과한 닉네임일 경우 서버에 중복 검사 요청을 보님
      const result: Iresponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/nickname?nickname=${nickname}`,
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

  const handleEmailBtn = async () => {
    // 아무 값도 입력하지 않은 상태에서 중복 버튼을 눌렀을 경우 유효 조건이 나오도록 "0"으로 설정
    if (email === "") {
      setEmail("0");
    } else if (Inspect(email, "email")) {
      // 유효 조건을 통과한 이메일일 경우 서버에 중복 검사 요청을 보님
      const result: Iresponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/email?email=${email}`,
        {
          withCredentials: true,
        }
      );

      const message: string = result.data.message;

      if (message === "사용할 수 있는 이메일입니다.") {
        setEmailAlert("사용 가능한 이메일입니다.");
        setIsRightEmail(true);
      } else if (message === "이메일이 중복됩니다.") {
        setEmailAlert("이미 가입된 이메일입니다.");
        setIsRightEmail(false);
      }
    }
  };

  // 회원가입 버튼을 눌렀을 때
  const handleSignupBtn = async () => {
    if (
      // 모든 요소가 true가 아니면 isCompleted는 false
      !isRightNickname ||
      !isRightEmail ||
      !isRightPassword ||
      !isRightCheckPassword
    ) {
      setIsCompleted(false);
    } else {
      // 모든 요소가 true면 isCompleted는 true, 회원가입 요청을 보냄
      setIsCompleted(true);
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        {
          nickname: nickname,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      // result.status가 201로 성공적으로 가입이 되었다면
      if (result.status === 201) {
        setIsSignup(true);
      } else {
        setIsCompleted(false);
      }
    }
  };

  return (
    <Body>
      <MainArea>
        <Container>
          {isSignup ? (
            // 회원가입이 완료되었을 때
            <SignupContainer>
              <TitleWrapper>
                <Title>축하합니다</Title>
              </TitleWrapper>
              <div>{`${nickname}님의 회원가입이 완료되었습니다.`}</div>
              <Link to={"/login"}>
                <SignupLoginBtn>로그인 하러가기</SignupLoginBtn>
              </Link>
            </SignupContainer>
          ) : (
            // 회원가입 Form
            <ContentContainer>
              <TitleWrapper>
                <Title>회원가입</Title>
              </TitleWrapper>
              <InputTitle>닉네임</InputTitle>
              <InputContainer>
                <SmallInputField
                  type="text"
                  onChange={(e) => setNicknameData(e)}
                />
                <ValidationBtn onClick={() => handleNicknameBtn()}>
                  중복 확인
                </ValidationBtn>
              </InputContainer>
              <MsgContainer isColor={isRightNickname}>
                {nickname !== "" ? (
                  <>
                    <WarningIcon
                      color={isRightNickname ? "#2d2d2d" : "#f44336"}
                    />
                    <div>{nicknameAlert}</div>
                  </>
                ) : null}
              </MsgContainer>
              <InputTitle>이메일</InputTitle>
              <InputContainer>
                <SmallInputField
                  type="text"
                  onChange={(e) => setEmailData(e)}
                />
                <ValidationBtn onClick={() => handleEmailBtn()}>
                  중복 확인
                </ValidationBtn>
              </InputContainer>
              <MsgContainer isColor={isRightEmail}>
                {email !== "" ? (
                  <>
                    <WarningIcon color={isRightEmail ? "#2d2d2d" : "#f44336"} />
                    <div>{emailAlert}</div>
                  </>
                ) : null}
              </MsgContainer>
              <InputTitle>비밀번호</InputTitle>
              <InputField
                type="password"
                onChange={(e) => setPasswordData(e)}
              />
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
                onChange={(e) => setcheckPasswordData(e)}
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
              <SignupLoginBtn onClick={() => handleSignupBtn()}>
                회원가입
              </SignupLoginBtn>
              <Link to={"/login"}>
                <LoginBtn>이미 가입하셨나요? 로그인 하러가기</LoginBtn>
              </Link>
            </ContentContainer>
          )}
        </Container>
      </MainArea>
    </Body>
  );
}

export default SignUpPage;
