import React from "react";
import { Container, CardContainer } from "./MyFavoritePost.style";
import { RootState } from "../../reducers/rootReducer";
import { useSelector } from "react-redux";

function MyFavoritePost() {
  const { myStorage } = useSelector((state: RootState) => state.userReducer);

  return (
    <Container>
      {myStorage === 0 ? (
        // 내가 찜한 게시글이 0개일 때
        <CardContainer>
          <div>찜한</div>
          <div>게시글이 없습니다.</div>
        </CardContainer>
      ) : (
        <CardContainer>
          <div>찜한</div>
          <div>게시글이 없습니다.</div>
        </CardContainer>
      )}
    </Container>
  );
}

export default MyFavoritePost;
