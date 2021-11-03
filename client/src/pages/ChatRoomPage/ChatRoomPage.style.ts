import styled from "styled-components";

export const Body = styled.div`
  min-height: 90vh;
  margin-top: 4.938rem;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  display: flex;
  justify-content: center;
  padding: 0 30px 0 30px;

  @media screen and (max-width: 37.5rem) {
    padding: 0 5px 0 5px;
  }
`;
export const ChattingContainer = styled.div`
  margin: 35px 0 35px 0;
  width: 100%;
  @media screen and (max-width: 37.5rem) {
    min-width: 50%;
  }
`;

export const MainArea = styled.main`
  width: 78.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatRoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media screen and (max-width: 37.5rem) {
    display: flex;
    flex-direction: column;
    width: 70%;
  }
  .Mobile_Container {
    display: none;
    @media screen and (max-width: 37.5rem) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-family: "Gmarket Sans TTF";
    }
  }
`;

export const ChatListContainer = styled.div`
  width: 50%;
  min-width: 250px;

  height: 745px;
  margin: 35px 35px 35px 0;
  padding: 0.813rem;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: "Gmarket Sans TTF";
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.5s all;
  @media screen and (max-width: 37.5rem) {
    display: none;
  }
`;

export const ChatListTxt = styled.div`
  display: flex;
  width: 100%;
  padding: 19px 17px 17px 17px;

  span {
    margin-left: 17px;
    font-size: 20px;
    font-weight: 300;
    color: #2d2d2d;
    border-bottom: 5px solid #fede8a;
  }
  @media screen and (max-width: 37.5rem) {
    span {
      margin-left: 0;
      font-size: 16px;
    }
  }
`;

export const NoChatCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.063rem solid #e0dde1;
  border-radius: 0.313rem;
  width: 100%;
  height: 89px;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;

  @media screen and (max-width: 37.5rem) {
    width: 100%;
    height: 75px;
    font-size: 0.9rem;
  }
`;

export const ChatCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.063rem solid #e0dde1;
  border-radius: 0.313rem;
  width: 100%;
  height: 89px;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;
  margin: 0 0 0.813rem 0;
  cursor: pointer;
  :hover {
    background: #fede8a;
  }

  @media screen and (max-width: 37.5rem) {
    width: 100%;
    height: 75px;
    font-size: 0.9rem;
  }
`;

export const NoChatImgContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-wrap: nowrap;
  min-width: 300.43px;
  img {
    width: 100%;
    height: 366.25px;
  }
  @media screen and (max-width: 37.5rem) {
    img {
      width: 300.43px;
      height: auto;
    }
  }
`;

export const NoChatRightContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 300px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 145px 0 0 0;
  @media screen and (max-width: 37.5rem) {
    margin: 46px 0 0 0;
  }
`;

export const GotoMainButton = styled.button`
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  width: 139px;
  height: 40px;
  background: #2d2d2d;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  color: #ffffff;
  border: none;
  transition: 0.5s all;
  :active {
    background: #3f3f3f;
  }
  @media screen and (max-width: 37.5rem) {
    width: 139px;
    height: 35px;
    font-size: 12px;
    transition: 0.5s all;
  }
`;
