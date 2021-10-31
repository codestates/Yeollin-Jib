import styled from "styled-components";

export const DetailPageContainer = styled.article`
  width: 100%;
  height: 100%;
  font-family: "Gmarket Sans TTF";
  padding-right: 28px;
`;

export const TitleArea = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin-top: 28px;
  padding-left: 28px;
  .Post_Title {
    width: fit-content;
    border-bottom: 5px solid #fede8a;
    font-size: 24px;
    color: #2d2d2d;
    font-weight: 300;
  }
  .Edit_Delete {
    width: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`;

export const LikeAndCommentIconArea = styled.div`
  height: 57px;
  display: flex;
  align-items: center;
  font-weight: 100;
  padding-left: 28px;
  img {
    width: 17px;
    cursor: pointer;
  }
  span {
    margin: 0 18px 0 7px;
  }
`;

export const PostContentsArea = styled.div`
  width: 100%;
  height: 472px;
  display: flex;
  margin-top: 8px;
`;

export const PhotoBox = styled.div`
  display: flex;
  .Photo_Slide_Button {
    width: 20px;
    cursor: pointer;
  }
`;

export const Photo = styled.div`
  img {
    width: 472px;
    margin: 0 8px 0 8px;
  }
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-left: 34px;
`;

export const ContentsUserBox = styled.div`
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e0dde1;
  box-sizing: border-box;
`;

export const TextBox = styled.div`
  min-height: 106px;
  width: 100%;
  color: #2d2d2d;
  font-weight: 100;
  font-size: 16px;
  margin-bottom: 36px;
  .Create_Post_Date {
    font-size: 14px;
    display: flex;
    justify-content: end;
    align-items: center;
    height: 33px;
  }
  .Date {
    margin-left: 11px;
  }
`;

export const Timer = styled.div`
  height: 34px;
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 100;
  .Due_Date_Icon_Box {
    width: 34px;
    height: 34px;
    border-radius: 20px;
    background: #fede8a;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Due_Date_Icon {
    width: 20px;
  }
  .Due_Time {
    color: #2d2d2d;
    margin-left: 9px;
    font-size: 14px;
  }
`;

export const DueDateBox = styled.div`
  width: 100%;
  height: 42px;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 22px 0 19px 0;
  display: flex;
  align-items: center;
  .Due_Date_Word {
    font-weight: 300;
    margin-left: 2.3%;
    margin-right: 2.3%;
  }
  .Due_Date {
    font-weight: 100;
    font-size: 14px;
  }
`;
export const CategoryBox = styled.div`
  width: 100%;
  height: 167px;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
`;

export const MapArea = styled.div``;
export const CommentArea = styled.div`
  padding-left: 28px;
  .Comment_Word {
    width: 100%;
    height: 25px;
  }
  .Comment_Box {
    display: flex;
  }
`;

export const Comment = styled.input`
  width: 100%;
  height: 57px;
  background: #f7f7f8;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  font-size: 14px;
  box-sizing: border-box;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  color: #2d2d2d;
  outline: none;
  padding-left: 17px;
  transition: 0.5s all;
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const SubmitCommentBtn = styled.button`
  width: 109px;
  height: 57px;
  font-size: 1rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  box-sizing: border-box;
  background: #2d2d2d;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  margin-left: 20px;
  :active {
    background: #3f3f3f;
  }
`;
