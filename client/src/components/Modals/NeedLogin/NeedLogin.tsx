import { Link } from "react-router-dom";
import {
  ModalBackground,
  ModalContainer,
  TitleWrapper,
  Title,
  BtnContainer,
  BlackBtn,
  WhiteBtn,
} from "./NeedLogin.style";

interface IProps {
  setIsOpened: (bool: boolean) => void;
}

function NeedLogin({ setIsOpened }: IProps) {
  return (
    <ModalBackground>
      <ModalContainer>
        <TitleWrapper>
          <Title>로그인이 필요합니다.</Title>
        </TitleWrapper>
        <BtnContainer>
          <Link to={"/Login"}>
            <BlackBtn>로그인</BlackBtn>
          </Link>
          <WhiteBtn onClick={() => setIsOpened(false)}>취소</WhiteBtn>
        </BtnContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default NeedLogin;
