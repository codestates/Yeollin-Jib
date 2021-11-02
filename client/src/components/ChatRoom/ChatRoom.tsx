import React from "react";
import {
  CardContainer,
  UserInfoContainer,
  UserPhotoContainer,
  UserNickname,
  UserChatContainer,
  MyChatContainer,
  SendContainer,
  InputContainer,
  SendButton,
  UserMsg,
  UserTime,
  UserMsgTime,
  MyMsg,
} from "./ChatRoom.style";

function ChatRoom() {
  return (
    <>
      <CardContainer>
        <UserChatContainer>
          <UserInfoContainer>
            <UserPhotoContainer
              src="./images/test.jpeg"
              alt="test"
            ></UserPhotoContainer>
            <UserNickname>황마리모</UserNickname>
          </UserInfoContainer>
          <UserMsgTime>
            <UserMsg>
              안녕하세요! 혹시 지금 침대 협탁 남아있나요!? 남아있다면 상태도
              궁금합니다!
            </UserMsg>
            <UserTime>11:30</UserTime>
          </UserMsgTime>
        </UserChatContainer>
        <MyChatContainer>
          <UserTime>11:31</UserTime>
          <MyMsg>
            네! 남아있습니다! 상세 사진 보내드릴께요~! 혹시 시간 거래 시간
            알려주시면 예약 걸어드리겠습니다!
          </MyMsg>
        </MyChatContainer>
        <SendContainer>
          <div className="Input_Area">
            <InputContainer></InputContainer>
          </div>
          <div className="Button_Area">
            <SendButton>전송</SendButton>
          </div>
        </SendContainer>
      </CardContainer>{" "}
      {/* <SendContainer>
        <InputContainer></InputContainer>
        <SendButton>전송</SendButton>
      </SendContainer> */}
    </>
  );
}

export default ChatRoom;
