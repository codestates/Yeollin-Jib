import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
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
  PreviousContainer,
  ArrowContainer,
  ChatContainer,
  MobilePreviousContainer,
} from "./ChatRoomPage.style";
import NoChat from "./NoChat/NoChat";
import ChatRoom from "./ChatRoom/ChatRoom";
import ChatList from "./ChatList/ChatList";
function ChatRoomPage() {
  const { isLogin } = useSelector((state: RootState) => state.authReducer);
  const [clicked, setClicked] = useState(false);

  const clickHandle = (e: any) => {
    setClicked(true);
  };

  const mobileClickHandle = (e: any) => {
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
        {!isLogin ? (
          <Redirect to="/main"></Redirect>
        ) : (
          <ChatRoomContainer>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <PreviousContainer>
                <ArrowContainer>
                  <img
                    src="./images/arrowLeft_chat.svg"
                    alt="previousPage_Icon"
                  ></img>
                </ArrowContainer>
                <span>뒤로가기</span>
              </PreviousContainer>
            </Link>
            {chat.length !== 0 ? (
              <ChatContainer>
                <ChatListContainer>
                  <ChatListTxt>
                    <span className="Chat_List">채팅 목록</span>
                  </ChatListTxt>
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
                      <div>
                        게시글의 채팅 아이콘을 눌러 대화를 시작해주세요.
                      </div>
                    </SecondTxt>
                  </ClickTxtContainer>
                  <ImgContainer>
                    <img src="./images/selectChat.svg" alt="select_chat"></img>
                  </ImgContainer>
                </ClickChatContainer>
                {/* ================== 모바일 컨테이너 */}
                <div className="Mobile_Container">
                  <ChatListTxt>
                    <span className="Chat_List">채팅 목록</span>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <MobilePreviousContainer>
                        <ArrowContainer>
                          <img
                            src="./images/arrowLeft_chat.svg"
                            alt="previousPage_Icon"
                          ></img>
                        </ArrowContainer>
                        <span>뒤로가기</span>
                      </MobilePreviousContainer>
                    </Link>
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
                {/* ================== 모바일 컨테이너 */}
                {clicked ? (
                  <ChattingContainer>
                    <ChatRoom></ChatRoom>
                  </ChattingContainer>
                ) : null}
              </ChatContainer>
            ) : (
              <NoChat></NoChat>
            )}
          </ChatRoomContainer>
        )}
      </MainArea>
    </Body>
  );
}

export default ChatRoomPage;
