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
  InquiryTxt,
  InquiryField,
} from "./Inquiry.style";
import Inspect from "../../../pages/SignUpPage/Inspect";
import axios from "axios";

interface IProps {
  setIsOpened: (bool: boolean) => void;
}

function Inquiry({ setIsOpened }: IProps) {
  // 모든 값이 제대로 입력되어 있는지 확인
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailAlert, setEmailAlert] = useState<string>("");
  const [isRightEmail, setIsRightEmail] = useState<boolean>(false);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  // 이메일 인풋값을 받아 상태로 저장
  const setEmailData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (Inspect(email, "email")) {
      // 유효 조건을 통과하지 못했을 경우, 유효 조건을 알려줌
      setEmailAlert("");
      setIsRightEmail(true);
    } else {
      setIsRightEmail(false);
      setEmailAlert("올바른 형식의 이메일을 작성해 주세요.");
    }
  }, [email]);

  // 확인 버튼을 눌렀을 때
  const handleSubmitBtn = async () => {
    if (!isRightEmail) {
      return setIsCompleted(false);
    }
    // 모든 요소가 true면 isCompleted는 true, 문의하기 요청을 보냄
    setIsCompleted(true);
    const result = await axios.patch(`${process.env.REACT_APP_API_URL}/user`);
  };

  return (
    <ModalBackground>
      <ModalContainer isSubmited={isSubmited}>
        <TitleWrapper>
          <Title>문의하기</Title>
        </TitleWrapper>
        {/*문의하기 전송 완료---------------------------------------------------------*/}
        {isSubmited ? (
          <>
            <CompletedMsg>문의하기 전송이 완료되었습니다.</CompletedMsg>
            <BtnContainer>
              <BlackBtn onClick={() => setIsOpened(false)}>확인</BlackBtn>
            </BtnContainer>
          </>
        ) : (
          <>
            {/*문의하기 페이지---------------------------------------------------------*/}
            <InputTitle>이메일</InputTitle>
            <InputField type="text" onChange={(e) => setEmailData(e)} />
            <MsgContainer>
              <InvalidMessage>
                {!isRightEmail ? (
                  <>
                    <img src="./images/warning.svg" alt="warning" />
                    <div>{emailAlert}</div>
                  </>
                ) : null}
              </InvalidMessage>
            </MsgContainer>
            <InputTitle>제목</InputTitle>
            <InputField type="text" />
            <InputTitle isContents={true}>문의 내용</InputTitle>
            <InquiryField />
            <InquiryTxt>
              문의하신 내용에 대한 답변은 작성해주신 이메일로 발송됩니다.
            </InquiryTxt>
            {/*확인 및 취소 버튼---------------------------------------------------------*/}
            <BtnContainer>
              <BlackBtn
                disabled={isCompleted}
                onClick={() => handleSubmitBtn()}
              >
                확인
              </BlackBtn>
              <WhiteBtn onClick={() => setIsOpened(false)}>취소</WhiteBtn>
            </BtnContainer>
          </>
        )}
      </ModalContainer>
    </ModalBackground>
  );
}

export default Inquiry;
