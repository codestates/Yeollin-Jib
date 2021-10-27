import React from "react";
import { Container, CardContainer } from "./MyFavoritePost.style";

function MyFavoritePost() {
  return (
    <Container>
      <CardContainer>
        <div>찜한</div>
        <div>게시글이 없습니다.</div>
      </CardContainer>
    </Container>
  );
}

export default MyFavoritePost;
