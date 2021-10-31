import styled from "styled-components";

export const AllLandingContainer = styled.div``;

export const FirstLandingContainer = styled.section`
  width: 120rem;
  height: 51.313rem;
  font-family: "Gmarket Sans TTF";
  display: flex;
  justify-content: center;
`;

export const FirstBodyContainer = styled.div`
  display: flex;
  margin-top: 4.938rem;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  padding: 0 30px 0 30px;

  @media screen and (max-width: 37.5rem) {
    padding: 0 5px 0 5px;
  }
`;

export const FirstTextContainer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FirstImageContainer = styled.div``;

export const FirstText = styled.div`
  font-weight: 300;
  font-size: 1.5rem;
`;

export const FirstSecondText = styled.span`
  font-weight: 500;
  font-size: 1.875rem;
`;

export const GotoMainButton = styled.button`
  width: 13.188rem;
  height: 4.063rem;
  background: #2d2d2d;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 300;
  font-size: 1.5rem;
  color: #ffffff;
  border: none;
`;
