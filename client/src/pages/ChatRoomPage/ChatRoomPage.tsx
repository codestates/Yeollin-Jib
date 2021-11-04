import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ChatListContainer,
  ChatListTxt,
  ChatCard,
  ChatRoomContainer,
  Body,
  MainArea,
  ChattingContainer,
} from "./ChatRoomPage.style";
import NoChat from "../../components/NoChat/NoChat";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import ChatList from "../../components/ChatList/ChatList";
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

  const chat = [];
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
