import styled from "styled-components";

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

export const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 0.875rem;
  flex-direction: row;
  flex: 1;
  padding-top: 3px;

  div {
    white-space: nowrap;
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
