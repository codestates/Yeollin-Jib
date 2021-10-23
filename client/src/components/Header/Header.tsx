import React from "react";
import {
  HeaderItemContainer,
  Logo,
  LogoImg,
  LogoTitle,
  SearchBar,
  MenuBtn,
  HamburgerBtn,
  SearchSelect,
  LoginLogoutBtn,
  SignupUserInfoBtn,
} from "./Header.style";

function Header() {
  const ArrSearch: string[] = ["전체", "지역"];
  return (
    <HeaderItemContainer>
      <Logo>
        <div>
          <LogoImg src="./images/logo.svg" alt="LogoImg" />
          <LogoTitle src="./images/logoTitle.svg" alt="LogoTitle" />
        </div>
      </Logo>
      <SearchBar>
        <SearchSelect onChange={(e) => {}}>
          {ArrSearch.map((el, idx) => {
            return (
              <option key={idx} value={el}>
                {el}
              </option>
            );
          })}
        </SearchSelect>
        <input />
      </SearchBar>
      <MenuBtn>
        <HamburgerBtn src="./images/hamburger.svg" alt="Hamburger" />
        <LoginLogoutBtn>{"로그인"}</LoginLogoutBtn>
        <SignupUserInfoBtn>{"회원가입"}</SignupUserInfoBtn>
      </MenuBtn>
    </HeaderItemContainer>
  );
}

export default Header;
