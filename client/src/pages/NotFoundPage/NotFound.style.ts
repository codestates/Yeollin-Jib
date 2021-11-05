import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-family: Gmarket Sans TTF;
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

export const ImgContainer = styled.div``;

export const TxtContainer = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  margin: 25px 0 33px 0;
`;

export const DivContainer = styled.div`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 100;
  div {
    margin-bottom: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 228px;
  flex-direction: row;
  justify-content: space-between;
`;

export const GoToMainButton = styled.button`
  width: 108px;
  height: 47px;
  background: #2d2d2d;
  border-radius: 5px;
  font-size: 16px;
  color: #ffffff;
  font-family: Gmarket Sans TTF;
  border-style: none;
  cursor: pointer;
  :active {
    background: #3f3f3f;
  }
`;

export const GoToBeforeButton = styled.button`
  width: 108px;
  height: 47px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid #2d2d2d;
  font-family: Gmarket Sans TTF;
  color: #2d2d2d;
  background: #ffffff;
  cursor: pointer;
  :active {
    background: #f5f4f5;
  }
`;
