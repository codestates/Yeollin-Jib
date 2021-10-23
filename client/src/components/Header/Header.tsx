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
} from "./Header.style";
import {
  BarWrapper,
  Bar,
  MenuWrapper,
  Menu,
} from "../MobileBar/MobileBar.style";

function Header() {
  const ArrSearch: string[] = ["전체", "지역"];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isLogin = true;
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
        <HamburgerBtn
          src="./images/hamburger.svg"
          alt="Hamburger"
          onClick={() => setIsOpen(!isOpen)}
        />
        <LoginLogoutBtn>{"로그인"}</LoginLogoutBtn>
        <SignupUserInfoBtn>{"회원가입"}</SignupUserInfoBtn>
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
              {isLogin ? (
                <>
                  <MenuWrapper>
                    <Link to="/main">
                      <Menu>홈</Menu>
                    </Link>
                  </MenuWrapper>
                  <MenuWrapper>
                    <Link to="/profile">
                      <Menu>내 정보</Menu>
                    </Link>
                  </MenuWrapper>
                  <MenuWrapper>
                    <Menu>로그아웃</Menu>
                  </MenuWrapper>
                </>
              ) : (
                <>
                  <MenuWrapper>
                    <Link to="/login">
                      <Menu>로그인</Menu>
                    </Link>
                  </MenuWrapper>
                  <MenuWrapper>
                    <Link to="/signup">
                      <Menu>회원가입</Menu>
                    </Link>
                  </MenuWrapper>
                </>
              )}
            </Bar>
          </BarWrapper>
        </HamburgerContainer>
      ) : null}
    </HeaderItemContainer>
  );
}

export default Header;
