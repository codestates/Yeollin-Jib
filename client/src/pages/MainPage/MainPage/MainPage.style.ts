import styled from "styled-components";

interface ShowCategory {
  isShowCategory: boolean;
  isSelect?: boolean;
}

export const Body = styled.div`
  min-height: 90vh;
  margin-top: 4.938rem;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  display: flex;
  justify-content: center;
  padding: 0 30px 0 30px;

  @media screen and (max-width: 37.5rem) {
    padding: 0 5px 0 5px;
  }
`;

export const MainArea = styled.main`
  width: 78.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainPageContainer = styled.div`
  min-height: 90vh;
  width: 100%;
  color: #2d2d2d;
  font-family: "Gmarket Sans TTF";
  @media screen and (max-width: 37.5rem) {
    margin: 0 1.313rem 0 1.313rem;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
`;

export const CategoryMenu = styled.div<ShowCategory>`
  position: absolute;
  width: 6.75rem;
  background: ${(props) => (props.isShowCategory ? "#fede8a" : "#F7F7F8")};
  border: 1px solid #e0dde1;
  border-radius: 0px 0px 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: ${(props) => (props.isShowCategory ? "300" : "100")};
  :active {
    background: #ffdb7d;
  }
  @media screen and (max-width: 37.5rem) {
    width: 49px;
    border-radius: 0px 0px 10px 10px;
  }
  span {
    width: 91px;
    margin: 10px 0 10px 0;
    font-size: 1rem;
    text-align: center;
    font-family: "Gmarket Sans TTF";
    font-weight: 100;
    @media screen and (max-width: 37.5rem) {
      width: 47px;
      margin: 6px 0 6px 0;
      font-size: 0.5rem;
      font-weight: 100;
    }
  }
`;

export const CategoryMenuCircle = styled.div<ShowCategory>`
  width: ${(props) => (props.isShowCategory ? "38px" : "0px")};
  height: ${(props) => (props.isShowCategory ? "38px" : "0px")};
  background: #fbfafc;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 19px;
  visibility: ${(props) => (props.isShowCategory ? "visible" : "hidden")};
  margin-top: 6px;
  transition: 0.3s height;
  @media screen and (max-width: 37.5rem) {
    margin-top: 3px;
    width: ${(props) => (props.isShowCategory ? "20px" : "0px")};
    height: ${(props) => (props.isShowCategory ? "20px" : "0px")};
  }
  img {
    width: ${(props) => (props.isShowCategory ? "24px" : "0px")};
    height: ${(props) => (props.isShowCategory ? "24px" : "0px")};
    transition: 0.3s width;
    @media screen and (max-width: 37.5rem) {
      width: ${(props) => (props.isShowCategory ? "12px" : "0px")};
      height: ${(props) => (props.isShowCategory ? "12px" : "0px")};
      transition: 0.3s width;
    }
  }
`;

export const CategoryItemsBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 120px;
  @media screen and (max-width: 37.5rem) {
    margin-left: 60px;
  }
`;

export const CategoryItem = styled.div<ShowCategory>`
  width: 129px;
  margin: 0 5px 0 5px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.isShowCategory ? "22px" : "0px")};
  visibility: ${(props) => (props.isShowCategory ? "visible" : "hidden")};
  color: ${(props) => (props.isShowCategory ? "#2d2d2d" : "#FDFBFE")};
  transition: 0.3s height;
  @media screen and (max-width: 37.5rem) {
    height: ${(props) => (props.isShowCategory ? "14px" : "0px")};
    width: 60px;
    margin: 8px 10px 3px 10px;
  }
  span {
    font-size: 1rem;
    cursor: pointer;
    height: 22px;
    visibility: ${(props) => (props.isShowCategory ? "visible" : "hidden")};
    box-sizing: border-box;
    font-family: "Gmarket Sans TTF";
    font-weight: ${(props) => (props.isSelect ? "300" : "100")};
    border-bottom: ${(props) =>
      props.isSelect ? "0.313rem solid #fede8a" : "none"};
    :hover {
      border-bottom: 0.313rem solid #fede8a;
    }
    @media screen and (max-width: 37.5rem) {
      height: ${(props) => (props.isShowCategory ? "13px" : "0px")};
      font-size: 0.5rem;
      padding: 0;
      :hover {
        border-bottom: 0.313rem solid #fede8a;
      }
    }
  }
`;

export const PostBoardTitleContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 26px;
  @media screen and (max-width: 37.5rem) {
    height: 31px;
    margin-top: 15px;
  }
`;

export const PostBoardTitleBox = styled.div`
  width: 145px;
  margin-left: 0.1rem;
  .Post_Title {
    font-size: 24px;
    border-bottom: 0.313rem solid #fede8a;
    font-weight: 300;
    @media screen and (max-width: 37.5rem) {
      border-bottom: 0.313rem solid #fede8a;
      font-size: 20px;
    }
  }
  .Post_Count {
    margin-left: 0.65rem;
    font-weight: 100;
    @media screen and (max-width: 37.5rem) {
      font-size: 12px;
    }
  }
`;

export const CreatePostButton = styled.div`
  box-sizing: border-box;
  background: #fede8a;
  width: 46px;
  height: 46px;
  line-height: 46px;
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 2px 0 0 1px;
  :active {
    background: #ffdb7d;
  }
  @media screen and (max-width: 37.5rem) {
    box-sizing: border-box;
    width: 27px;
    height: 27px;
    padding: 1px 0 0 1px;
  }
  .Redirect_Createpost {
    font-size: 36px;
    font-weight: 100;
    @media screen and (max-width: 37.5rem) {
      font-size: 24px;
    }
  }
`;

export const PostCardArea = styled.div`
  height: 100%;
  display: grid;
  grid-row-gap: 0px;
  grid-column-gap: 33px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  transition: all 0.3s;

  @media screen and (max-width: 37.5rem) {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
  }
`;

export const BlankPostCard = styled.div`
  width: 287px;
  height: 442px;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 100;
  margin-top: 1.063rem;
`;
