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
import { dbInitMainCategories } from "../Categories";
import { Link } from "react-router-dom";
import { isMineTrue, isMineFalse } from "../../../reducers/isMineReducer";
import NeedLogin from "../../../components/Modals/NeedLogin/NeedLogin";
import {
  setPlusMyStorage,
  setMinusMyStorage,
} from "../../../reducers/userReducer";

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
  const { isLogin, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );
  if (!isLogin) {
    id = 0;
  }
  let { isMine } = useSelector((state: RootState) => state.isMineReducer);

  let location: any = useLocation();
  // ???????????? ??????????????? ?????????
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // ????????? ??????
  const [postData, setPostData] = useState<PostDataType>();
  const [commentData, setCommentData] = useState<any[]>();
  const [dueDate, setDueDate] = useState<string>();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string>("");
  const [delTargetId, setDelTargetId] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);

  let time;
  if (dueDate !== undefined) {
    time = dueDate[1].slice(0, 2);
    if (Number(time) >= 12) {
      time = `?????? ${Number(dueDate[1].slice(0, 2)) - 12}???`;
    } else {
      time = `?????? ${dueDate[1].slice(0, 2)}???`;
    }
  }

  // imagePath??? ????????? Handle?????? ????????? ????????? state
  const [images, setImages] = useState<string[]>([""]);
  const [imagesSelect, setImagesSelect] = useState<number>(0);

  // ?????? ????????? ????????? Handle
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
  interface Storage {
    userId: number;
  }
  const [categoryLink, setCategoryLink] = useState<any>({});
  const [storageList, setStorageList] = useState<Storage[]>([]);

  const initSet = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${location.state.postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        console.log(res);
        console.log(id);
        if (res.data.postGet.userId === id) {
          dispatch(isMineTrue());
        } else {
          dispatch(isMineFalse());
        }
        setPostData(res.data.postGet);
        setLikes(res.data.postLike);
        setDueDate(res.data.postGet.dueDate.split(","));
        setImages(res.data.postGet.imagePath.split(","));
        setStorageList(res.data.postGet.storages);
      });
  };
  const [mainCategories, setMainCategories] = useState(dbInitMainCategories);
  useEffect(() => {
    let category1: string[] = [];
    let category2: string[] = [];
    let categoryBoolean: boolean[] = [];
    if (postData !== undefined) {
      mainCategories.forEach((mainCategory) => {
        mainCategory.subCategories.forEach((subCategory) => {
          postData.post_categories.forEach((userCategory: any) => {
            if (userCategory.categoryId === subCategory.id) {
              category1.push(mainCategory.id);
              category2.push(subCategory.name);
              categoryBoolean.push(userCategory.Boolean);
            }
          });
        });
      });

      // ???????????? ??????
      let newCategoryLink: any = {};
      for (let i = 0; i < category1.length; i++) {
        const setCateAndBool: any = {};
        setCateAndBool["cateId"] = category2[i];
        setCateAndBool["cateBool"] = categoryBoolean[i];
        if (newCategoryLink[category1[i]] === undefined) {
          newCategoryLink[category1[i]] = [];
          newCategoryLink[category1[i]].push(setCateAndBool);
        } else {
          newCategoryLink[category1[i]].push(setCateAndBool);
        }
      }
      setCategoryLink(newCategoryLink);
    }
  }, [postData]);

  const [isMyStorage, setIsMyStorage] = useState<boolean>(false);

  useEffect(() => {
    // ????????? ????????? ?????? post ?????? ??????
    initSet();

    // ????????? ????????? ?????? comment ?????? ??????
    getComment(location.state.postId);
  }, [mainCategories]);

  useEffect(() => {
    if (storageList) {
      storageList.map((storage) => {
        if (storage.userId === id) {
          setIsMyStorage(true);
        }
      });
    }
  }, [storageList]);

  const deletePostHandle = (target: string, commentId: number): void => {
    setIsDeleteModal(!isDeleteModal);
    setDeleteTarget(target);
    setDelTargetId(commentId);
  };

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
          if (res.status === 201) {
            setIsMyStorage(true);
            dispatch(setPlusMyStorage());
            setLikes(likes + 1);
          } else if (res.status === 200) {
            axios({
              method: "delete",
              url: `${process.env.REACT_APP_API_URL}/storage/${postData.id}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }).then((res) => {
              setIsMyStorage(false);
              dispatch(setMinusMyStorage());
              setLikes(likes - 1);
            });
          }
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
            {/* ?????? ??? HEADER ----------------------------------------------------*/}
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
              {isLogin ? (
                <div onClick={() => likeHandle()}>
                  <LikeIcon isCheck={isMyStorage} />
                </div>
              ) : (
                <div onClick={() => setIsOpened(true)}>
                  <LikeIcon isCheck={isMyStorage} />
                </div>
              )}
              <span>{likes}???</span>
              <img src={"./images/commentMark.svg"} alt="Comment_Mark" />
              <span>{commentData.length}???</span>
            </LikeAndCommentIconArea>
            <PostContentsArea>
              {/* ????????? ?????? ??????----------------------------------------------------*/}
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
                {/* ????????? ?????? ?????? ??????----------------------------------------------------*/}
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
                        <span>????????????</span>
                      </ChatBox>
                    </Link>
                  ) : (
                    <ChatBox onClick={() => setIsOpened(true)}>
                      <ChatIcon>
                        <img src="/images/send.svg" alt="send"></img>
                      </ChatIcon>
                      <span>????????????</span>
                    </ChatBox>
                  )}
                </ContentsUserBox>
                <TextBox>
                  <div className="Create_Post_Date">
                    ?????????
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
                  <span className="Due_Date_Word">??????</span>
                  <span className="Due_Date">
                    {dueDate !== undefined
                      ? `${dueDate[0].split("-")[0]}??? ${
                          dueDate[0].split("-")[1]
                        }??? ${dueDate[0].split("-")[2]}??? ${time}`
                      : "??????????????? ????????????"}
                  </span>
                </DueDateBox>
                {/* ???????????? ???????????? ????????????----------------------------------------------------*/}
                <DetailCategories
                  categoryLink={categoryLink}
                  isMine={isMine}
                  postId={postData.id}
                  mainCategories={mainCategories}
                  setMainCategories={setMainCategories}
                />
              </ContentsBox>
            </PostContentsArea>
            {/* ???????????? ----------------------------------------------------*/}
            <MapArea>
              <AddressArea>
                <AddressIcon>
                  <MapMarkIcon color={"#2d2d2d"} />
                </AddressIcon>
                <span className="Address_Title">??????</span>
                <span className="Address">{postData.address}</span>
              </AddressArea>
              <div className="Kakao_Map">
                <KakaoMap addressInput={postData.address} />
              </div>
            </MapArea>
            {/* ?????? Input----------------------------------------------------*/}
            <CommentArea>
              <div className="Comment_Top_Area">
                <CommentWordArea>
                  <img src={"./images/commentMark.svg"} alt="Comment_Mark" />
                  <span className="Comment_Word">??????</span>
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
                    ??????
                  </SubmitCommentBtn>
                </div>
              </div>
              {/* ?????? ?????????----------------------------------------------------*/}
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
            {/* ???????????????????????? Modal ----------------------------------------------------*/}
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
