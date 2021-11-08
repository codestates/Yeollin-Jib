import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 4.938rem;
  background: linear-gradient(0deg, #fdfbfe, #fdfbfe), #fbfbfb;
  border-bottom: 0.063rem solid #e0dde1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
`;

export const FooterContainer = styled.div`
  height: 11.313rem;
  background: linear-gradient(0deg, #fdfbfe, #fdfbfe), #fbfbfb;
  border-top: 0.063rem solid #e0dde1;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;
