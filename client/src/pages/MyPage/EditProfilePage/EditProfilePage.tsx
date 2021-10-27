import React from "react";
import {
  Container,
  TopContainer,
  Title,
  EditPassword,
  MiddleContainer,
  LeftContainer,
  RightContainer,
  FormContainer,
  PhotoBox,
  InputTitle,
  InputContainer,
  InputField,
  SearchBtn,
  InvalidMessage,
  BtnContainer,
  BlackBtn,
  WhiteBtn,
} from "./EditProfilePage.style";
import { Link } from "react-router-dom";

function EditProfilePage() {
  return (
    <Container>
      <TopContainer>
        <Title>정보 수정</Title>
        <EditPassword>
          <img src="./images/editPassword.svg" alt="edit" />
          <div>비밀번호 변경</div>
        </EditPassword>
      </TopContainer>
      <MiddleContainer>
        <LeftContainer>
          <FormContainer>
            <InputTitle>
              <div>프로필 사진</div>
            </InputTitle>
            <PhotoBox></PhotoBox>
          </FormContainer>
        </LeftContainer>
        <RightContainer>
          <FormContainer>
            <InputTitle>
              <div>닉네임</div>
            </InputTitle>
            <InputContainer>
              <InputField />
              <SearchBtn>중복 확인</SearchBtn>
            </InputContainer>
            <InvalidMessage>
              <img src="./images/warning.svg" alt="warning" />
              <div>중복 확인이 필요합니다.</div>
            </InvalidMessage>
          </FormContainer>
          <FormContainer>
            <InputTitle>
              <div>우리 동네</div>
            </InputTitle>
            <InputContainer>
              <InputField placeholder="주소를 검색해 주세요." />
              <SearchBtn>주소 검색</SearchBtn>
            </InputContainer>
          </FormContainer>
        </RightContainer>
      </MiddleContainer>
      <BtnContainer>
        <BlackBtn>확인</BlackBtn>
        <Link to="/profile">
          <WhiteBtn>취소</WhiteBtn>
        </Link>
      </BtnContainer>
    </Container>
  );
}

export default EditProfilePage;
