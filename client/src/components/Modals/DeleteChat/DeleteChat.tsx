import {
  ModalBackground,
  ModalContainer,
  TitleWrapper,
  Title,
  BtnContainer,
  BlackBtn,
  WhiteBtn,
} from "../DeletePost/DeletePost.style";
interface IProps {
  setIsOpened: (bool: boolean) => void;
}
function DeletePost({ setIsOpened }: IProps) {
  return (
    <>
      <ModalBackground>
        <ModalContainer>
          <TitleWrapper>
            <Title>정말 삭제 하시겠습니까?</Title>
          </TitleWrapper>
          <BtnContainer>
            <BlackBtn onClick={() => setIsOpened(false)}>확인</BlackBtn>
            <WhiteBtn onClick={() => setIsOpened(false)}>취소</WhiteBtn>
          </BtnContainer>
        </ModalContainer>
      </ModalBackground>
    </>
  );
}

export default DeletePost;
