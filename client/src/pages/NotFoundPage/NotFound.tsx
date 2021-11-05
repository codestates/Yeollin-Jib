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
} from "./NotFound.style";

function NotFound() {
  let history = useHistory();
  return (
    <Body>
      <MainArea>
        <Container>
          <ImgContainer>
            <img src="./images/404.svg"></img>
          </ImgContainer>
          <TxtContainer>
            찾을 수 없는 페이지 입니다.
            <DivContainer>
              <div>
                요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다.
              </div>
              <div>
                궁금한 점이 있으시면 언제든지 하단의 문의하기를 통해 문의해
                주시기 바랍니다. 감사합니다.
              </div>
            </DivContainer>
          </TxtContainer>
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

export default NotFound;
