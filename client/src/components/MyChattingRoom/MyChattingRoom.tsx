import React from "react";
import {
  NoCardContainer,
  CardContainer,
  UserInfoContainer,
  UserPhotoContainer,
  UserNickname,
  SendButtonContainer,
  MessageContainer,
  UserTopContainer,
} from "./MyChattingRoom.style";

function MyChattingRoom() {
  return (
    <>
      <UserInfoContainer>
        <UserTopContainer>
          <UserPhotoContainer
            src="./images/test.jpeg"
            alt="test"
          ></UserPhotoContainer>
          <UserNickname>황마리모</UserNickname>
          <span>11:30</span>
        </UserTopContainer>
        <MessageContainer>
          <div>
            안녕하세요! 혹시 지금 원형 식탁 남아있나요!? 남아있다면 상태도
            궁금합니다! kkakka@gmail.com으로 연락 부탁드려요!
          </div>
        </MessageContainer>
      </UserInfoContainer>
    </>
  );
}

export default MyChattingRoom;
