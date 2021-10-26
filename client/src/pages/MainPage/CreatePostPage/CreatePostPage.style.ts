import styled from "styled-components";

export const CreatePostContainer = styled.article`
  min-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Gmarket Sans TTF";
  font-weight: 300;
  margin-top: 30px;
  .Create_Post_Word {
    width: fit-content;
    font-size: 24px;
    line-height: 24px;
    color: #2d2d2d;
    border-bottom: 5px solid #fede8a;
  }
`;

export const TitleDatePickerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 37px;
  width: 100%;
  .Title_Word {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 7px;
  }
`;

export const DateArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 37px;
  width: 100%;
  .Date_Word {
    display: flex;
    align-items: center;
  }
  .Date_Input {
    display: flex;
    justify-content: end;
  }
  span {
    margin-left: 7px;
  }
`;

export const InputTitle = styled.input`
  outline: none;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  height: 2.938rem;
  width: 96%;
  margin-bottom: 1.4rem;
  margin-top: 11px;
  transition: 0.5s all;
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const DatePiker = styled.input`
  outline: none;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  height: 2.938rem;
  width: 96%;
  margin-bottom: 1.4rem;
  margin-top: 11px;
  transition: 0.5s all;
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const PostContentsArea = styled.div`
  min-height: 9.125rem;
  .Contents_Word {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 7px;
  }
`;

export const PostContents = styled.textarea`
  outline: none;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 0.313rem;
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  width: 100%;
  padding: 0;
  min-height: 9.125rem;
  margin: 11px 0 1.4rem 0;
  transition: 0.5s all;
  overflow-y: hidden;
  resize: none;
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const PostCategoryArea = styled.div`
  .Check_Category_Word {
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 11px;
  }
  span {
    margin-left: 7px;
  }
  .Category_Container {
    display: flex;
    justify-content: space-between;
  }
`;

export const PostCategory = styled.div`
  height: 379px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 11px;
  display: flex;
`;

export const MainCategoryBox = styled.div`
  width: 129px;
  height: 379px;
  background: #f7f7f8;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px 0px 0px 5px;
`;

interface CategorySelect {
  isSelect?: boolean;
}

export const MainCategoryItem = styled.div<CategorySelect>`
  width: 129px;
  height: 43px;
  background: ${(props) => (props.isSelect ? "#FDFBFE" : "none")};
  border-top: ${(props) => (props.isSelect ? "1px solid #e0dde1" : "none")};
  border-bottom: ${(props) => (props.isSelect ? "1px solid #e0dde1" : "none")};
  border-radius: 5px 0px 0px 5px;
  z-index: 1;
  box-sizing: content-box;
`;

export const SubCategoryBox = styled.div`
  width: 483px;
  height: 379px;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  border-left: none;
  border-radius: 0px 5px 5px 0px;
  box-sizing: border-box;
  padding-left: 42px;
`;

export const SubCategoryItem = styled.div`
  width: 150px;
  height: 25px;
`;

export const UploadPhotoArea = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .Upload_Word {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .Photo_Container {
    position: relative;
    width: 217px;
    height: 217px;
    margin-top: 20px;
  }
  span {
    margin-left: 7px;
  }
`;

export const AddressArea = styled.div`
  margin-top: 62px;
  width: 100%;
  .Address_Word {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .Search_Address_Box {
    display: flex;
    align-items: center;
    margin-top: 11px;
  }
  span {
    margin-left: 7px;
  }
  button {
    width: 97px;
    height: 47px;
    background: #2d2d2d;
    border-radius: 5px;
    border: none;
    font-family: "Gmarket Sans TTF";
    font-weight: 100;
    color: #ffffff;
    cursor: pointer;
    margin-left: 10px;
    :active {
      background: #3f3f3f;
    }
  }
`;

export const InputAddress = styled.input`
  outline: none;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  width: 100%;
  height: 47px;
  transition: 0.5s all;
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const SubmitArea = styled.div`
  height: 50px;
  width: 100%;
  margin: 100px 0 369px 0;
  display: flex;
  justify-content: center;
`;

export const SubmitBtn = styled.button`
  width: 95px;
  height: 47px;
  font-size: 1rem;
  font-weight: 100;
  box-sizing: border-box;
  background: #2d2d2d;
  border-radius: 5px;
  border: none;
  font-family: "Gmarket Sans TTF";
  color: #ffffff;
  cursor: pointer;
  margin-left: 10px;
  :active {
    background: #3f3f3f;
  }
`;

export const CancelBtn = styled.button`
  width: 95px;
  height: 47px;
  font-size: 1rem;
  font-weight: 100;
  box-sizing: border-box;
  background: linear-gradient(0deg, #fdfbfe, #fdfbfe), #fbfbfb;
  border-radius: 5px;
  border: 0.063rem solid #2d2d2d;
  font-family: "Gmarket Sans TTF";
  color: #2d2d2d;
  cursor: pointer;
  margin-left: 10px;
  :active {
    background: #f5f4f5;
  }
`;
