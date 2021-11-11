import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { setUser } from "../../reducers/userReducer";
import { setTapName } from "../../reducers/myPageReducer";
import { setSearch } from "../../reducers/searchReducer";
import Logout from "../../components/Modals/Logout/Logout";
function Header() {
  const dispatch = useDispatch();
  let history = useHistory();
  const ArrSearch: string[] = ["제목", "지역"];
  const { search } = useSelector((state: RootState) => state.searchReducer);

  // 검색 항목 선택
  const [searchOption, setSearchOption] = useState<string>("title");

  // 햄버거 메뉴 상태
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // auth 저장소에서 필요한 값을 가져옴
  const { isLogin, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );

  // 검색 항목 선택시
  const searchOptionHandle = (option: string) => {
    if (option === "제목" || searchOption === undefined) {
      setSearchOption("title");
    } else if (option === "지역") {
      setSearchOption("address");
    }
  };
  // 인풋 입력 후 엔터를 치면 검색 요청을 보냄
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.length >= 2) {
      history.push({
        pathname: "/main",
        state: { isSearch: true, search, searchOption },
      });
    }
  };

  const valueHandler = (search: string) => {
    dispatch(setSearch(search));
  };

  // isLogin이 true일 때 유저 정보 요청
  const getUserData = () => {
    if (isLogin) {
      dispatch(setUser(accessToken));
      dispatch(setTapName("내가 쓴 게시글"));
    }
  };

  // 로그아웃 모달 상태
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    // 상단바
    <HeaderItemContainer>
      <Link to="/main">
        <Logo onClick={() => valueHandler("")}>
          <div>
            <LogoImg src="./images/logo.svg" alt="LogoImg" />
            <LogoTitle src="./images/logoTitle.svg" alt="LogoTitle" />
          </div>
        </Logo>
      </Link>
      <SearchBar>
        <SearchSelect onChange={(e) => searchOptionHandle(e.target.value)}>
          {ArrSearch.map((el, idx) => {
            return (
              <option key={idx} value={el}>
                {el}
              </option>
            );
          })}
        </SearchSelect>
        <input
          onChange={(e) => {
            valueHandler(e.target.value);
          }}
          onKeyPress={(e) => handleKeyPress(e)}
          value={search}
        />
        {search.length >= 2 ? (
          <Link
            to={{
              pathname: "/main",
              state: { isSearch: true, search, searchOption },
            }}
          >
            <img src="./images/searchBtn.svg" alt="search" />
          </Link>
        ) : (
          <img src="./images/searchBtn.svg" alt="search" />
        )}
      </SearchBar>
      <MenuBtn>
        <HamburgerBtn
          src="./images/hamburger.svg"
          alt="Hamburger"
          onClick={() => {
            setIsOpen(!isOpen);
            valueHandler("");
          }}
        />
        {isOpened ? (
          <Logout
            setIsOpened={(bool: boolean) => {
              setIsOpened(bool);
              valueHandler("");
            }}
          ></Logout>
        ) : null}
        {isLogin ? (
          <LoginLogoutBtn
            onClick={() => {
              setIsOpened(true);
              valueHandler("");
            }}
          >
            로그아웃
          </LoginLogoutBtn>
        ) : (
          <Link to={isLogin ? "" : "/login"}>
            <LoginLogoutBtn onClick={() => valueHandler("")}>
              로그인
            </LoginLogoutBtn>
          </Link>
        )}
        <Link to={isLogin ? "/profile" : "/signup"}>
          <SignupUserInfoBtn
            onClick={() => {
              getUserData();
              valueHandler("");
            }}
          >
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
                onClick={() => {
                  setIsOpen(!isOpen);
                  valueHandler("");
                }}
              />
              <MenuWrapper>
                <Link to={isLogin ? "/main" : "/login"}>
                  <Menu
                    onClick={() => {
                      setIsOpen(!isOpen);
                      valueHandler("");
                    }}
                  >
                    {isLogin ? "홈" : "로그인"}
                  </Menu>
                </Link>
              </MenuWrapper>
              <MenuWrapper>
                <Link to={isLogin ? "/profile" : "/signup"}>
                  <Menu
                    onClick={() => {
                      getUserData();
                      setIsOpen(!isOpen);
                      valueHandler("");
                    }}
                  >
                    {isLogin ? "내 정보" : "회원가입"}
                  </Menu>
                </Link>
              </MenuWrapper>
              <MenuWrapper>
                <Menu
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setIsOpened(!isOpened);
                    valueHandler("");
                  }}
                >
                  {isLogin ? "로그아웃" : ""}
                </Menu>
              </MenuWrapper>
            </Bar>
          </BarWrapper>
        </HamburgerContainer>
      ) : null}
    </HeaderItemContainer>
  );
}

export default Header;
