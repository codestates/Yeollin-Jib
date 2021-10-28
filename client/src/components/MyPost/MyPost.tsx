import React from "react";
import { Container, CardContainer } from "./MyPost.style";

function MyPost() {
  return (
    <Container>
      <CardContainer>
        <div>작성하신</div>
        <div>게시글이 없습니다.</div>
      </CardContainer>
    </Container>
  );
}

export default MyPost;
