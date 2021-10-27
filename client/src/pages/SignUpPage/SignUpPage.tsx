import { useState, useEffect } from "react";
import {
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
import WarningIcon from "../../icons/WarningIcon";
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
  const [isrightNickname, setisrightNickname] = useState<boolean>(false);
  const [isrightEmail, setisrightEmail] = useState<boolean>(false);
  const [isrightPassword, setisrightPassword] = useState<boolean>(false);
  const [isrightCheckPassword, setisrightCheckPassword] =
    useState<boolean>(false);

  // 모든 값이 제대로 입력되어 있는지 확인
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

  const checkPasswordAlertData = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCheckPassword(e.target.value);
  };

  // 관련된 상태값이 바뀜에 따라 alert 메시지 변경
  useEffect(() => {
    if (Inspect(nickname, "nickname")) {
      setNicknameAlert("중복 확인이 필요합니다.");
    } else {
      setNicknameAlert("2글자 이상, 한글, 영어, 숫자만 가능합니다.");
    }
    setisrightNickname(false);
    setIsCompleted(true);
  }, [nickname]);

  useEffect(() => {
    if (Inspect(email, "email")) {
      setEmailAlert("중복 확인이 필요합니다.");
    } else {
      setEmailAlert("올바른 형식의 이메일을 작성해 주세요.");
    }
    setisrightEmail(false);
    setIsCompleted(true);
  }, [email]);

  useEffect(() => {
    if (Inspect(password, "password")) {
      setPasswordAlert("사용 가능한 비밀번호입니다.");
      setisrightPassword(true);
    } else {
      setPasswordAlert("8~16글자, 영문 대소문자, 숫자, 특수문자를 사용하세요.");
      setisrightPassword(false);
    }
    setIsCompleted(true);
  }, [password]);

  useEffect(() => {
    if (password !== checkPassword) {
      setCheckPasswordAlert("비밀번호를 다시 확인해 주세요.");
      setisrightCheckPassword(false);
    } else {
      setCheckPasswordAlert("비밀번호가 일치합니다.");
      setisrightCheckPassword(true);
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
    if (Inspect(nickname, "nickname")) {
      const result: Iresponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/nickname?nickname=${nickname}`,
        {
          withCredentials: true,
        }
      );

      const message: string = result.data.message;
      if (message === "사용할 수 있는 닉네임입니다.") {
        setNicknameAlert("사용 가능한 닉네임입니다.");
        setisrightNickname(true);
      } else if (message === "닉네임이 중복됩니다.") {
        setNicknameAlert("이미 가입된 닉네임입니다.");
        setisrightNickname(false);
      }
    }
  };

  const handleEmailBtn = async () => {
    if (Inspect(email, "email")) {
      const result: Iresponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/email?email=${email}`,
        {
          withCredentials: true,
        }
      );

      const message: string = result.data.message;
      if (message === "사용할 수 있는 이메일입니다.") {
        setEmailAlert("사용 가능한 이메일입니다.");
        setisrightEmail(true);
      } else if (message === "이메일이 중복됩니다.") {
        setEmailAlert("이미 가입된 이메일입니다.");
        setisrightEmail(false);
      }
    }
  };

  // 회원가입 버튼을 눌렀을 때
  const handleSignupBtn = async () => {
    if (
      // 모든 요소가 true가 아니면 isCompleted는 false
      !isrightNickname ||
      !isrightEmail ||
      !isrightPassword ||
      !isrightCheckPassword
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
      }
    }
  };

  return (
    <Container>
      {isSignup ? (
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
        <ContentContainer>
          <TitleWrapper>
            <Title>회원가입</Title>
          </TitleWrapper>
          <InputTitle>닉네임</InputTitle>
          <InputContainer>
            <SmallInputField type="text" onChange={(e) => setNicknameData(e)} />
            <ValidationBtn onClick={() => handleNicknameBtn()}>
              중복 확인
            </ValidationBtn>
          </InputContainer>
          <MsgContainer isColor={isrightNickname}>
            {nickname !== "" ? (
              <>
                <WarningIcon color={isrightNickname ? "#2d2d2d" : "#f44336"} />
                <div>{nicknameAlert}</div>
              </>
            ) : null}
          </MsgContainer>
          <InputTitle>이메일</InputTitle>
          <InputContainer>
            <SmallInputField type="text" onChange={(e) => setEmailData(e)} />
            <ValidationBtn onClick={() => handleEmailBtn()}>
              중복 확인
            </ValidationBtn>
          </InputContainer>
          <MsgContainer isColor={isrightEmail}>
            {email !== "" ? (
              <>
                <WarningIcon color={isrightEmail ? "#2d2d2d" : "#f44336"} />
                <div>{emailAlert}</div>
              </>
            ) : null}
          </MsgContainer>
          <InputTitle>비밀번호</InputTitle>
          <InputField type="password" onChange={(e) => setPasswordData(e)} />
          <MsgContainer isColor={isrightPassword}>
            {password !== "" ? (
              <>
                <WarningIcon color={isrightPassword ? "#2d2d2d" : "#f44336"} />
                <div>{passwordAlert}</div>
              </>
            ) : null}
          </MsgContainer>
          <InputTitle>비밀번호 확인</InputTitle>
          <InputField
            type="password"
            onChange={(e) => checkPasswordAlertData(e)}
          />
          <MsgContainer isColor={isrightCheckPassword}>
            {checkPassword !== "" ? (
              <>
                <WarningIcon
                  color={isrightCheckPassword ? "#2d2d2d" : "#f44336"}
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
  );
}

export default SignUpPage;
