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
  ChatListTxt,
  AllChatContainer,
  MobileCardContainer,
  DeleteImg,
  TopContainer,
  GoUpContainer,
} from "./ChatRoom.style";

function ChatRoom() {
  const arrowUpHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <>
      <CardContainer>
        <TopContainer>
          <ChatListTxt>
            <span>황마리모님과의 채팅</span>
            <DeleteImg>
              <img src="./images/delete.svg" alt="delete"></img>
            </DeleteImg>
          </ChatListTxt>
        </TopContainer>
        <AllChatContainer>
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
        </AllChatContainer>
        <SendContainer>
          <div className="Input_Area">
            <InputContainer></InputContainer>
          </div>
          <div className="Button_Area">
            <SendButton>전송</SendButton>
          </div>
        </SendContainer>
      </CardContainer>
      <div className="Mobile_Container">
        <TopContainer>
          <ChatListTxt>
            <span>황마리모님과의 채팅</span>
            <DeleteImg>
              <img src="./images/delete.svg" alt="delete"></img>
            </DeleteImg>
          </ChatListTxt>
        </TopContainer>
        <MobileCardContainer>
          <AllChatContainer>
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
          </AllChatContainer>
          <SendContainer>
            <div className="Input_Area">
              <InputContainer></InputContainer>
            </div>
            <div className="Button_Area">
              <SendButton>전송</SendButton>
            </div>
          </SendContainer>{" "}
        </MobileCardContainer>
        <GoUpContainer onClick={() => arrowUpHandler()}>
          <img src="./images/arrowUp.svg" alt="arrowUp"></img>
          <div>채팅 목록 보러가기</div>
        </GoUpContainer>
      </div>
    </>
  );
}

export default ChatRoom;
