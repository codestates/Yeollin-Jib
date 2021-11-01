import styled from "styled-components";

interface IMsgProps {
  isColor: boolean;
}

interface IContainerProps {
  isSubmited: boolean;
}

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

export const ModalContainer = styled.div<IContainerProps>`
  box-sizing: border-box;
  width: 29.3rem;
  height: ${(props) => (props.isSubmited ? "13rem" : "23.4rem")};
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  padding: 30px;
  margin-bottom: ${(props) => (props.isSubmited ? "265.5px" : "100px")};
  transition: 0.5s width, height, padding;

  @media screen and (max-width: 37.5rem) {
    width: 19rem;
    height: ${(props) => (props.isSubmited ? "11.2rem" : "21.2rem")};
    margin-bottom: ${(props) => (props.isSubmited ? "300px" : "140px")};
    padding: 30px 20px 30px 20px;
    transition: 0.5s width, height, padding;
  }
`;

export const TitleWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.span`
  font-family: "Gmarket Sans TTF";
  font-weight: 300;
  font-size: 1.4rem;
  border-bottom: 5px solid #fede8a;
  transition: 0.5s all;
  margin-bottom: 20px;

  @media screen and (max-width: 37.5rem) {
    font-size: 1.2rem;
    transition: 0.5s all;
  }
`;

export const InputTitle = styled.div`
  font-weight: 100;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s all;
    margin-bottom: 0.3rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
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

  :focus {
    border: 1px solid #2d2d2d;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
  }
`;

export const MsgContainer = styled.div<IMsgProps>`
  display: flex;
  justify-content: left;
  align-items: center;
  font-weight: 100;
  font-size: 0.8rem;
  margin: 5px 0 11px 0;
  padding-left: 5px;
  height: 12px;
  color: ${(props) => (props.isColor ? "#2d2d2d" : "#f44336")};

  div {
    margin-left: 3px;
  }

  img {
    width: 13px;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.7rem;
    height: 10px;

    div {
      margin-left: 3px;
    }

    img {
      width: 10px;
    }
  }
`;

export const InvalidMessage = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 100;
  font-size: 1rem;
  color: #f44336;
  transition: 0.5s all;
  height: 16px;
  margin: 15px;

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
  transition: 0.5s width, height, font-size;

  :active {
    background: #3f3f3f;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4rem;
    height: 2.1rem;
    transition: 0.5s width, height, font-size;
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
  margin-left: 5px;
  transition: 0.5s width, height, font-size;

  :active {
    background: #f5f4f5;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4rem;
    height: 2.1rem;
    transition: 0.5s width, height, font-size;
  }
`;

export const CompletedMsg = styled.div`
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  margin-bottom: 2.7rem;

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    margin-bottom: 2rem;
  }
`;
