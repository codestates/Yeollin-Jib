import axios from "axios";
import { useEffect, useState } from "react";
import {
  DeleteIcon,
  EditPencilIcon,
  LikeIcon,
  MapMarkIcon,
} from "../../../icons/Icons";
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
  TimerArea,
  DueDateBox,
  CategoryBox,
  MapArea,
  CommentArea,
  CommentWordArea,
  CommentInput,
  SubmitCommentBtn,
  UserProfileBox,
  UserInfoBox,
  ChatBox,
  ChatIcon,
  AddressArea,
  AddressIcon,
  CommentList,
} from "./DetailPage.style";

import { RootState } from "../../../reducers/rootReducer";
import { useSelector } from "react-redux";
import KakaoMap from "../../../components/KakaoMap/KakaoMap";
import DeletePost from "../../../components/Modals/DeletePost/DeletePost";
import ShareCategories from "../../../components/Modals/ShareCategories/ShareCategories";
import { useLocation } from "react-router";
import Timer from "../../../components/Timer/Timer";
import PostComment from "../../../components/PostComment/PostComment";
import { useHistory } from "react-router";

interface User {
  email: string;
  imagePath: null | string;
  nickname: string;
}

interface PostDataType {
  id: number;
  userId: number;
  user: User;
  title: string;
  contents: string;
  imagePath: string;
  address: string;
  dueDate: string;
  latitude: string;
  longitude: string;
  createdAt: string;
}

interface IsMineType {
  isMine: true | false;
}

