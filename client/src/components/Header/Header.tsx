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
import { RootState } from "../../reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../reducers/authReducer";

function Header() {
  const dispatch = useDispatch();
  
  const ArrSearch: string[] = ["전체", "지역"];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isLogin = useSelector((state: RootState) => state.authReducer.isLogin);
  return (
    // 상단바
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
        <Link to={isLogin ? "/login" : "/login"}>
          {isLogin ? 
          <LoginLogoutBtn onClick={()=>dispatch(setLogOut())}>로그아웃</LoginLogoutBtn>
          :
          <LoginLogoutBtn>로그인</LoginLogoutBtn>
          }
        </Link>
        <Link to={isLogin ? "/profile" : "/signup"}>
          <SignupUserInfoBtn>
            {isLogin ? "내 정보" : "회원가입"}
          </SignupUserInfoBtn>
        </Link>
      </MenuBtn>
      {isOpen ? (
        // 햄버거 메뉴
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
                <Link to={isLogin ? "/login" : ""}>
                  <Menu onClick={()=>dispatch(setLogOut())}>{isLogin ? "로그아웃" : null}</Menu>
                </Link>
              </MenuWrapper>
            </Bar>
          </BarWrapper>
        </HamburgerContainer>
      ) : null}
    </HeaderItemContainer>
  );
}

export default Header;
