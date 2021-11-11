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
import { useSelector, useDispatch } from "react-redux";
import KakaoMap from "../../../components/KakaoMap/KakaoMap";
import DeletePost from "../../../components/Modals/DeletePost/DeletePost";
import Timer from "../../../components/Timer/Timer";
import PostComment from "../../../components/PostComment/PostComment";
import { useLocation } from "react-router";
import DetailCategories from "../../../components/DetailCategories/DetailCategories";
import { initMainCategories } from "../Categories";
import { Link } from "react-router-dom";
import { isMineTrue, isMineFalse } from "../../../reducers/isMineReducer";
import NeedLogin from "../../../components/Modals/NeedLogin/NeedLogin";

interface User {
  email: string;
  imagePath: null | string;
  nickname: string;
}

interface Category {
  categoryId: number;
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
  post_categories: Category[];
}

function DetailPage() {
  const dispatch = useDispatch();
  let { id } = useSelector((state: RootState) => state.userReducer);
  let { accessToken, isLogin } = useSelector(
    (state: RootState) => state.authReducer
  );
  let { isMine } = useSelector((state: RootState) => state.isMineReducer);
  let location: any = useLocation();
  // 로그인이 필요합니다 모달창
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // 게시글 정보
  const [postData, setPostData] = useState<PostDataType>();
  const [commentData, setCommentData] = useState<any[]>();
  const [dueDate, setDueDate] = useState<string>();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string>("");
  const [delTargetId, setDelTargetId] = useState<number>(0);
  const [likes, setLikes] = useState<string>();
  const [likepost, setLikepost] = useState<boolean>(false);
  let time;
  if (dueDate !== undefined) {
    time = dueDate[1].slice(0, 2);
    if (Number(time) >= 12) {
      time = `오후 ${Number(dueDate[1].slice(0, 2)) - 12}시`;
    } else {
      time = `오전 ${dueDate[1].slice(0, 2)}시`;
    }
  }

  // imagePath의 배열과 Handle에서 사용할 인덱스 state
  const [images, setImages] = useState<string[]>([""]);
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
    if (isLogin) {
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
    } else {
      setIsOpened(true);
    }
  };

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

  const [categoryLink, setCategoryLink] = useState<any>({});

  const initSet = async () => {
    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/${location.state.postId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result !== undefined) {
      if (result.data.postGet.userId === id) {
        dispatch(isMineTrue());
      } else {
        dispatch(isMineFalse());
      }
      setPostData(result.data.postGet);
      setLikes(result.data.postLike);
      setDueDate(result.data.postGet.dueDate.split(","));
      setImages(result.data.postGet.imagePath.split(","));
    }
  };

  useEffect(() => {
    // 페이지 마운트 시에 post 정보 요청
    initSet();
    // 페이지 마운트 시에 comment 정보 요청
    getComment(location.state.postId);
  }, []);

  useEffect(() => {
    return () => {
      if (postData !== undefined) {
        if (postData.userId === id) {
          dispatch(isMineTrue());
        } else {
          dispatch(isMineFalse());
        }
      }
    };
  }, []);

  useEffect(() => {
    let category1: string[] = [];
    let category2: string[] = [];
    if (postData !== undefined) {
      initMainCategories.forEach((mainCategory) => {
        mainCategory.subCategories.forEach((subCategory) => {
          postData.post_categories.forEach((userCategory: any) => {
            if (userCategory.categoryId === subCategory.id) {
              category1.push(mainCategory.id);
              category2.push(subCategory.name);
            }
          });
        });
      });
      // 카테고리 세팅
      let newCategoryLink: any = {};
      for (let i = 0; i < category1.length; i++) {
        if (newCategoryLink[category1[i]] === undefined) {
          newCategoryLink[category1[i]] = [];
          newCategoryLink[category1[i]].push(category2[i]);
        } else {
          newCategoryLink[category1[i]].push(category2[i]);
        }
      }
      setCategoryLink(newCategoryLink);
      // if (postData.userId === id) {
      //   dispatch(setIsMineTrue());
      // } else {
      //   dispatch(setIsMineFalse());
      // }
    }
  }, [postData]);

  const deletePostHandle = (target: string, commentId: number): void => {
    setIsDeleteModal(!isDeleteModal);
    setDeleteTarget(target);
    setDelTargetId(commentId);
  };
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

  // useEffect(() => {
  //   if (postData !== undefined) {
  //     storageInfo.map((el) => {
  //       if (el.id === postData.id) {
  //         setLikepost(true);
  //       }
  //     });
  //   }
  // }, [postData]);

  const likeHandle = () => {
    if (postData !== undefined) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/storage/${postData.id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            axios({
              method: "delete",
              url: `${process.env.REACT_APP_API_URL}/storage/${postData.id}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }).then((res) => {
              setLikepost(false);
            });
          }
          setLikepost(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Body>
      {isOpened ? (
        <NeedLogin setIsOpened={(bool: boolean) => setIsOpened(bool)} />
      ) : null}
      <MainArea>
        {postData !== undefined && commentData !== undefined ? (
          <DetailPageContainer>
            {/* 제목 칸 HEADER ----------------------------------------------------*/}
            <TitleArea>
              <div className="Post_Title">{postData.title}</div>
              {isMine ? (
                <div className="Edit_Delete">
                  <Link
                    to={{
                      pathname: `/editpost`,
                      state: {
                        postData: postData,
                      },
                    }}
                  >
                    <span>
                      <EditPencilIcon color={"#2d2d2d"} />
                    </span>
                  </Link>
                  <span onClick={() => deletePostHandle("post", postData.id)}>
                    <DeleteIcon color={"#2d2d2d"} />
                  </span>
                </div>
              ) : (
                <></>
              )}
            </TitleArea>
            <LikeAndCommentIconArea>
              <div onClick={() => likeHandle()}>
                <LikeIcon isCheck={likepost} />
              </div>
              <span>{likes}개</span>
              <img src={"./images/commentMark.svg"} alt="Comment_Mark" />
              <span>{commentData.length}개</span>
            </LikeAndCommentIconArea>
            <PostContentsArea>
              {/* 유저가 올린 사진----------------------------------------------------*/}
              <PhotoBox>
                {images[0] !== "" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <img
                      className="Photo_Slide_Button"
                      src="./images/arrowLeft.svg"
                      alt="Photo_Slide_Left"
                      onClick={() => imagesHandle("leftArrow")}
                    />

                    <Photo>
                      <img src={"./images/noImage.svg"} alt="NoImg" />
                    </Photo>
                    <img
                      className="Photo_Slide_Button"
                      src="./images/arrowRight.svg"
                      alt="Photo_Slide_Right"
                      onClick={() => imagesHandle("rightArrow")}
                    />
                  </>
                )}
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
                  {isLogin ? (
                    <Link to="/preparation" style={{ textDecoration: "none" }}>
                      <ChatBox>
                        <ChatIcon>
                          <img src="/images/send.svg" alt="send"></img>
                        </ChatIcon>
                        <span>채팅하기</span>
                      </ChatBox>
                    </Link>
                  ) : (
                    <ChatBox onClick={() => setIsOpened(true)}>
                      <ChatIcon>
                        <img src="/images/send.svg" alt="send"></img>
                      </ChatIcon>
                      <span>채팅하기</span>
                    </ChatBox>
                  )}
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
                {/* 카테고리 미리보기 컴포넌트----------------------------------------------------*/}
                <DetailCategories categoryLink={categoryLink} isMine={isMine} />
              </ContentsBox>
            </PostContentsArea>
            {/* 카카오맵 ----------------------------------------------------*/}
            <MapArea>
              <AddressArea>
                <AddressIcon>
                  <MapMarkIcon color={"#2d2d2d"} />
                </AddressIcon>
                <span className="Address_Title">장소</span>
                <span className="Address">{postData.address}</span>
              </AddressArea>
              <div className="Kakao_Map">
                <KakaoMap addressInput={postData.address} />
              </div>
            </MapArea>
            {/* 댓글 Input----------------------------------------------------*/}
            <CommentArea>
              <div className="Comment_Top_Area">
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
                    disabled={commentInput.length < 1}
                    onClick={() => {
                      submitComment();
                    }}
                  >
                    등록
                  </SubmitCommentBtn>
                </div>
              </div>
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
            </CommentArea>
            {/* 삭제하시겠습니다 Modal ----------------------------------------------------*/}
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
          </DetailPageContainer>
        ) : (
          <></>
        )}
      </MainArea>
    </Body>
  );
}

export default DetailPage;
