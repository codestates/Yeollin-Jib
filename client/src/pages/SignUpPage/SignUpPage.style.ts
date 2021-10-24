import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  font-family: "Gmarket Sans TTF";
  color: #2d2d2d;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  width: 25rem;
  height: 36.6rem;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  padding: 2rem;
  margin-bottom: 16px;
  transition: 0.5s all;

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 37.5rem) {
    border: 1px solid #fbfafc;
    margin-bottom: 108px;
    width: 20rem;
    height: 40rem;
    transition: 0.5s all;
    background-color: #fbfafc;
  }
`;

export const TitleWrapper = styled.span`
  margin-bottom: 40px;

  @media screen and (max-width: 37.5rem) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.span`
  font-weight: 400;
  font-size: 1.4rem;
  border-bottom: 5px solid #fede8a;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    font-size: 1.2rem;
    transition: 0.5s all;
  }
`;

export const InputTitle = styled.div`
  font-weight: 200;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s all;
    margin-bottom: 0.3rem;
  }
`;

export const InputField = styled.input`
  outline: none;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  padding-left: 0.5rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  height: 2.313rem;
  width: 97%;
  transition: 0.5s all;

  :focus {
    border: 1px solid #2d2d2d;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s all;
  }
`;

export const InvalidMessage = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 100;
  font-size: 1rem;
  color: #f44336;
  margin: 10px 0 20px 0;
  transition: 0.5s all;
  height: 16px;

  img {
    margin-right: 3px;
    padding-top: 2px;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s all;
    margin: 5px 0 10px 0;

    img {
      width: 12px;
      height: 12px;
      padding-top: 1px;
    }
  }
`;

export const SignupBtn = styled.button`
  outline: none;
  border: 1px solid #2d2d2d;
  background: #2d2d2d;
  border-radius: 0.313rem;
  padding-left: 0.5rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: white;
  height: 2.6rem;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.5s all;

  :active {
    background: #3f3f3f;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s all;
  }
`;

export const LoginBtn = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 100;
  color: #2d2d2d;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.5s all;

  :hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s all;
  }
`;

export const MsgContainer = styled.div`
  display: flex;
  justify-content: left;
  font-weight: 100;
  font-size: 0.8rem;
  color: #f44336;
  transition: 0.5s all;
  height: 16px;
  margin: 5px 0 11px 0;
  padding-left: 5px;
  height: 12px;

  img {
    width: 13px;
    margin-right: 3px;
    padding-top: 2px;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.7rem;
    transition: 0.5s all;
    height: 10px;

    img {
      width: 10px;
      height: 12px;
      padding-top: 0.3px;
    }
  }
`;
