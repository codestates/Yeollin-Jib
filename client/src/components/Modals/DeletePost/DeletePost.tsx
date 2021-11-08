import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/rootReducer";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import {
  ModalBackground,
  ModalContainer,
  TitleWrapper,
  Title,
  BtnContainer,
  BlackBtn,
  WhiteBtn,
} from "./DeletePost.style";

interface IProps {
  setIsDeleteModal: (boolean: boolean) => void;

  deleteTarget: string;
  delTargetId: number;
}
function DeletePost({
  setIsDeleteModal,

  deleteTarget,
  delTargetId,
}: IProps) {
  // 저장된 토큰값을 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  // 삭제 완료
  const submitDelete = async () => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}/${deleteTarget}/${delTargetId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 201) {
      // 성공적으로 삭제 했을 경우
      setIsSuccess(true);
    } else if (result.status === 200) {
      setIsSuccess(true);
      history.go(0);
    }
  };

  return (
    <>
      {isSuccess && deleteTarget === "post" ? (
        <Redirect to="/main"></Redirect>
      ) : (
        <ModalBackground>
          <ModalContainer>
            <TitleWrapper>
              <Title>정말 삭제 하시겠습니까?</Title>
            </TitleWrapper>
            <BtnContainer>
              <BlackBtn onClick={() => submitDelete()}>확인</BlackBtn>
              <WhiteBtn onClick={() => setIsDeleteModal(false)}>취소</WhiteBtn>
            </BtnContainer>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
}

export default DeletePost;
