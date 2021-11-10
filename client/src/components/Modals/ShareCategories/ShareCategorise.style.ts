import styled from "styled-components";

export interface SubCateSelect {
  isCheck: boolean;
}

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 999;
`;

export const BodyContainer = styled.div`
  width: 100%;
  max-width: 684px;
  padding: 0 30px 0 30px;
`;

export const ModalContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 315px;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  padding: 30px;
  transition: 0.5s all;
  .Close_Button_Container {
    display: flex;
    height: 2.5rem;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
  }
`;

export const CategoriesContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #fbfafc;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  color: #2d2d2d;
`;

export const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  span {
    font-family: "Gmarket Sans TTF";
    font-weight: 300;
    font-size: 20px;
    color: #2d2d2d;
    border-bottom: 5px solid #fede8a;
  }
`;

export const CategoryRow = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 19px;
`;

export const MainCategory = styled.div`
  width: 160px;
`;

export const SubCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  div {
    display: flex;
    width: 150px;
    height: 25px;
  }
  .Sub_Category_Box {
    margin-bottom: 5px;
  }
`;

export const SubCategoryName = styled.span<SubCateSelect>`
  margin-left: 4px;
  cursor: pointer;
  color: ${(props) => (props.isCheck ? "#C2BFC3" : "#2d2d2d")};
  text-decoration: ${(props) => (props.isCheck ? "line-through" : "none")};
`;

export const CloseButton = styled.button`
  outline: none;
  border: 1px solid #2d2d2d;
  border-radius: 0.313rem;
  background: #2d2d2d;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #ffffff;
  width: 5.3rem;
  height: 2.5rem;
  cursor: pointer;
  transition: 0.5s all;
  :active {
    background: #3f3f3f;
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4rem;
    height: 2.1rem;
    transition: 0.5s all;
  }
`;
