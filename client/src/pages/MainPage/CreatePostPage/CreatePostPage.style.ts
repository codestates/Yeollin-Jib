import styled from "styled-components";

export const Body = styled.div`
  min-height: 90vh;
  margin-top: 4.938rem;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  display: flex;
  justify-content: center;
  padding: 0 30px 0 30px;

  @media screen and (max-width: 37.5rem) {
    padding: 0 15px 0 15px;
  }
`;

export const MainArea = styled.main`
  max-width: 78.75rem;
  width: 100%;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    margin-left: 7px;
  }
`;

export const TitleDatePickerContainer = styled.div`
  width: 100%;
  margin-top: 37px;
  display: flex;
  @media screen and (max-width: 670px) {
    flex-direction: column;
  }
`;

export const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 18px;
  flex: 1;
  min-width: fit-content;
  .Title_Word {
    display: flex;
    align-items: center;
    margin-left: 7px;
  }
  .Title_Input {
    display: flex;
  }
  span {
    margin-left: 7px;
  }
  @media screen and (max-width: 670px) {
    padding: 0;
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
  width: 100%;
  padding: 0 17px 0 17px;
  margin-bottom: 1.4rem;
  margin-top: 11px;
  /* transition: 0.5s all; */
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const DateArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 18px;
  width: 100%;
  .Date_Word {
    display: flex;
    align-items: center;
    margin-left: 7px;
  }
  .Date_Input {
    display: flex;
    border: 1px solid #e0dde1;
    border-radius: 0.313rem;
    height: 2.938rem;
    margin-top: 11px;
    margin-bottom: 1.4rem;
    width: 100%;
    justify-content: space-between;
  }
  span {
    margin-left: 7px;
    min-width: fit-content;
  }
  @media screen and (max-width: 670px) {
    padding: 0;
  }
`;

export const DatePicker = styled.input`
  outline: none;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  background-color: #fdfbfe;
  border: none;
  font-size: 1rem;
  color: #2d2d2d;
  border-radius: 0.313rem 0 0 0.313rem;
  box-sizing: border-box;
  height: 2.938rem;
  width: 100%;
  padding: 1px 11px 1px 11px;
  /* transition: 0.5s all; */
  border: 1px solid #fdfbfe;
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const TimePicker = styled.input`
  outline: none;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  background-color: #fdfbfe;
  border: none;
  font-size: 1rem;
  color: #2d2d2d;
  border-radius: 0 0.313rem 0.313rem 0;
  box-sizing: border-box;
  height: 2.938rem;
  width: 100%;
  border: 1px solid #fdfbfe;
  padding: 1px 11px 1px 11px;
  /* transition: 0.5s all; */
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const PostContentsArea = styled.div`
  width: 100%;
  .Contents_Word {
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: 7px;
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
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  width: 100%;
  height: 146px;
  padding: 15px 17px 15px 17px;
  margin: 11px 0 1.4rem 0;
  /* transition: 0.5s all; */
  /* overflow-y: hidden; */
  resize: none;
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const PostCategoryArea = styled.div`
  margin-top: 11px;
  .Check_Category_Word_Area {
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: 7px;
  }
  .Category_Word {
    margin-left: 7px;
  }
  .Category_Container {
    width: 100%;
    min-height: 375px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1100px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const PostCategory = styled.div`
  width: 100%;
  min-height: 379px;
  box-sizing: border-box;
  margin-top: 11px;
  display: flex;
  border-radius: 5px;
  max-width: 612px;
`;

export const MainCategoryBox = styled.div`
  width: 119px;
  min-height: 379px;
  background: #f7f7f8;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px 0px 0px 5px;
`;

interface CategorySelect {
  id?: string;
  isSelect?: boolean;
}

export const MainCategoryItem = styled.div<CategorySelect>`
  width: 119px;
  height: 43px;
  background: ${(props) => (props.isSelect ? "#FDFBFE" : "none")};
  border-top: ${(props) =>
    props.isSelect === true
      ? props.id === "1"
        ? "none"
        : props.id === "7"
        ? "none"
        : "1px solid #e0dde1"
      : "none"};
  border-bottom: ${(props) => (props.isSelect ? "1px solid #e0dde1" : "none")};
  border-radius: 5px 0px 0px 5px;
  box-sizing: border-box;
  cursor: pointer;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  text-align: center;
  line-height: 43px;
  @media screen and (max-width: 37.5rem) {
    font-size: 14px;
  }
`;

export const SubCategoryBox = styled.div`
  width: 100%;
  min-height: 379px;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  border-left: none;
  border-radius: 0px 5px 5px 0px;
  box-sizing: border-box;
  padding: 10px 0 10px 42px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

interface SubCategorySelect {
  key: string;
  checked: boolean;
}

export const SubCategoryItem = styled.span<SubCategorySelect>`
  width: 150px;
  height: 25px;
  line-height: 25px;
  margin: 4px 10% 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: "Gmarket Sans TTF";
  color: ${(props) => (props.checked ? "#2d2d2d" : "#C2BFC3")};
  font-weight: ${(props) => (props.checked ? "300" : "100")};
  span {
    margin-left: 10px;
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 14px;
  }
`;

export const UploadPhotoArea = styled.div`
  width: 100%;
  margin-top: 50px;

  .Upload_Word {
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: 7px;
  }
  span {
    margin-left: 7px;
  }
`;

export const PhotoContainer = styled.div`
  display: grid;
  grid-column-gap: 37px;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));

  .Photo_Container {
    position: relative;
    width: 217px;
    height: 217px;
    margin-top: 20px;
  }
  span {
    margin-left: 7px;
  }
  .Photo_Thumb {
    width: 217px;
    height: 217px;
    position: absolute;
    box-sizing: border-box;
    border-radius: 7px;
  }
  .Delete {
    width: 20px;
    height: 20px;
    background-color: #fede8a;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    font-size: 18px;
    z-index: 3;
    cursor: pointer;
    right: 0;
    margin-top: 5px;
    margin-right: 5px;
    opacity: 0.95;
    img {
      width: 12px;
    }
  }

  @media screen and (max-width: 37.5rem) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const AddressArea = styled.div`
  margin-top: 62px;
  width: 100%;
  .Address_Word {
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: 7px;
  }
  .Search_Address_Box {
    display: flex;
    align-items: center;
    margin-top: 11px;
    width: 100%;
    margin-bottom: 30px;
  }
  span {
    margin-left: 7px;
  }
  button {
    width: 105px;
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
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  width: 100%;
  height: 47px;
  padding: 0 17px 0 17px;
  /* transition: 0.5s all; */
  :focus {
    border: 1px solid #2d2d2d;
  }
`;

export const SubmitArea = styled.div`
  height: 50px;
  width: 100%;
  margin: 10px 0 369px 0;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 37.5rem) {
    margin: 40px 0 40px 0;
  }
`;

export const SubmitBtn = styled.button`
  width: 95px;
  height: 47px;
  font-size: 1rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  box-sizing: border-box;
  background: #2d2d2d;
  border-radius: 5px;
  border: none;
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
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  box-sizing: border-box;
  background: linear-gradient(0deg, #fdfbfe, #fdfbfe), #fbfbfb;
  border-radius: 5px;
  border: 0.063rem solid #2d2d2d;
  color: #2d2d2d;
  cursor: pointer;
  margin-left: 10px;
  :active {
    background: #f5f4f5;
  }
`;

export const InvalidMessage = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 100;
  font-size: 1rem;
  color: #f44336;
  margin: 50px 0 20px 0;
  transition: 0.5s all;
  height: 16px;
  img {
    margin-right: 3px;
    padding-top: 2px;
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s all;
    margin: 5px 0 10px 0;
    img {
      width: 12px;
      height: 12px;
      padding-top: 1px;
    }
  }
`;