function DetailPage() {
  const { id } = useSelector((state: RootState) => state.userReducer);
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  let location: any = useLocation();
  const history = useHistory();

  // 게시글 정보
  const [postData, setPostData] = useState<PostDataType>();
  const [commentData, setCommentData] = useState<any[]>();
  const [dueDate, setDueDate] = useState<string>();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string>("");
  const [delTargetId, setDelTargetId] = useState<number>(0);

  let time;
  if (dueDate !== undefined) {
    time = dueDate[1].slice(0, 2);
    if (Number(time) >= 12) {
      time = `오후 ${Number(dueDate[1].slice(0, 2)) - 12}시`;
    } else {
      time = `오전 ${dueDate[1].slice(0, 2)}시`;
    }
  }
  // 내 게시글인지 확인
  const [isMine, setIsMine] = useState<IsMineType>({ isMine: true });

  // imagePath의 배열과 Handle에서 사용할 인덱스 state
  const [images, setImages] = useState<string[]>(["noImage"]);
  const [imagesSelect, setImagesSelect] = useState<number>(0);

  // 사진 좌우로 넘기는 Handle
  const imagesHandle = (name: string) => {
    if (name === "rightArrow" && imagesSelect < images.length - 1) {
      setImagesSelect(imagesSelect + 1);
    } else if (name === "leftArrow" && imagesSelect > 0) {
      setImagesSelect(imagesSelect - 1);
    }
  };

  // Comment Input => State, Handle
  const [commentInput, setCommentInput] = useState<string>("");

  const commentInputHandle = (value: string) => {
    setCommentInput(value);
  };

  const submitComment = () => {
    if (postData !== undefined) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/comment/${postData.id}`,
          { contents: commentInput },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          if (res.status === 200 && commentData !== undefined) {
            setCommentData([...commentData, res.data.data]);
            setCommentInput("");
          }
        });
    }
  };
  const postIdProps = location.state.postId;
  const getComment = (postId: number) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/comment/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setCommentData(res.data.data);
      });
  };

  useEffect(() => {
    // postId props없이 페이지에 진입했을때 뒤로가기 진행
    if (location.state === undefined) {
      history.go(-1);
    }
    // 페이지 마운트 시에 post 정보 요청
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${location.state.postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        setPostData(res.data.postGet);
        setDueDate(res.data.postGet.dueDate.split(","));
        setImages(res.data.postGet.imagePath.split(","));
        if (res.data.postGet.userId === id) {
          setIsMine({ isMine: true });
        }
      });
    // 페이지 마운트 시에 comment 정보 요청
    getComment(postIdProps);
  }, []);
  const deletePostHandle = (target: string, commentId: number): void => {
    setIsDeleteModal(!isDeleteModal);
    setDeleteTarget(target);
    setDelTargetId(commentId);
  };
  return (
    <Body>
      <MainArea>
        {postData !== undefined && commentData !== undefined ? (
          <DetailPageContainer>
            {/* 제목 칸 HEADER ----------------------------------------------------*/}
            <TitleArea>
              <div className="Post_Title">{postData.title}</div>
              {isMine.isMine && isMine.isMine !== undefined ? (
                <div className="Edit_Delete">
                  <span>
                    <EditPencilIcon color={"#2d2d2d"} />
                  </span>
                  <span onClick={() => deletePostHandle("post", postData.id)}>
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
              <span>{commentData.length}개</span>
            </LikeAndCommentIconArea>
            <PostContentsArea>
              {/* 유저가 올린 사진----------------------------------------------------*/}
              <PhotoBox>
                <img
                  className="Photo_Slide_Button"
                  src="./images/arrowLeft.svg"
                  alt="Photo_Slide_Left"
                  onClick={() => imagesHandle("leftArrow")}
                />

                <Photo>
                  <img
                    src={`${process.env.REACT_APP_API_URL}${images[
                      imagesSelect
                    ].slice(6)}`}
                    alt="Post_Photo"
                  />
                </Photo>
                <img
                  className="Photo_Slide_Button"
                  src="./images/arrowRight.svg"
                  alt="Photo_Slide_Right"
                  onClick={() => imagesHandle("rightArrow")}
                />
              </PhotoBox>
              <ContentsBox>
                {/* 게시글 올린 유저 정보----------------------------------------------------*/}
                <ContentsUserBox>
                  <UserProfileBox>
                    {postData.user.imagePath ? (
                      !postData.user.imagePath.includes(":") ? (
                        <img
                          src={`${process.env.REACT_APP_API_URL}/uploads/${postData.user.imagePath}`}
                          alt="UserPhoto"
                        />
                      ) : (
                        <img src={postData.user.imagePath} alt="UserPhoto" />
                      )
                    ) : (
                      <img src="./images/profile.svg" alt="UserPhoto" />
                    )}
                    <UserInfoBox>
                      <div className="User_Name">{postData.user.nickname}</div>
                      <div className="User_Email">{postData.user.email}</div>
                    </UserInfoBox>
                  </UserProfileBox>
                  <ChatBox>
                    <ChatIcon>
                      <img src="/images/send.svg"></img>
                    </ChatIcon>
                    <span>채팅하기</span>
                  </ChatBox>
                </ContentsUserBox>
                <TextBox>
                  <div className="Create_Post_Date">
                    작성일
                    <span className="Date">
                      {postData.createdAt.slice(0, 10).replace(/-/g, ". ")}
                    </span>
                  </div>
                  {postData.contents}
                </TextBox>
                <TimerArea>
                  {dueDate !== undefined ? (
                    <Timer date={`${dueDate[0]} ${dueDate[1]}:00`} />
                  ) : (
                    <></>
                  )}
                  <div className="Due_Time"></div>
                </TimerArea>
                <DueDateBox>
                  <span className="Due_Date_Word">마감</span>
                  <span className="Due_Date">
                    {dueDate !== undefined
                      ? `${dueDate[0].split("-")[0]}년 ${
                          dueDate[0].split("-")[1]
                        }월 ${dueDate[0].split("-")[2]}일 ${time}`
                      : "날짜정보가 없습니다"}
                  </span>
                </DueDateBox>
                <CategoryBox></CategoryBox>
              </ContentsBox>
            </PostContentsArea>
            <MapArea>
              <AddressArea>
                <AddressIcon>
                  <MapMarkIcon color={"#2d2d2d"} />
                </AddressIcon>
                <span className="Address_Title">장소</span>
                <span className="Address">{postData.address}</span>
              </AddressArea>
              <div>
                <KakaoMap addressInput={postData.address} />
              </div>
            </MapArea>
            {/* 댓글 Input----------------------------------------------------*/}
            <CommentArea>
              <CommentWordArea>
                <img src={"./images/commentMark.svg"} alt="Comment_Mark" />
                <span className="Comment_Word">댓글</span>
              </CommentWordArea>
              <div className="Comment_Box">
                <CommentInput
                  value={commentInput}
                  onChange={(e) => {
                    commentInputHandle(e.target.value);
                  }}
                />
                <SubmitCommentBtn
                  onClick={() => {
                    submitComment();
                  }}
                >
                  등록
                </SubmitCommentBtn>
              </div>
            </CommentArea>
            {/* 댓글 리스트----------------------------------------------------*/}
            <CommentList>
              {commentData.map((comment) => {
                return (
                  <PostComment
                    key={comment.id}
                    commentData={comment}
                    deleteCommentHandle={deletePostHandle}
                  />
                );
              })}
            </CommentList>
            {isDeleteModal ? (
              <DeletePost
                setIsDeleteModal={setIsDeleteModal}
                delTargetId={delTargetId}
                deleteTarget={deleteTarget}
                getComment={getComment}
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
