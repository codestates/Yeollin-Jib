import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Body,
  MainArea,
  Container,
  ImgContainer,
  TxtContainer,
  DivContainer,
  ButtonContainer,
  GoToMainButton,
  GoToBeforeButton,
} from "./Preparation.style";

function Preparation() {
  let history = useHistory();
  return (
    <Body>
      <MainArea>
        <Container>
          <TxtContainer>
            서비스 준비중입니다.
            <DivContainer>
              <div>이용에 불편을 드려 죄송합니다.</div>
              <div>다음에 다시 찾아주세요. 감사합니다.</div>
            </DivContainer>
          </TxtContainer>
          <ImgContainer>
            <img src="./images/landing1.svg" alt="not_found"></img>
          </ImgContainer>
          <ButtonContainer>
            <Link to="/main">
              <GoToMainButton>메인 페이지</GoToMainButton>
            </Link>
            <GoToBeforeButton onClick={() => history.goBack()}>
              이전 페이지
            </GoToBeforeButton>
          </ButtonContainer>
        </Container>
      </MainArea>
    </Body>
  );
}

export default Preparation;
