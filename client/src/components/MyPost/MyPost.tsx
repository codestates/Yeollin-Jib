import { useState, useEffect } from "react";
import { Container, CardContainer } from "./MyPost.style";
import { RootState } from "../../reducers/rootReducer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import PostCard from "../PostCard/PostCard";

function MyPost() {
  // 스토어에 저장된 엑세스토큰과 myComment의 개수를 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const { id, myPost, nickname, imagePath } = useSelector(
    (state: RootState) => state.userReducer
  );

  // 내가 쓴 게시물의 정보를 담을 배열
  const [postInfo, setPostInfo] = useState<any[]>([]);

  // 내가 쓴 댓글 정보를 받아오는 axios 요청
  const getPostData = async () => {
    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (result !== undefined) {
      setPostInfo(result.data.postGet.rows);
    }
  };

  // 프로필 사진이나 닉네임이 변경된 경우 이를 반영하여 호출
  useEffect(() => {
    getPostData();
  }, [nickname, imagePath]);

  return (
    <Container>
      {myPost === 0 ? (
        // 내가 작성한 게시글이 0개일 때
        <CardContainer isContent={myPost !== 0 ? true : false}>
          <div>작성하신</div>
          <div>게시글이 없습니다.</div>
        </CardContainer>
      ) : (
        postInfo.map((postInfo, idx) => {
          return (
            <>
              <CardContainer isContent={myPost !== 0 ? true : false}>
                <Link
                  to={{
                    pathname: `/detail`,
                    state: {
                      postId: postInfo.id,
                    },
                  }}
                  key={postInfo.id}
                  style={{ textDecoration: "none", color: "#2d2d2d" }}
                >
                  <PostCard idx={idx} postInfo={postInfo}></PostCard>
                </Link>
              </CardContainer>
            </>
          );
        })
      )}
    </Container>
  );
}

export default MyPost;
