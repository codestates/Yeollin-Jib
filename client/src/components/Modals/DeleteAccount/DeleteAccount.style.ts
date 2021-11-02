import styled from "styled-components";

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

export const ModalContainer = styled.div`
  box-sizing: border-box;
  width: 24.75rem;
  height: 15.938rem;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  padding: 30px;
  margin-bottom: 100px;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    width: 13.938rem;
    height: 8.188rem;
    margin-bottom: 140px;
    transition: 0.5s all;
  }
`;

export const TitleWrapper = styled.div`
  margin-top: 60px;
  margin-bottom: 68px;
  width: 100%;
  display: flex;
  justify-content: center;
  transition: 0.5s all;
  @media screen and (max-width: 37.5rem) {
    margin-top: 3px;
    margin-bottom: 27px;
    transition: 0.5s all;
  }
`;

export const Title = styled.span`
  font-family: "Gmarket Sans TTF";
  font-weight: 300;
  font-size: 1.4rem;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    font-size: 0.75rem;
    transition: 0.5s all;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const BlackBtn = styled.button`
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

export const WhiteBtn = styled.button`
  outline: none;
  border: 1px solid #2d2d2d;
  border-radius: 0.313rem;
  background: #fbfafc;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  width: 5.3rem;
  height: 2.5rem;
  cursor: pointer;
  transition: 0.5s all;
  margin-left: 5px;
  :active {
    background: #f5f4f5;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4rem;
    height: 2.1rem;
    transition: 0.5s all;
  }
`;
