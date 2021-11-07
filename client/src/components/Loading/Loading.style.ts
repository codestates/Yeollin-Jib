import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;

  flex: 1;
`;

export const Image = styled.img`
  width: 216px;
  height: 216px;

  margin-left: 925px;
`;

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
