import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteIcon, EditPencilIcon, LikeIcon } from "../../../icons/Icons";
import {
  Body,
  MainArea,
  DetailPageContainer,
  TitleArea,
  LikeAndCommentIconArea,
  PostContentsArea,
  PhotoBox,
  Photo,
  ContentsBox,
  ContentsUserBox,
  TextBox,
  Timer,
  DueDateBox,
  CategoryBox,
  MapArea,
  CommentArea,
  Comment,
  SubmitCommentBtn,
} from "./DetailPage.style";
import { RootState } from "../../../reducers/rootReducer";
import { useSelector } from "react-redux";
import KakaoMap from "../../../components/KakaoMap/KakaoMap";
import DeletePost from "../../../components/Modals/DeletePost/DeletePost";
import ShareCategories from "../../../components/Modals/ShareCategories/ShareCategories";

function DetailPage() {
  interface postDataType {
    id: number;
    userId: number;
    title: string;
    contents: string;
    imagePath: string;
    address: string;
    dueDate: string;
    latitude: string;
    longitude: string;
    createdAt: string;
  }
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const { id } = useSelector((state: RootState) => state.userReducer);
  // 게시글 정보
  const [postData, setPostData] = useState<postDataType>();
  const [dueDate, setDueDate] = useState<string>();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  // 내 게시글인지 확인
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/13`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setPostData(res.data.postGet);
        console.log(res.data.postGet);
        setDueDate(res.data.postGet.dueDate.split(",")[0]);
        if (res.data.postGet.userId === id) {
          setIsMine(true);
        }
      });
  }, []);
  const deletePostHandle = (): void => {
    setIsDeleteModal(!isDeleteModal);
  };
  return (
    <Body>
      <MainArea>
        {postData !== undefined ? (
          <DetailPageContainer>
            <TitleArea>
              <div className="Post_Title">{postData.title}</div>
              {isMine ? (
                <div className="Edit_Delete">
                  <span>
                    <EditPencilIcon color={"#2d2d2d"} />
                  </span>
                  <span onClick={() => deletePostHandle()}>
                    <DeleteIcon color={"#2d2d2d"} />
                  </span>
                </div>
              ) : (
                <></>
              )}
            </TitleArea>
            <LikeAndCommentIconArea>
              <LikeIcon />
              <span>{"2개"}</span>
              <img src={"./images/commentMark.svg"} alt="Comment_Mark" />
              <span>{"4개"}</span>
            </LikeAndCommentIconArea>
            <PostContentsArea>
              <PhotoBox>
                <img
                  className="Photo_Slide_Button"
                  src="./images/arrowLeft.svg"
                  alt="Photo_Slide_Left"
                />
                <Photo>
                  <img
                    src={`http://localhost:80/${postData.imagePath}`}
                    alt="Post_Photo"
                  />
                </Photo>
                <img
                  className="Photo_Slide_Button"
                  src="./images/arrowRight.svg"
                  alt="Photo_Slide_Right"
                />
              </PhotoBox>
              <ContentsBox>
                <ContentsUserBox></ContentsUserBox>
                <TextBox>
                  <div className="Create_Post_Date">
                    작성일
                    <span className="Date">
                      {postData.createdAt.slice(0, 10)}
                    </span>
                  </div>
                  {postData.contents}
                </TextBox>
                <Timer>
                  <div className="Due_Date_Icon_Box">
                    <img
                      className="Due_Date_Icon"
                      src="./images/clock.svg"
                      alt="dueDate"
                    />
                  </div>
                  <div className="Due_Time">{""}</div>
                </Timer>
                <DueDateBox>
                  <span className="Due_Date_Word">마감</span>
                  <span className="Due_Date">
                    {dueDate !== undefined
                      ? `${dueDate.split("-")[0]}년 ${
                          dueDate.split("-")[1]
                        }월 ${dueDate.split("-")[2]}일`
                      : "날짜정보가 없습니다"}
                  </span>
                </DueDateBox>
                <CategoryBox></CategoryBox>
              </ContentsBox>
            </PostContentsArea>
            <MapArea>
              <KakaoMap addressInput={postData.address} />
            </MapArea>
            <CommentArea>
              <div className="Comment_Word"></div>
              <div className="Comment_Box">
                <Comment />
                <SubmitCommentBtn>등록</SubmitCommentBtn>
              </div>
            </CommentArea>
            {isDeleteModal ? (
              <DeletePost
                setIsDeleteModal={setIsDeleteModal}
                postId={postData.id}
              />
            ) : (
              <></>
            )}
            {false ? <ShareCategories isMine={isMine} /> : <></>}
          </DetailPageContainer>
        ) : (
          <></>
        )}
      </MainArea>
    </Body>
  );
}

export default DetailPage;
