import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 316px;
  height: 316px;
  margin-left: 200px;
  @media screen and (max-width: 37.5rem) {
  }
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
