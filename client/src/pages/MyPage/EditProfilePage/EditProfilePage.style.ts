import styled from "styled-components";

interface IMsgProps {
  isColor: boolean;
}

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

  :hover {
    text-decoration: underline;
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

export const UploadPhotoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .ProfileImg_Container {
    position: relative;
    width: 11.19rem;
    height: 11.19rem;
  }

  span {
    margin-left: 7px;
  }

  .ProfileImg_Thumb {
    width: 11.19rem;
    height: 11.19rem;
    position: absolute;
    box-sizing: border-box;
    border-radius: 7px;
  }

  @media screen and (max-width: 37.5rem) {
    transition: 0.5s width, height;
    margin-bottom: 65px;

    span {
      margin-left: 0;
    }

    .ProfileImg_Container {
      width: 6rem;
      height: 6rem;
    }

    .ProfileImg_Thumb {
      width: 6rem;
      height: 6rem;
    }
  }
`;

export const ImgTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 37.5rem) {
    justify-content: left;
    margin-bottom: 25px;
  }
`;

export const DeleteProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  background-color: #fede8a;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;

  img {
    width: 10px;
  }

  @media screen and (max-width: 37.5rem) {
    margin-left: 16px;
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
  transition: 0.5s font-size, height, width;

  :active {
    background: #3f3f3f;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    transition: 0.5s font-size, height, width;
    height: 2.6rem;
    width: 100px;
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
  transition: 0.5s font-size, width, height;
  margin-right: 5px;

  :active {
    background: #3f3f3f;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4.3rem;
    height: 2.5rem;
    transition: 0.5s font-size, width, height;
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
  transition: 0.5s font-size, width, height;

  :active {
    background: #f5f4f5;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4.3rem;
    height: 2.5rem;
    transition: 0.5s font-size, width, height;
  }
`;
