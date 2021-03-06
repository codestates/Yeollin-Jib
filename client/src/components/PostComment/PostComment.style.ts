import styled from "styled-components";

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 96px;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 43px;
  .Comment_Contents {
    width: 100%;
    color: #2d2d2d;
    font-weight: 100;
    font-size: 14px;
    padding-left: 7px;
    min-height: 33px;
    overflow-wrap: break-word;
    display: inline-flex;
    align-items: center;
  }
  @media screen and (max-width: 37.5rem) {
    min-height: 67px;
    margin-bottom: 34px;

    .Comment_Contents {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 375px) {
    padding: 0.5rem;
    margin-bottom: 20px;

    .Comment_Contents {
      font-size: 12px;
      padding-left: 0;
    }
  }
`;

export const CommentUserContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: #2d2d2d;
  box-sizing: border-box;
  margin-bottom: 16px;
  .Comment_User_Name {
    font-weight: 300;
    margin: 0 14px 0 7px;
  }
  .Comment_Date {
    font-weight: 100;
    font-size: 12px;
  }
  .Edit_Delete {
    width: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  @media screen and (max-width: 37.5rem) {
    .Comment_User_Name {
      font-size: 14px;
    }
    .Comment_Date {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 375px) {
    .Comment_User_Name {
      font-size: 12px;
    }
    .Comment_Date {
      font-size: 10px;
    }
    .Edit_Delete {
      width: 30px;
      svg {
        width: 12px;
      }
    }
  }
`;

export const CommentUserPhoto = styled.div`
  width: 25.94px;
  height: 25.94px;
  border-radius: 20px;

  img {
    width: 23.94px;
    height: 23.94px;
    border-radius: 20px;
    box-sizing: border-box;
  }
`;

export const CommentUserAndDate = styled.div`
  display: flex;
  align-items: center;
  span {
  }
`;

export const EditContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const EditInput = styled.input`
  width: 100%;
  height: 33px;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  padding-left: 10px;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  outline: none;
`;

export const SubmitButton = styled.button`
  width: 81px;
  height: 33px;
  color: #ffffff;
  background: #2d2d2d;
  border-style: none;
  border-radius: 5px;
  margin-left: 7px;
  cursor: pointer;
  :active {
    background: #3f3f3f;
  }
`;
