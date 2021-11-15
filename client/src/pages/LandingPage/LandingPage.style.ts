import styled from "styled-components";

interface Idx {
  idx: number;
}

export const AllLandingContainer = styled.div`
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-family: "Gmarket Sans TTF";
  transition: 0.5s all;
  @media screen and (max-width: 1000px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    transition: 0.5s all;
  }
`;

export const BodyContainer = styled.main`
  width: 100%;
  max-width: 78.75rem;
  padding: 0 30px 0 30px;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  @media screen and (max-width: 1000px) {
    padding: 0;
  }
`;

export const BodyOutContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
`;

export const FirstLandingContainer = styled.div`
  width: 100%;
  height: 51.313rem;
  display: flex;
  align-items: center;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  transition: 0.5s all;
  position: relative;
  @media screen and (max-width: 1000px) {
    margin: 70px 0 70px 0;
    height: auto;
    position: static;
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    justify-content: center;
    transition: 0.5s all;
  }
`;

export const FirstTextContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  transition: 0.5s all;
  z-index: 2;
  position: absolute;
  @media screen and (max-width: 1000px) {
    position: static;
    margin-top: 20px;
    transition: 0.5s all;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 313px;
  }
  @media screen and (max-width: 420px) {
    margin-top: 0;
    height: 250px;
  }
`;

export const FirstImageContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  transition: 0.5s all;
  z-index: 1;
  right: 0;
  img {
    width: 700px;
  }
  @media screen and (max-width: 1000px) {
    position: static;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 0px;
    img {
      width: 500px;
    }
  }
  @media screen and (max-width: 37.5rem) {
    margin-bottom: 0;
    img {
      width: 317px;
    }
  }
  @media screen and (max-width: 420px) {
    img {
      width: 287px;
    }
  }
`;

export const FirstText = styled.div`
  font-weight: 100;
  font-size: 1.5rem;
  transition: 0.5s all;
  span {
    margin-bottom: 0.813rem;
  }
  @media screen and (max-width: 1000px) {
    div {
      margin-bottom: 4px;
    }
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 18px;
    transition: 0.5s all;
  }
  @media screen and (max-width: 420px) {
    font-size: 14px;
  }
`;

export const FirstSecondText = styled.div`
  font-weight: 300;
  font-size: 1.875rem;
  margin: 0.5rem 0 2.75rem 0;
  transition: 0.5s all;
  text-shadow: 2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff;
  @media screen and (max-width: 1000px) {
    margin: 39px 0 45px 0;
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 20px;
    transition: 0.5s all;
    margin: 39px 0 45px 0;
    text-shadow: none;
  }
  @media screen and (max-width: 420px) {
    font-size: 16px;
    margin: 20px 0 40px 0;
  }
`;

export const GotoMainButton = styled.button`
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  width: 13.188rem;
  height: 4.063rem;
  background: #2d2d2d;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 1.5rem;
  color: #ffffff;
  border: none;
  transition: 0.5s all;
  :active {
    background: #3f3f3f;
  }
  @media screen and (max-width: 37.5rem) {
    width: 180px;
    height: 45px;
    font-size: 16px;
    transition: 0.5s all;
  }
  @media screen and (max-width: 420px) {
    width: 150px;
    height: 40px;
  }
`;

export const BigCircle = styled.span`
  position: absolute;
  left: 1.5rem;
  top: 14rem;
  width: 10.125rem;
  height: 10.5rem;
  background: #fede8a;
  border-radius: 100%;
  box-sizing: border-box;
  transition: 0.5s all;
  z-index: 1;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const SmallCircle = styled.span`
  position: relative;
  width: 2.945rem;
  height: 2.945rem;
  left: -30rem;
  top: 10rem;
  background: #fede8a;
  border-radius: 100%;
  box-sizing: border-box;
  transition: 0.5s all;
  z-index: 1;
  @media screen and (max-width: 1000px) {
    width: 3.945rem;
    height: 3.945rem;
    left: -16.5rem;
    top: 46.8rem;
    transition: 0.5s all;
  }
  @media screen and (max-width: 37.5rem) {
    width: 2.945rem;
    height: 2.945rem;
    left: -11.3rem;
    top: 36.5rem;
    transition: 0.5s all;
  }
  @media screen and (max-width: 420px) {
    width: 1.945rem;
    height: 1.945rem;
    left: -8.7rem;
    top: 28.7rem;
  }
`;
export const VerySmallCircle = styled.span`
  display: none;

  @media screen and (max-width: 1000px) {
    display: flex;
    left: -210px;
    top: 763px;
    position: relative;
    background: #fede8a;
    border-radius: 100%;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    transition: 0.5s all;
  }
  @media screen and (max-width: 37.5rem) {
    left: -138.9px;
    top: 595px;
    width: 13px;
    height: 13px;
  }
  @media screen and (max-width: 420px) {
    left: -108.9px;
    top: 468px;
  }
`;

export const SecLandingContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  padding: 118px 0 118px 0;
  background: #fede8a;
  justify-content: center;
  font-family: Gmarket Sans TTF;
  transition: 0.5s all;
  @media screen and (max-width: 1000px) {
    display: flex;
    width: 100%;
    height: 100%;
    justify-items: center;
    transition: 0.5s all;
    padding: 0;
  }
`;

export const SecBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #fede8a;
  padding: 0 30px 0 30px;
  width: 100%;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.5s all;
    width: 100%;
    height: 100%;
  }
`;

export const SecAllBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    display: flex;
    flex-direction: column;
    transition: 0.5s all;
    width: 100%;
    height: 100%;
  }
