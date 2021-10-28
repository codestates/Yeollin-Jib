import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 25px;

  @media screen and (max-width: 37.5rem) {
    padding: 25px;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-family: "Gmarket Sans TTF";
  font-weight: 300;
  font-size: 1.4rem;
  color: #2d2d2d;
  border-bottom: 5px solid #fede8a;
  transition: 0.5s all;
  margin-bottom: 20px;

  @media screen and (max-width: 37.5rem) {
    font-size: 1.2rem;
    transition: 0.5s all;
  }
`;

export const EditPasswordContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  cursor: pointer;
  padding-bottom: 20px;
  transition: 0.5s all;

  img {
    margin-right: 5px;
  }

  @media screen and (max-width: 37.5rem) {
    transition: 0.5s all;
    img {
      width: 24px;
    }

    font-size: 0.8rem;
  }
`;

export const MiddleContainer = styled.div`
  display: flex;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    flex-direction: column;
    transition: 0.5s all;
  }
`;

export const LeftContainer = styled.div`
  margin-right: 40px;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    margin-bottom: 20px;
    transition: 0.5s all;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const FormContainer = styled.div``;

export const PhotoBox = styled.div`
  border: 0.063rem solid #e0dde1;
  border-radius: 0.313rem;
  width: 11.19rem;
  height: 11.19rem;
  background: #fdfbfe;
  margin-top: 10px;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    transition: 0.5s all;
    width: 6rem;
    height: 6rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  @media screen and (max-width: 37.5rem) {
    height: 2.313rem;
  }
`;

export const InputTitle = styled.div`
  display: flex;
  align-items: center;
  font-family: "Gmarket Sans TTF";
  font-weight: 300;
  font-size: 1rem;

  div {
    margin-left: 5px;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.9rem;
  }
`;

export const InputField = styled.input`
  outline: none;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  padding-left: 1rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  height: 2.8rem;
  width: 100%;

  :focus {
    border: 1px solid #2d2d2d;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    padding-left: 0.8rem;
    height: 2.313rem;
  }
`;

export const SearchBtn = styled.button`
  outline: none;
  border: 1px solid #2d2d2d;
  background: #2d2d2d;
  border-radius: 0.313rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: white;
  height: 3rem;
  width: 115px;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: 0.5s all;

  :active {
    background: #3f3f3f;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s all;
    height: 2.6rem;
    width: 100px;
  }
`;

export const InvalidMessage = styled.div`
  display: flex;
  font-weight: 100;
  font-size: 1rem;
  color: #f44336;
  margin: 10px 0 20px 10px;
  transition: 0.5s all;
  height: 16px;

  img {
    width: 14px;
    margin-right: 3px;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s all;
    margin: 5px 0 20px 10px;

    img {
      width: 12px;
    }
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
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
  height: 2.8rem;
  cursor: pointer;
  transition: 0.5s all;
  margin-right: 5px;

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4.3rem;
    height: 2.5rem;
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
  height: 2.8rem;
  cursor: pointer;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4.3rem;
    height: 2.5rem;
  }
`;
