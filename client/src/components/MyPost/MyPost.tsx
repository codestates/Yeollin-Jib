import React from "react";
import { Container, CardContainer } from "./MyPost.style";
import { RootState } from "../../reducers/rootReducer";
import { useSelector } from "react-redux";

function MyPost() {
  const { myPost } = useSelector((state: RootState) => state.userReducer);

  return (
    <Container>
      {myPost === 0 ? (
        // 내가 작성한 게시글이 0개일 때
        <CardContainer>
          <div>작성하신</div>
          <div>게시글이 없습니다.</div>
        </CardContainer>
      ) : (
        <CardContainer>
          <div>작성하신</div>
          <div>게시글이 없습니다.</div>
        </CardContainer>
      )}
    </Container>
  );
}

export default MyPost;
