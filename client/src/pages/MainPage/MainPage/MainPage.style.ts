import styled from "styled-components";

interface ShowCategory {
  isShowCategory: boolean;
  key?: number;
}

interface Index {
  id: string;
}

export const MainPageContainer = styled.div`
  height: 100%;
  width: 100%;
  color: #2d2d2d;
  @media screen and (max-width: 37.5rem) {
    margin: 0 21px 0 21px;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
`;

export const CategoryMenu = styled.div<ShowCategory>`
  width: 108px;
  background: ${(props) => (props.isShowCategory ? "#fede8a" : "#E0DDE1")};
  border-radius: 0px 0px 20px 20px;
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
    margin-top: 8px;
    font-size: 1rem;
    text-align: center;
    @media screen and (max-width: 37.5rem) {
      width: 47px;
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
  @media screen and (max-width: 37.5rem) {
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
  height: ${(props) => (props.isShowCategory ? "24px" : "3px")};
  margin-right: 3.556%;
  margin-bottom: 1.727%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  visibility: ${(props) => (props.isShowCategory ? "visible" : "hidden")};
  transition: all 0.3s;
  font-weight: ${(props) => (props.isShowCategory ? "500" : "100")};
  @media screen and (max-width: 37.5rem) {
    width: 44px;
    margin: 0;
  }
  span {
    font-size: 1rem;
    padding-bottom: 3px;
    cursor: pointer;
    :hover {
      border-bottom: 0.313rem solid #fede8a;
    }
    @media screen and (max-width: 37.5rem) {
      font-size: 0.5rem;
      padding: 0;
      height: 17px;
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
