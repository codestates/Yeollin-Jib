import styled from "styled-components";

export const CardContainer = styled.div`
  flex-direction: column;
  box-sizing: border-box;
  border: 0.063rem solid #e0dde1;
  border-radius: 0.313rem;
  width: 100%;
  min-width: 200px;
  flex-wrap: wrap;
  height: auto;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;
  padding: 17px;

  @media screen and (max-width: 700px) {
    display: none;
    width: 100%;
    height: auto;
    font-size: 0.9rem;
  }
`;
export const MobileCardContainer = styled.div`
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  border: 0.063rem solid #e0dde1;
  border-radius: 0.313rem;
  width: 100%;
  min-width: 200px;
  flex-wrap: wrap;
  height: auto;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;
  margin: 0 0 0.813rem 0;
  padding: 17px;

  @media screen and (max-width: 700px) {
    width: 100%;
    height: auto;
    font-size: 0.9rem;
  }
  .Mobile_Container {
    display: none;
    @media screen and (max-width: 700px) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-family: "Gmarket Sans TTF";
    }
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 6px;
  @media screen and (max-width: 37.5rem) {
    width: 80%;
    margin-bottom: 6px;
  }
`;

export const UserMsgTime = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const UserPhotoContainer = styled.img`
  width: 25.94px;
  height: 25.94px;
  border-radius: 50rem;
  margin: 0 7px 0 2px;
  @media screen and (max-width: 37.5rem) {
  }
`;

export const UserNickname = styled.div`
  font-weight: 300;
  font-size: 16px;
  margin-right: 10px;
  @media screen and (max-width: 37.5rem) {
    font-size: 12px;
  }
`;

export const UserChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const UserMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 10px;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 14px;

  @media screen and (max-width: 37.5rem) {
    font-size: 10px;
  }
`;

export const UserTime = styled.span`
  font-size: 14px;
  margin: 0 9px 0 9px;
  @media screen and (max-width: 37.5rem) {
    font-size: 10px;
  }
`;

export const MyMsg = styled.div`
  width: auto;
  height: auto;
  padding: 10px;
  font-size: 14px;
  background: #fede8a;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 37.5rem) {
    font-size: 10px;
  }
`;
export const MyChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  padding: 20px 0 20px 0;
`;
export const SendContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .Button_Area {
    width: 70px;
    margin-left: 12px;
  }
  .Input_Area {
    width: 100%;
  }
  @media screen and (max-width: 37.5rem) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .Button_Area {
      width: 45px;
      margin-left: 10px;
    }
  }
`;

export const InputContainer = styled.input`
  width: 100%;
  height: 44px;
  background: #f7f7f8;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 0.9rem;
  padding-left: 0.5rem;
  color: #2d2d2d;
  :focus {
    outline: 1px solid #2d2d2d;
  }
  @media screen and (max-width: 37.5rem) {
    height: 35px;
  }
`;

export const SendButton = styled.button`
  width: 67px;
  height: 44px;
  background: #2d2d2d;
  border-radius: 5px;
  color: #ffffff;
  border-style: none;
  cursor: pointer;
  font-family: "Gmarket Sans TTF";
  font-weight: 200;
  :active {
    background: #3f3f3f;
  }
  @media screen and (max-width: 37.5rem) {
    width: 43px;
    height: 35px;
  }
`;
export const ChatListTxt = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  margin: 10px 0 20px 0;
  justify-content: space-between;
  span {
    border-bottom: 5px solid #fede8a;
    font-size: 20px;
    font-weight: 300;
    color: #2d2d2d;
  }
  @media screen and (max-width: 37.5rem) {
    span {
      font-size: 16px;
      display: flex;
      align-items: flex-start;
    }
  }
`;

export const AllChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DeleteImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: #fede8a;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 17px;
    height: 17px;
  }

  @media screen and (max-width: 37.5rem) {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    img {
      width: 11px;
      height: 11px;
    }
  }
`;

export const TopContainer = styled.div`
  width: 100%;
  @media screen and (max-width: 37.5rem) {
    width: 100%;
  }
`;

export const GoUpContainer = styled.div`
  display: none;
  @media screen and (max-width: 700px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 33px;
    align-items: center;
    font-size: 10px;
    font-weight: 100;
    cursor: pointer;
    div {
      margin-top: 5px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
