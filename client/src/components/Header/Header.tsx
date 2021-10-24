import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  HamburgerContainer,
  BarWrapper,
  Bar,
  MenuWrapper,
  Menu,
} from "./Header.style";

function Header() {
  const ArrSearch: string[] = ["전체", "지역"];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isLogin = false;
  return (
    // * 상단바
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
        <HamburgerBtn
          src="./images/hamburger.svg"
          alt="Hamburger"
          onClick={() => setIsOpen(!isOpen)}
        />
        <LoginLogoutBtn>{isLogin ? "로그아웃" : "로그인"}</LoginLogoutBtn>
        <SignupUserInfoBtn>
          {isLogin ? "내 정보" : "회원가입"}
        </SignupUserInfoBtn>
      </MenuBtn>
      {isOpen ? (
        <HamburgerContainer>
          <BarWrapper>
            <Bar>
              <img
                src="./images/closeMenu.svg"
                alt="close"
                onClick={() => setIsOpen(!isOpen)}
              />
              <MenuWrapper>
                <Link to={isLogin ? "/main" : "/login"}>
                  <Menu>{isLogin ? "홈" : "로그인"}</Menu>
                </Link>
              </MenuWrapper>
              <MenuWrapper>
                <Link to={isLogin ? "/profile" : "/signup"}>
                  <Menu>{isLogin ? "내 정보" : "회원가입"}</Menu>
                </Link>
              </MenuWrapper>
              <MenuWrapper>
                <Menu>{isLogin ? "로그아웃" : null}</Menu>
              </MenuWrapper>
            </Bar>
          </BarWrapper>
        </HamburgerContainer>
      ) : null}
    </HeaderItemContainer>
  );
}

export default Header;
