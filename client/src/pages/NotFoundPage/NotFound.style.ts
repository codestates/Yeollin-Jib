import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-family: Gmarket Sans TTF;
  @media screen and (max-width: 37.5rem) {
    justify-content: flex-start;
    margin-top: 150px;
  }
`;
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

export const ImgContainer = styled.div`
  @media screen and (max-width: 37.5rem) {
    img {
      width: 208px;
      height: 208px;
    }
  }
`;

export const TxtContainer = styled.div`
  text-align: center;
  font-size: 26px;
  font-weight: 500;
  margin: 25px 0 33px 0;
  @media screen and (max-width: 37.5rem) {
    font-size: 18px;
  }
`;

export const DivContainer = styled.div`
  margin-top: 16px;
  font-size: 18px;
  font-weight: 100;
  div {
    width: 100%;
    word-break: keep-all;
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 228px;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 37.5rem) {
    width: 155px;
  }
`;

export const GoToMainButton = styled.button`
  width: 108px;
  height: 47px;
  background: #2d2d2d;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 100;
  color: #ffffff;
  font-family: Gmarket Sans TTF;
  border-style: none;
  cursor: pointer;
  :active {
    background: #3f3f3f;
  }
  @media screen and (max-width: 37.5rem) {
    width: 70px;
    height: 30px;
    font-size: 10px;
  }
`;

export const GoToBeforeButton = styled.button`
  width: 108px;
  height: 47px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid #2d2d2d;
  font-family: Gmarket Sans TTF;
  font-weight: 100;
  color: #2d2d2d;
  background: #ffffff;
  cursor: pointer;
  :active {
    background: #f5f4f5;
  }
  @media screen and (max-width: 37.5rem) {
    width: 70px;
    height: 30px;
    font-size: 10px;
  }
`;
