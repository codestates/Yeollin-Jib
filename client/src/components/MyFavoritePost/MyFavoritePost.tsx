import { useState, useEffect } from "react";
import { Container, CardContainer } from "./MyFavoritePost.style";
import { RootState } from "../../reducers/rootReducer";
import { useSelector } from "react-redux";
import axios from "axios";
import PostCard from "../PostCard/PostCard";

function MyFavoritePost(userStorage: any) {
  // 스토어에 저장된 정보를 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const { myStorage, nickname, imagePath } = useSelector(
    (state: RootState) => state.userReducer
  );

  // 내가 찜한 게시물의 정보를 담을 배열
  const [storageInfo, setStorageInfo] = useState<any[]>([]);

  // 내가  찜한 게시물를 받아오는 axios 요청
  const getStorageData = async () => {
    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/storage`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (result !== undefined) {
      setStorageInfo(result.data.postGet.rows);
    }
  };

  // 닉네임이나 프로필이미지가 바뀌면 포스트카드에 변경 사항을 반영
  // 마이페이지에서 변화된 userStorage가 감지되었을 경우 변경 사항 반영
  useEffect(() => {
    if (myStorage !== 0 || userStorage !== myStorage) {
      getStorageData();
    }
  }, [nickname, imagePath, userStorage]);

  return (
    <Container>
      {myStorage === 0 ? (
        // 내가 찜한 게시글이 0개일 때
        <CardContainer isContent={myStorage !== 0 ? true : false}>
          <div>찜한</div>
          <div>게시글이 없습니다.</div>
        </CardContainer>
      ) : (
        storageInfo.map((storageInfo, idx) => {
          return (
            <CardContainer
              key={storageInfo.id}
              isContent={myStorage !== 0 ? true : false}
            >
              <PostCard idx={idx} postInfo={storageInfo}></PostCard>
            </CardContainer>
          );
        })
      )}
    </Container>
  );
}

export default MyFavoritePost;
