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
    width: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`;

export const CommentUserPhoto = styled.div`
  width: 25.94px;
  height: 25.94px;
  border-radius: 20px;
  box-sizing: border-box;
  background: #e0dde1;
  border: 1px solid #e0dde1;
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