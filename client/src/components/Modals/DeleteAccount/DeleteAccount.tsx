import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers/rootReducer";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  ModalBackground,
  ModalContainer,
  TitleWrapper,
  Title,
  BtnContainer,
  BlackBtn,
  WhiteBtn,
} from "./DeleteAccount.style";
import { setLogOut } from "../../../reducers/authReducer";

interface IProps {
  setIsOpened: (bool: boolean) => void;
}
function DeleteAccount({ setIsOpened }: IProps) {
  // 회원 탈퇴 시 unmount 할 때 동작
  useEffect(() => {
    return () => setIsOpened(false);
  }, []);
  // 저장된 토큰값을 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  // 로그인 상태를 가져옴
  const { isLogin } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  // 탈퇴 완료
  const handleSubmitBtn = async () => {
    const result = await axios.delete(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (result.status === 200) {
      // 성공적으로 탈퇴 했을 경우
      dispatch(setLogOut());
    }
  };

  return (
    <>
      {isLogin ? (
        <ModalBackground>
          <ModalContainer>
            <TitleWrapper>
              <Title>정말 탈퇴 하시겠습니까?</Title>
            </TitleWrapper>
            <BtnContainer>
              <BlackBtn onClick={() => handleSubmitBtn()}>확인</BlackBtn>
              <WhiteBtn onClick={() => setIsOpened(false)}>취소</WhiteBtn>
            </BtnContainer>
          </ModalContainer>
        </ModalBackground>
      ) : (
        <Redirect to="/main"></Redirect>
      )}
    </>
  );
}

export default DeleteAccount;
