import styled from "styled-components";

interface ITapProps {
  isClicked: boolean;
}

interface IContentProps {
  isColumn: boolean;
}

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  padding-top: 25px;
  width: 100%;
  height: 100%;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    flex-direction: column;
    align-items: center;
    transition: 0.5s all;
  }
`;

export const SideContainer = styled.div`
  margin-right: 30px;
  /* position: fixed; */

  @media screen and (max-width: 37.5rem) {
    margin: 0;
  }
`;

export const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 288px;
  height: 14rem;
  background: #fdfbfe;
  border: 1px solid #e0dde1;
  border-radius: 0.313rem;
  margin-bottom: 20px;
  padding: 30px 20px 30px 20px;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    width: 310px;
    height: 190px;
    transition: 0.5s all;
    padding: 25px 20px 25px 20px;
    margin-bottom: 0;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 37.5rem) {
    img {
      height: 50px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 66px;
  margin-left: 15px;
  font-family: "Gmarket Sans TTF";
  width: 100%;

  .Profile_Nickname {
    font-weight: 300;
    font-size: 1rem;
  }

  .Profile_Email {
    font-weight: 100;
    font-size: 0.8rem;
    margin-top: 3px;
  }

  @media screen and (max-width: 37.5rem) {
    height: 50px;

    .Profile_Nickname {
      font-size: 0.9rem;
    }

    .Profile_Email {
      font-size: 0.8rem;
    }
  }
`;

export const Adress = styled.div`
  display: flex;
  margin-top: 5px;

  img {
    margin-right: 5px;
    padding-bottom: 1px;
  }
  div {
    font-family: "Gmarket Sans TTF";
    font-weight: 100;
    font-size: 0.8rem;
  }

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;

    img {
      height: 12px;
      padding-top: 1px;
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 68px;
  margin-top: 30px;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 0.9rem;
  color: #2d2d2d;

  @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    height: 60px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  color: #2d2d2d;

  .Info_Text {
    width: 130px;
  }

  @media screen and (max-width: 37.5rem) {
    .Info_Text {
      width: 115px;
    }
  }
`;

export const SmallBtnContainer = styled.div`
  margin: 10px 0 20px 0;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

export const BlackSmallBtn = styled.button`
  width: 150px;
  height: 35px;
  outline: none;
  border: 1px solid #2d2d2d;
  border-radius: 0.313rem;
  background: #2d2d2d;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 0.8rem;
  color: #ffffff;
  cursor: pointer;

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

export const WhiteSmallBtn = styled.button`
  width: 150px;
  height: 35px;
  outline: none;
  border: 1px solid #2d2d2d;
  border-radius: 0.313rem;
  background: #fbfafc;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 0.8rem;
  color: #2d2d2d;
  cursor: pointer;
  margin-left: 5px;

  @media screen and (min-width: 37.5rem) {
    display: none;
  }
`;

export const InfoIcon = styled.div`
  margin-right: 10px;
  width: 20px;
  text-align: center;
`;

export const TapContainer = styled.div`
  width: 100%;

  @media screen and (max-width: 37.5rem) {
    display: flex;
    justify-content: space-between;
    width: auto;
  }
`;

export const Tap = styled.div<ITapProps>`
  background: ${(props) => (props.isClicked ? "#fede8a" : "#fbfafc")};
  border: 1px solid ${(props) => (props.isClicked ? "#fede8a" : "#e0dde1")};
  border-radius: 0.313rem;
  padding: 12px;
  font-family: "Gmarket Sans TTF";
  font-weight: 100;
  font-size: 1rem;
  color: #2d2d2d;
  margin-bottom: 10px;
  cursor: pointer;

  @media screen and (max-width: 37.5rem) {
    background: #fbfafc;
    border: none;
    font-size: 0.8rem;
    padding: 0;
    margin: 0;
    border-radius: 0;
    border-bottom: 5px solid
      ${(props) => (props.isClicked ? "#fede8a" : "#fbfafc")};
    font-weight: ${(props) => (props.isClicked ? 300 : 100)};
  }
`;

export const BtnContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 37.5rem) {
    width: 150px;
    align-items: flex-end;
  }
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
  width: 8.8rem;
  height: 42px;
  cursor: pointer;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    display: none;
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
  width: 8.8rem;
  height: 42px;
  cursor: pointer;
  transition: 0.5s all;

  @media screen and (max-width: 37.5rem) {
    display: none;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  /* margin-left: 318px; */

  @media screen and (max-width: 37.5rem) {
    width: 310px;
  }
`;

export const Title = styled.span`
  font-family: "Gmarket Sans TTF";
  font-weight: 300;
  font-size: 1.4rem;
  color: #2d2d2d;
  border-bottom: 5px solid #fede8a;

  @media screen and (max-width: 37.5rem) {
    display: none;
  }
`;

export const Content = styled.div<IContentProps>`
  display: flex;
  flex-direction: ${(props) => (props.isColumn ? "column" : "row")};
  margin-top: 20px;

  @media screen and (max-width: 37.5rem) {
    margin-top: 0;
    flex-direction: column;
  }
`;