`;

export const SecBoxContainer = styled.div<Idx>`
  display: flex;
  flex-direction: column;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  width: 396px;
  height: 400px;
  justify-content: space-evenly;
  transition: 0.5s all;
  margin: 59px 19px 57px 19px;
  @media screen and (max-width: 37.5rem) {
    width: 240px;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    transition: 0.5s all;
    margin: ${(props) =>
      props.idx === 0
        ? "59px 19px 0px 19px"
        : props.idx === 1
        ? "30px 19px 30px 19px"
        : "0 19px 59px 19px"};
  }
`;

export const SecImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s all;
  img {
    width: 135.5px;
    height: 164.75px;
    transition: 0.5s all;
  }
  @media screen and (max-width: 37.5rem) {
    height: 99px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s all;
    img {
      width: 74.85px;
      height: 91px;
      transition: 0.5s all;
    }
  }
`;

export const SecBigTxtContainer = styled.div`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  transition: 0.5s all;
  @media screen and (max-width: 37.5rem) {
    font-size: 14px;
    transition: 0.5s all;
  }
`;

export const SecDescrContainer = styled.div`
  font-size: 18px;
  font-weight: 100;
  text-align: center;
  transition: 0.5s all;
  @media screen and (max-width: 37.5rem) {
    font-size: 12px;
    transition: 0.5s all;
  }
`;

export const ThirLandingContainer = styled.div<Idx>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.idx === 0 ? "110px" : "0")};
  transition: 0.5s all;
  width: 100%;
  height: 51.313rem;
  position: relative;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    height: 70rem;
  }
  @media screen and (max-width: 37.5rem) {
    margin-top: 50px;
    height: 431px;
  }
`;

export const ThirTextContainer = styled.div<Idx>`
  position: absolute;
  display: flex;
  flex-direction: column;
  transition: 0.5s all;
  z-index: 2;
  left: ${(props) => (props.idx % 2 === 0 ? "0" : "none")};
  right: ${(props) => (props.idx % 2 === 0 ? "none" : "0")};
  @media screen and (max-width: 1000px) {
    position: static;
    left: none;
    right: none;
    top: 0;
  }
`;

export const TitleContainer = styled.div`
  font-size: 30px;
  font-weight: 300;
  z-index: 2;
  transition: 0.5s all;
  text-shadow: 2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff;
  div {
    margin-bottom: 13px;
    transition: 0.5s all;
  }
  @media screen and (max-width: 1000px) {
    text-shadow: none;
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 17px;
    transition: 0.5s all;
    div {
      margin-bottom: 9px;
      transition: 0.5s all;
    }
  }
  @media screen and (max-width: 420px) {
    font-size: 14px;
  }
`;

export const DescrContainer = styled.div`
  font-size: 24px;
  font-weight: 100;
  transition: 0.5s all;
  div {
    margin-top: 10px;
    margin-bottom: 9px;
    transition: 0.5s all;
    background: rgba(255, 255, 255, 0.5);
  }
  @media screen and (max-width: 1000px) {
    div {
      background: none;
    }
  }
  @media screen and (max-width: 37.5rem) {
    font-size: 15px;
    font-weight: 100;
    transition: 0.5s all;
    div {
      margin-bottom: 5px;
      transition: 0.5s all;
    }
  }
  @media screen and (max-width: 420px) {
    font-size: 12px;
  }
`;

export const ThirImageContainer = styled.div<Idx>`
  /* margin: ${(props) =>
    props.idx % 2 === 0 ? "30px 100px 0 0" : "30px 0 0 30px"}; */
  transition: 0.5s all;
  position: absolute;
  z-index: 1;
  left: ${(props) => (props.idx % 2 === 0 ? "none" : "0")};
  right: ${(props) => (props.idx % 2 === 0 ? "0" : "none")};
  img {
    width: 604px;
    height: 741px;
    transition: 0.5s all;
  }
  @media screen and (max-width: 1000px) {
    left: none;
    right: none;
    margin-top: 30px;
    position: static;
    bottom: 0;
    transition: 0.5s all;
  }
  @media screen and (max-width: 37.5rem) {
    img {
      width: 266px;
      height: 238px;
      transition: 0.5s all;
    }
  }
`;

export const SevLandingContainer = styled.div`
  width: 100%;
  height: 223px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s all;
  @media screen and (max-width: 1000px) {
  }
  @media screen and (max-width: 37.5rem) {
    width: 100%;
    height: 144px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s all;
  }
`;

export const AllContainer = styled.div<Idx>`
  display: flex;
  flex-direction: ${(props) => (props.idx % 2 === 0 ? "row-reverse" : "row")};
  align-items: center;
  transition: 0.5s all;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
export const Circle = styled.span`
  position: relative;
  width: 71px;
  height: 71px;
  left: -10%;
  top: 28px;
  background: #fede8a;
  border-radius: 100%;
  box-sizing: border-box;
  transition: 0.5s all;
  z-index: 0;
  @media screen and (max-width: 1000px) {
  }
  @media screen and (max-width: 37.5rem) {
    width: 36px;
    height: 36px;
    top: 15px;
    left: -19px;
    transition: 0.5s all;
  }
`;

export const ThirdBodyContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 78.75rem;
  padding: 0 27px 0 27px;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
  @media screen and (max-width: 1000px) {
    padding: 0;
  }
`;

export const ThirdBodyOutContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  background: linear-gradient(0deg, #fbfafc, #fbfafc);
`;
export const GoTopContainer = styled.div`
  position: fixed;
  cursor: pointer;
  top: 83%;
  left: 85%;
  z-index: 99;
  img {
    opacity: 0.2;
    :hover {
      opacity: 1;
    }
  }
  @media screen and (max-width: 37.5rem) {
    top: 93%;
    left: 85%;
    img {
      width: 30px;
      height: 30px;
    }
  }
`;
