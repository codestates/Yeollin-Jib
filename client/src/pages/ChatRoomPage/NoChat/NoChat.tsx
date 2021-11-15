import React from "react";
import { Link } from "react-router-dom";
import {
  ChatListTxt,
  NoChatCard,
  NoChatImgContainer,
  NoChatRightContainer,
  GotoMainButton,
} from "../ChatRoomPage.style";

import { ChatListContainer } from "./NoChat.style";
function NoChat() {
  return (
    <>
      <ChatListContainer>
        <ChatListTxt>
          <span>채팅 목록</span>
        </ChatListTxt>{" "}
        <NoChatCard>
          <div>진행중인 채팅이 없습니다.</div>
        </NoChatCard>
      </ChatListContainer>
      <div className="Mobile_Container">
        <ChatListTxt>
          <span>채팅 목록</span>
        </ChatListTxt>{" "}
        <NoChatCard>
          <div>진행중인</div>
          <div>채팅이 없습니다.</div>
        </NoChatCard>
      </div>
      <NoChatRightContainer>
        <NoChatImgContainer>
          <img src="./images/landing1.svg" alt="landingpage_img1"></img>
        </NoChatImgContainer>
        <Link to="/main">
          <GotoMainButton>열린집 보러가기</GotoMainButton>
        </Link>
      </NoChatRightContainer>
    </>
  );
}

export default NoChat;
