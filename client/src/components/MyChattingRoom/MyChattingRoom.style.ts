import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border: 0.063rem solid #e0dde1;
  border-radius: 0.313rem;
  width: 100%;
  height: 6rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;
  margin: 0 0 0.813rem 0;
  padding-left: 17px;
  @media screen and (max-width: 37.5rem) {
    width: 100%;
    height: 4rem;
    font-size: 0.9rem;
  }
`;

export const NoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 0.063rem solid #e0dde1;
  border-radius: 0.313rem;
  width: 100%;
  height: 6rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;
  margin: 0 0 0.813rem 0;

  @media screen and (max-width: 37.5rem) {
    width: 100%;
    height: 4rem;
    font-size: 0.9rem;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 37.5rem) {
    width: 90%;
    height: 75px;
  }
`;

export const UserPhotoContainer = styled.img`
  width: 25.94px;
  height: 25.94px;
  border-radius: 50rem;
  margin-right: 7px;
`;

export const UserNickname = styled.div`
  font-weight: 300;
  margin-right: 10px;
  @media screen and (max-width: 37.5rem) {
    font-size: 12px;
  }
`;

export const UserTopContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-bottom: 6px;

  span {
    font-size: 14px;
  }
  @media screen and (max-width: 37.5rem) {
    padding-top: 6px;
    span {
      font-size: 10px;
    }
  }
`;

export const SendButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  img {
    cursor: pointer;
    width: 34px;
    height: 34px;
  }
  @media screen and (max-width: 37.5rem) {
    width: 20%;
    img {
      width: 25px;
      height: 25px;
    }
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 0.875rem;
  flex-direction: row;
  flex: 1;
  padding-top: 3px;

  div {
    /* white-space: nowrap; */
    overflow: hidden;
    text-overflow: ellipsis;
    height: 17px;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 10px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
