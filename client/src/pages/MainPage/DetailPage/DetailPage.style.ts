import styled from "styled-components";

export const Body = styled.div`
  min-height: 90vh;
  margin-top: 4.938rem;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  display: flex;
  justify-content: center;
  padding: 0 30px 0 30px;
`;

export const MainArea = styled.main`
  max-width: 78.75rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
  }
`;

export const DetailPageContainer = styled.article`
  width: 100%;
  height: 100%;
  font-family: "Gmarket Sans TTF";
  padding-right: 28px;
  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
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
  @media screen and (max-width: 950px) {
    padding: 0 18px 5px 8px;
    .Post_Title {
      font-size: 18px;
    }
    span {
    }
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
  @media screen and (max-width: 950px) {
    padding-left: 8px;
    svg {
      width: 14px;
      height: 13px;
    }
    span {
      font-size: 12px;
    }
  }
`;

export const PostContentsArea = styled.div`
  width: 100%;
  height: 472px;
  display: flex;
  margin-top: 8px;
  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export const PhotoBox = styled.div`
  display: flex;
  .Photo_Slide_Button {
    width: 20px;
    cursor: pointer;
  }
  @media screen and (max-width: 950px) {
    justify-content: center;

    .Photo_Slide_Button {
    }
  }
`;

export const Photo = styled.div`
  img {
    width: 472px;
    height: 472px;
    margin: 0 8px 0 8px;
  }

  @media screen and (max-width: 950px) {
    justify-content: center;
    img {
      width: 308px;
      height: 308px;
      margin: 0;
    }
  }
  @media screen and (max-width: 320px) {
    img {
      width: 250px;
      height: 250px;
    }
  }
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-left: 34px;
  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 34px 0 0 0;
  }
`;

export const ContentsUserBox = styled.div`
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e0dde1;
  box-sizing: border-box;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
`;

export const UserProfileBox = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  margin-bottom: 10px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 20px;
    margin-right: 8px;
  }
  @media screen and (max-width: 950px) {
    width: 200px;
  }
`;

export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  color: #2d2d2d;
  font-size: 14px;
  .User_Name {
    font-weight: 300;
    width: 200px;
  }
  .User_Email {
    width: 200px;
  }
  @media screen and (max-width: 950px) {
    width: 200px;
  }
  @media screen and (max-width: 414px) {
    .User_Email {
      font-size: 10px;
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
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
  @media screen and (max-width: 950px) {
    font-size: 14px;
    min-height: 50px;
    width: 100%;
    .Date {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 375px) {
    font-size: 14px;
    .Create_Post_Date {
      font-size: 10px;
    }
    .Date {
      font-size: 10px;
    }
  }
`;

export const TimerArea = styled.div`
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
  @media screen and (max-width: 950px) {
    .Due_Date {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 375px) {
    .Due_Date_Word {
      font-size: 14px;
    }
    .Due_Date {
      font-size: 10px;
    }
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
  @media screen and (max-width: 950px) {
    width: 63px;
    height: 45px;
    font-size: 12px;
    margin-left: 10px;
  }
`;

export const ChatBox = styled.div`
  display: flex;
  align-items: center;
  font-weight: 100;
  font-size: 14px;
  color: #2d2d2d;
  cursor: pointer;
  margin-bottom: 10px;
  span {
    margin-left: 8px;
  }
  @media screen and (max-width: 1070px) {
    span {
      display: none;
    }
  }
`;

export const ChatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 37px;
  background: #fede8a;
  border-radius: 50%;
  img {
    margin-left: 5px;
    width: 20px;
    height: 20px;
  }
`;

export const AddressArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 300;
  font-size: 16px;
  margin: 58px 0 15px 0;
  .Address_Title {
    margin-left: 11px;
  }
  .Address {
    font-weight: 100;
    font-size: 14px;
    margin-left: 11px;
  }
  @media screen and (max-width: 375px) {
    .Address_Title {
      font-size: 14px;
    }
    .Address {
      font-size: 10px;
    }
  }
`;

export const AddressIcon = styled.div`
  width: 13px;
  height: 16px;
`;

export const CommentArea = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 28px;
  .Comment_Box {
    display: flex;
    justify-content: space-between;
  }
  @media screen and (max-width: 950px) {
    padding: 0;
  }
`;

export const CommentWordArea = styled.div`
  display: flex;
  align-items: center;
  margin: 58px 0 15px 0;
  .Comment_Word {
    font-weight: 100;
    margin-left: 7px;
  }
  img {
    width: 24px;
  }
  @media screen and (max-width: 950px) {
    font-size: 16px;
  }
  @media screen and (max-width: 375px) {
    font-size: 14px;
    margin: 30px 0 10px 0;
    img {
      width: 20px;
    }
  }
`;

export const CommentInput = styled.input`
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
  @media screen and (max-width: 950px) {
    width: 100%;
    height: auto;
  }
`;

export const CommentList = styled.div`
  margin: 32px 0 18px 0;
  padding-right: 28px;
  height: auto;
  width: 100%;
  @media screen and (max-width: 950px) {
    padding: 0;
  }
`;
