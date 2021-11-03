import React from "react";
import { Link } from "react-router-dom";
import {
  ChatListContainer,
  ChatListTxt,
  ChatCard,
  NoChatCard,
  NoChatImgContainer,
  NoChatRightContainer,
  ChatRoomContainer,
  GotoMainButton,
  Body,
  MainArea,
  ChattingContainer,
} from "./ChatRoomPage.style";
import NoChat from "../../components/NoChat/NoChat";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import MyChattingRoom from "../../components/MyChattingRoom/MyChattingRoom";
function ChatRoomPage() {
  return (
    <Body>
      <MainArea>
        <ChatRoomContainer>
          {/* PC 버젼 -- 모바일 버젼은 display: none .*/}
          <ChatListContainer>
            <ChatListTxt>
              <span>채팅 목록</span>
            </ChatListTxt>
            {/* when there are chats */}
            <ChatCard>
              <MyChattingRoom></MyChattingRoom>
            </ChatCard>
            <ChatCard>
              <MyChattingRoom></MyChattingRoom>
            </ChatCard>
            <ChatCard>
              <MyChattingRoom></MyChattingRoom>
            </ChatCard>
          </ChatListContainer>
          {/* 모바일 버젼 -- PC 버젼은 display: none*/}
          <div className="Mobile_Container">
            <ChatListTxt>
              <span>채팅 목록</span>
            </ChatListTxt>
            <ChatCard>
              <MyChattingRoom></MyChattingRoom>
            </ChatCard>
            <ChatCard>
              <MyChattingRoom></MyChattingRoom>
            </ChatCard>
            <ChatCard>
              <MyChattingRoom></MyChattingRoom>
            </ChatCard>
          </div>
          <ChattingContainer>
            <ChatRoom></ChatRoom>
          </ChattingContainer>
        </ChatRoomContainer>
      </MainArea>
    </Body>
  );
}

export default ChatRoomPage;
