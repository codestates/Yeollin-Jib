import styled from "styled-components";

export interface SubCateSelect {
  isCheck: boolean;
}

export const Testcontainer = styled.div`
  width: 670px;
  height: 167px;
`;

export const CategoryBox = styled.div`
  width: 100%;
  height: 167px;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 12px 18px 0 18px;
  color: #2d2d2d;
  .Category_Slice {
    height: 100px;
    width: 100%;
    overflow-y: hidden;
  }
`;

export const CategoryTitle = styled.div`
  width: 100%;
  font-family: "Gmarket Sans TTF";
  font-weight: 300;
`;

export const CategoryRow = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 13px;
  font-weight: 100;
`;

export const MainCategory = styled.div`
  width: 180px;
  height: 17px;
`;

export const SubCategory = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    width: 120px;
    height: 17px;
  }
`;

export const SubCategoryName = styled.span<SubCateSelect>`
  margin-left: 4px;
  cursor: pointer;
  color: ${(props) => (props.isCheck ? "#C2BFC3" : "#2d2d2d")};
  text-decoration: ${(props) => (props.isCheck ? "line-through" : "none")};
`;

export const ShowAllCategoryBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  font-weight: 100;
  cursor: pointer;
  .Down_Arrow {
    font-weight: 500;
    margin-right: 5px;
  }
  span {
    :hover {
      font-weight: 300;
    }
    :active {
      color: #c2bfc3;
    }
  }
`;
