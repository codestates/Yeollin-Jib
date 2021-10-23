import styled from "styled-components";

export const HeaderItemContainer = styled.div`
  display: flex;
  width: 78.75rem;
`;

export const Logo = styled.div`
  width: 15%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0 1.938rem 0 0.563rem;
  @media screen and (max-width: 37.5rem) {
    width: 1.875rem;
    margin: 0 0.75rem 0 1.375rem;
    transition: 0.5s all;
  }
  div {
    display: flex;
    cursor: pointer;
    :hover {
      border-bottom: 0.313rem solid #fede8a;
      /* transition: 0.2s all; */
    }
  }
`;

export const LogoImg = styled.img`
  display: block;
  width: 1.625rem;
`;

export const LogoTitle = styled.img`
  display: block;
  width: 3.563rem;
  margin-left: 0.438rem;
  @media screen and (max-width: 37.5rem) {
    display: none;
  }
`;

export const SearchBar = styled.div`
  flex: 1;
  height: 2.313rem;
  border-radius: 0.313rem;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;
    height: 2.313rem;
    box-sizing: border-box;
    outline: none;
    border: none;
    padding: 0 0 0 0.938rem;
    border-radius: 0 0.313rem 0.313rem 0;
    background: #f7f7f8;
    border-bottom: 0.063rem solid #e0dde1;
    border-top: 0.063rem solid #e0dde1;
    border-right: 0.063rem solid #e0dde1;
  }
`;

export const SearchSelect = styled.select`
  width: 6.25rem;
  height: 2.313rem;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-radius: 0.313rem 0 0 0.313rem;
  padding: 0 2.125rem 0 0.875rem;
  background: #f7f7f8;
  border-bottom: 0.063rem solid #e0dde1;
  border-top: 0.063rem solid #e0dde1;
  border-left: 0.063rem solid #e0dde1;
  font-family: "Gmarket Sans TTF";
  @media screen and (max-width: 37.5rem) {
    padding: 0 1.125rem 0 0.563rem;
    transition: 0.5s all;
  }
  option {
    font-size: 0.625rem;
    font-weight: normal;
  }
`;

export const MenuBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8%;
  @media screen and (max-width: 37.5rem) {
    margin-left: 0;
    transition: 0.5s all;
  }
`;

export const HamburgerBtn = styled.img`
  display: none;
  @media screen and (max-width: 37.5rem) {
    width: 1.5rem;
    display: unset;
    padding: 0 1.5rem 0 1.125rem;
  }
`;

export const LoginLogoutBtn = styled.button`
  width: 5rem;
  height: 2.25rem;
  border-radius: 0.313rem;
  font-size: 0.875rem;
  font-weight: 100;
  box-sizing: border-box;
  color: #ffffff;
  background: #2d2d2d;
  font-family: "Gmarket Sans TTF";
  border: none;
  cursor: pointer;
  @media screen and (max-width: 37.5rem) {
    display: none;
  }
`;
export const SignupUserInfoBtn = styled.button`
  width: 5rem;
  height: 2.25rem;
  border-radius: 0.313rem;
  font-size: 0.875rem;
  font-weight: 100;
  box-sizing: border-box;
  color: #2d2d2d;
  background: linear-gradient(0deg, #fdfbfe, #fdfbfe), #fbfbfb;
  font-family: "Gmarket Sans TTF";
  border: 0.063rem solid #2d2d2d;
  cursor: pointer;
  margin-left: 0.563rem;
  @media screen and (max-width: 37.5rem) {
    display: none;
  }
`;
