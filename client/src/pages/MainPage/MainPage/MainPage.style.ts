import styled from "styled-components";

interface ShowCategory {
  isShowCategory: boolean;
  isTestBoolean?: boolean;
  key?: number;
}

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
  width: 6.75rem;
  background: ${(props) => (props.isShowCategory ? "#fede8a" : "#F7F7F8")};
  border: 1px solid #e0dde1;
  border-radius: 0px 0px 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 4.573%;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: ${(props) => (props.isShowCategory ? "500" : "100")};
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
    @media screen and (max-width: 37.5rem) {
      width: 47px;
      margin: 6px 0 6px 0;
      font-size: 0.5rem;
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
  transition: all 0.3s;
  margin-top: 10px;
  @media screen and (max-width: 37.5rem) {
    margin-top: 6px;
    width: ${(props) => (props.isShowCategory ? "20px" : "0px")};
    height: ${(props) => (props.isShowCategory ? "20px" : "0px")};
  }
  img {
    width: ${(props) => (props.isShowCategory ? "24px" : "0px")};
    height: ${(props) => (props.isShowCategory ? "24px" : "0px")};
    transition: all 0.3s;
    @media screen and (max-width: 37.5rem) {
      width: ${(props) => (props.isShowCategory ? "12px" : "0px")};
      height: ${(props) => (props.isShowCategory ? "12px" : "0px")};
    }
  }
`;

export const CategoryItemsBox = styled.div`
  width: 78.095%;
  margin-top: 1.117%;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 37.5rem) {
    margin: 0.3%;
  }
`;

export const CategoryItem = styled.div<ShowCategory>`
  width: 129px;
  margin-right: 3.556%;
  margin-bottom: 1.727%;
  margin-top: 1.227%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  height: ${(props) => (props.isShowCategory ? "22px" : "0px")};
  visibility: ${(props) => (props.isShowCategory ? "visible" : "hidden")};
  font-weight: ${(props) => (props.isShowCategory ? "500" : "100")};
  color: ${(props) => (props.isShowCategory ? "#2d2d2d" : "#FDFBFE")};
  @media screen and (max-width: 37.5rem) {
    margin-top: 3.727%;
    width: 50px;
  }
  span {
    font-size: 1rem;
    padding-bottom: 3px;
    cursor: pointer;
    height: 22px;
    visibility: ${(props) => (props.isShowCategory ? "visible" : "hidden")};
    box-sizing: border-box;
    :hover {
      border-bottom: 0.313rem solid #fede8a;
    }
    @media screen and (max-width: 37.5rem) {
      height: 11px;
      font-size: 0.5rem;
      padding: 0;
      :hover {
        border-bottom: 0.188rem solid #fede8a;
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
    margin-top: 16px;
  }
`;

export const PostBoardTitleBox = styled.div`
  width: 141px;
  .Post_Title {
    font-size: 24px;
    border-bottom: 0.313rem solid #fede8a;
    margin-left: 4.762%;
    @media screen and (max-width: 37.5rem) {
      border-bottom: 0.188rem solid #fede8a;
      font-size: 20px;
    }
  }
  .Post_Count {
    margin-left: 6.122%;
    font-weight: 100;
    @media screen and (max-width: 37.5rem) {
      font-size: 12px;
    }
  }
`;

export const CreatePostButton = styled.div`
  background: #fede8a;
  width: 46px;
  height: 46px;
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :active {
    background: #ffdb7d;
  }
  @media screen and (max-width: 37.5rem) {
    width: 27px;
    height: 27px;
  }
  span {
    margin-top: 4px;
    font-size: 36px;
    font-weight: 400;
    @media screen and (max-width: 37.5rem) {
      margin-top: 2px;
      font-weight: 500;
      font-size: 24px;
    }
  }
`;

export const PostCardArea = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;
