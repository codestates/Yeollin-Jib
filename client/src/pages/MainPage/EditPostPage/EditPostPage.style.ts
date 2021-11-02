import styled from "styled-components";

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
