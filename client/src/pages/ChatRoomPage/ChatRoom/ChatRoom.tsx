import React, { useState } from "react";
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
import DeleteChat from "../../../components/Modals/DeleteChat/DeleteChat";

function ChatRoom() {
  // 채팅방 삭제 모달 상태
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const arrowUpHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <CardContainer>
        {isOpened ? (
          <DeleteChat
            setIsOpened={(bool: boolean) => setIsOpened(bool)}
          ></DeleteChat>
        ) : null}
        <TopContainer>
          <ChatListTxt padding={"pc"}>
            <span className="Chat_List">황마리모님과의 채팅</span>
            <DeleteImg onClick={() => setIsOpened(true)}>
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
              <UserMsg></UserMsg>
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
          <form className="chat-form">
            <div className="Input_Area">
              <InputContainer></InputContainer>
              <div className="Add_File">
                <input className="Input_File" type="file" title="" />
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  cursor="pointer"
                >
                  <path d="M4 5.45557H17V12.4556H19V5.45557C19 4.35257 18.103 3.45557 17 3.45557H4C2.897 3.45557 2 4.35257 2 5.45557V17.4556C2 18.5586 2.897 19.4556 4 19.4556H12V17.4556H4V5.45557Z" />
                  <path d="M8 11.4556L5 15.4556H16L12 9.45557L9 13.4556L8 11.4556Z" />
                  <path d="M19 14.4556H17V17.4556H14V19.4556H17V22.4556H19V19.4556H22V17.4556H19V14.4556Z" />
                </svg>
              </div>
            </div>
            <div className="Button_Area">
              <SendButton type="submit">전송</SendButton>
            </div>{" "}
          </form>
        </SendContainer>
      </CardContainer>
      <div className="Mobile_Container">
        <TopContainer>
          {isOpened ? (
            <DeleteChat
              setIsOpened={(bool: boolean) => setIsOpened(bool)}
            ></DeleteChat>
          ) : null}
          <ChatListTxt padding={"mobile"}>
            <span className="Chat_List">황마리모님과의 채팅</span>
            <DeleteImg onClick={() => setIsOpened(true)}>
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
