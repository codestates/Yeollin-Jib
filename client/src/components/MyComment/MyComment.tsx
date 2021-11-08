import { useEffect, useState } from "react";
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
import axios from "axios";
import { Link } from "react-router-dom";

function MyComment() {
  // 스토어에 저장된 엑세스토큰과 myComment의 개수를 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const { myComment } = useSelector((state: RootState) => state.userReducer);

  // 내가 쓴 댓글의 정보를 담을 배열
  const [commentInfo, setCommentInfo] = useState<any[]>([]);

  // 내가 쓴 댓글 정보를 받아오는 axios 요청
  const getCommentData = async () => {
    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/comment/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (result !== undefined) {
      setCommentInfo(result.data.data);
    }
  };

  // myComment 컴포넌트가 마운트될 때 호출
  useEffect(() => {
    getCommentData();
  }, []);

  const scrollHandler = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <>
      {myComment === 0 ? (
        // 내가 작성한 댓글이 0개일 때
        <CardContainer isContent={myComment !== 0 ? true : false}>
          <div>작성하신 댓글이 없습니다.</div>
        </CardContainer>
      ) : (
        // 댓글을 최신순으로 정렬하기 위해 reverse() 사용
        commentInfo
          .slice(0)
          .reverse()
          .map((commentInfo) => {
            return (
              <Link
                to={{
                  pathname: `/detail`,
                  state: {
                    postId: commentInfo.postId,
                  },
                }}
                style={{ textDecoration: "none", color: "#2d2d2d" }}
                onClick={() => scrollHandler()}
              >
                <CardContainer
                  key={commentInfo.id}
                  isContent={myComment !== 0 ? true : false}
                >
                  <TitleContainer>
                    <Title>{commentInfo.post.title}</Title>
                    <Date>
                      {commentInfo.post.dueDate
                        .slice(0, 10)
                        .replace(/-/g, ". ")}
                    </Date>
                  </TitleContainer>
                  <CommentContainer>
                    <Comment>{commentInfo.contents}</Comment>
                  </CommentContainer>
                </CardContainer>
              </Link>
            );
          })
      )}
    </>
  );
}

export default MyComment;
