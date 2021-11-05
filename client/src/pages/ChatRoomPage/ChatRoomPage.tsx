import React from "react";
import { useState } from "react";
import {
  ChatListContainer,
  ChatListTxt,
  ChatCard,
  ChatRoomContainer,
  Body,
  MainArea,
  ChattingContainer,
  ClickChatContainer,
  ClickTxtContainer,
  ImgContainer,
  FirstTxt,
  SecondTxt,
} from "./ChatRoomPage.style";
import NoChat from "./NoChat/NoChat";
import ChatRoom from "./ChatRoom/ChatRoom";
import ChatList from "./ChatList/ChatList";
function ChatRoomPage() {
  const [clicked, setClicked] = useState(false);
  const clickHandle = (e: any) => {
    console.log(e.currentTarget.id);
    setClicked(true);
  };

  const mobileClickHandle = (e: any) => {
    console.log(e.currentTarget.id);
    setClicked(true);
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const chat = [2];
  return (
    <Body>
      <MainArea>
        <ChatRoomContainer>
          {chat.length !== 0 ? (
            <>
              <ChatListContainer>
                <ChatListTxt>
                  <span>채팅 목록</span>
                </ChatListTxt>
                {/* when there are chats */}
                <ChatCard id="1" onClick={(e) => clickHandle(e)}>
                  <ChatList></ChatList>
                </ChatCard>
                <ChatCard id="2" onClick={(e) => clickHandle(e)}>
                  <ChatList></ChatList>
                </ChatCard>
                <ChatCard id="3" onClick={(e) => clickHandle(e)}>
                  <ChatList></ChatList>
                </ChatCard>
              </ChatListContainer>
              <ClickChatContainer clicked={!clicked}>
                <ClickTxtContainer>
                  <FirstTxt>대화 하고 싶은 채팅방을 클릭하세요</FirstTxt>
                  <SecondTxt>
                    <div>새로 대화하고 싶은 유저가 있다면,</div>
                    <div>게시글의 채팅 아이콘을 눌러 대화를 시작해주세요.</div>
                  </SecondTxt>
                </ClickTxtContainer>
                <ImgContainer>
                  <img src="./images/selectChat.svg" alt="select_chat"></img>
                </ImgContainer>
              </ClickChatContainer>
              <div className="Mobile_Container">
                <ChatListTxt>
                  <span>채팅 목록</span>
                </ChatListTxt>
                <ChatCard id="1" onClick={(e) => mobileClickHandle(e)}>
                  <ChatList></ChatList>
                </ChatCard>
                <ChatCard id="2" onClick={(e) => mobileClickHandle(e)}>
                  <ChatList></ChatList>
                </ChatCard>
                <ChatCard id="3" onClick={(e) => mobileClickHandle(e)}>
                  <ChatList></ChatList>
                </ChatCard>
              </div>
              {clicked ? (
                <ChattingContainer>
                  <ChatRoom></ChatRoom>
                </ChattingContainer>
              ) : null}
            </>
          ) : (
            <NoChat></NoChat>
          )}
        </ChatRoomContainer>
      </MainArea>
    </Body>
  );
}

export default ChatRoomPage;
