import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border: 0.063rem solid #e0dde1;
  border-radius: 0.313rem;
  width: 100%;
  height: 528px;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;
  margin: 0 0 0.813rem 0;
  padding: 17px;
  @media screen and (max-width: 37.5rem) {
    width: 100%;
    height: 392px;
    font-size: 0.9rem;
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
  width: auto;
  height: auto;
  padding: 10px;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
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
