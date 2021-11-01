import styled from "styled-components";

interface IContainerProps {
  isSubmited: boolean;
}

interface IContentProps {
  isContents?: boolean;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 468px;
  height: 599px;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  padding: 30px;
  margin-bottom: ${(props) => (props.isSubmited ? "265.5px" : "100px")};
  transition: 0.5s width, height, padding;

  @media screen and (max-width: 37.5rem) {
    width: 366px;
    height: 466px;
    margin-bottom: ${(props) => (props.isSubmited ? "300px" : "140px")};
    padding: 30px 20px 30px 20px;
    transition: 0.5s width, height, padding;
  }
`;

export const TitleWrapper = styled.div`
  margin-bottom: 30px;
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

export const InputTitle = styled.div<IContentProps>`
  font-weight: 100;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  transition: 0.5s all;
  margin-top: ${(props) => (props.isContents ? "16px" : "0")};
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
    font-size: 10px;
  }
`;
export const InquiryField = styled.textarea`
  outline: none;
  background-color: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  padding: 0.5rem 0 0 0.5rem;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  width: 97%;
  height: 181px;
  resize: none;
  :focus {
    border: 1px solid #2d2d2d;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 10px;
    height: 100px;
    resize: none;
  }
`;
export const MsgContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-weight: 100;
  font-size: 0.875rem;
  margin: 5px 0 11px 0;
  padding-left: 5px;
  height: 12px;
  /* color: ${(props) => (props ? "#2d2d2d" : "#f44336")}; */

  div {
    margin-left: 3px;
  }

  img {
    margin-top: 3.75px;
    width: 14px;
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
    font-size: 0.7rem;
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
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4rem;
    height: 2.1rem;
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

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4rem;
    height: 2.1rem;
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

export const InquiryTxt = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 100;
  margin: 14px 0 15px 0;
  @media screen and (max-width: 37.5rem) {
    font-size: 0.7rem;
    margin-bottom: 1rem;
  }
`;
