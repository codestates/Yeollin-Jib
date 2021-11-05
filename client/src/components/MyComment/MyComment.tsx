import React from "react";
import {
  CardContainer,
  TitleContainer,
  Title,
  Date,
  CommentContainer,
  Comment,
} from "./MyComment.style";
import { RootState } from "../../reducers/rootReducer";
import { useSelector } from "react-redux";

function MyComment() {
  const { myComment } = useSelector((state: RootState) => state.userReducer);

  return (
    <>
      {myComment !== 0 ? (
        // 내가 작성한 댓글이 0개일 때
        <CardContainer isContent={myComment !== 0 ? true : false}>
          <div>작성하신 댓글이 없습니다.</div>
        </CardContainer>
      ) : (
        <>
          <CardContainer isContent={myComment !== 0 ? true : false}>
            <TitleContainer>
              <Title>고양이 관련 물품들 나눔합니다.</Title>
              <Date>2021.10.11</Date>
            </TitleContainer>
            <CommentContainer>
              <Comment>안녕하세요! 고양이 사진 보여주세요!</Comment>
            </CommentContainer>
          </CardContainer>
        </>
      )}
    </>
  );
}

export default MyComment;
