import { Link } from "react-router-dom";
import { BarWrapper, Bar, MenuWrapper, Menu } from "./MobileBar.style";

function MobileBar() {
  const isLogin = true;
  return (
    <BarWrapper>
      <Bar>
        <img src="./images/hambuger.svg" alt="menu" />
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
  );
}

export default MobileBar;
