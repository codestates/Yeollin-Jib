import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers/rootReducer";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ModalBackground,
  ModalContainer,
  TitleWrapper,
  Title,
  BtnContainer,
  BlackBtn,
  WhiteBtn,
} from "./Logout.style";
import { setLogOut } from "../../../reducers/authReducer";

interface IProps {
  setIsOpened: (bool: boolean) => void;
}
function Logout({ setIsOpened }: IProps) {
  // 저장된 토큰값을 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  // 로그아웃 완료
  const handleSubmitBtn = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/logout`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200) {
      // 성공적으로 로그아웃 했을 경우
      dispatch(setLogOut());
      setIsOpened(false);
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <TitleWrapper>
          <Title>정말 로그아웃 하시겠습니까?</Title>
        </TitleWrapper>
        <BtnContainer>
          <Link to={"/main"}>
            <BlackBtn onClick={() => handleSubmitBtn()}>확인</BlackBtn>
          </Link>
          <WhiteBtn onClick={() => setIsOpened(false)}>취소</WhiteBtn>
        </BtnContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Logout;
