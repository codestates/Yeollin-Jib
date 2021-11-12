import { MapMarkIcon } from "../../icons/Icons";
import { initMainCategories } from "../../pages/MainPage/Categories";
import { useState } from "react";
import {
  PostCardContainer,
  PostCardImgBox,
  PostCardImg,
  PostCardTitle,
  PhotoCirclesBox,
  PhotoCircle,
  InfoBox,
  ProfileBox,
  PostCardUserProfile,
  ShareDate,
  PostCardAddress,
  PostCardImgBackground,
  CategoryCard,
  PostCardLikeBox,
  PostCardLike,
  CategoryBox,
  ShareDone,
} from "./PostCard.style";
import { RootState } from "../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  setPlusMyStorage,
  setMinusMyStorage,
} from "../../reducers/userReducer";
import NeedLogin from "../Modals/NeedLogin/NeedLogin";

interface Result {
  postInfo: any;
  idx: number;
}

function PostCard({ postInfo, idx }: Result) {
  const dispatch = useDispatch();

  // 로그인이 필요합니다 모달창
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { isLogin, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );
  let { id } = useSelector((state: RootState) => state.userReducer);

  if (!isLogin) {
    id = 0;
  }
  console.log("postCard", id);
  // 저장된 유저의 카테고리에서 중복 제거
  let ArrCategory: number[] = [];
  postInfo.post_categories.map((category: any) => {
    return initMainCategories.map((mainCate) => {
      return mainCate.subCategories.map((subCate) => {
        if (subCate.id === category.categoryId) {
          return ArrCategory.push(Number(mainCate.id));
        }
      });
    });
  });

  const uniqueArr = ArrCategory.filter((element, index) => {
    return ArrCategory.indexOf(element) === index;
  });

  // images중에 1번째 사진을 썸네일로 사용하고 사진개수만큼 circle을 추가 해주기위해 배열 생성
  let images: string[] = postInfo.imagePath.split(",");

  //주소 자르기
  const userArea = postInfo.address.split(" ");

  // 좋아요 상태
  const [isLike, setIsLike] = useState<boolean>();

  const timerLeft = postInfo.dueDate;

  useEffect(() => {
    postInfo.storages.map((user: any) => {
      if (user.userId === id) {
        setIsLike(true);
      }
      if (id === 0) {
        setIsLike(false);
      }
    });
  }, [isLogin]);

  const likeHandle = () => {
    if (isLogin) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/storage/${postInfo.id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            axios({
              method: "delete",
              url: `${process.env.REACT_APP_API_URL}/storage/${postInfo.id}`,
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }).then((res) => {
              setIsLike(false);
              dispatch(setMinusMyStorage());
            });
          }
          setIsLike(true);
          if (res.status === 201) {
            dispatch(setPlusMyStorage());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsOpened(true);
    }
  };

  const calculateTimeLeft = (date: string) => {
    // dueDate 형식은 "2021-11-07 01:39:40" 형식이거나 "2021.11.07 01:39:40" 형식 이어야 합니다.
    const difference = +new Date(date) - +new Date();
    let timeLeft: any = {};
    // 남은 시간이 존재할 경우 3일 이하로 시간, 3일 이상 디데이
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // 남은 시간이 존재하지 않을 경우 00:00 으로 설정
      timeLeft = {
        days: 0,
        hours: "0",
        minutes: "0",
      };
    }

    if (!timeLeft.days && timeLeft.hours === "0" && timeLeft.minutes === "0") {
      return "나눔 마감";
    } else if (timeLeft.days >= 3) {
      return `D-${timeLeft.days}`;
      // 시간이나 분이 한자리 수 일때 뒤에 0 붙여주기
    } else if (timeLeft.minutes < 10) {
      return `${timeLeft.days * 24 + timeLeft.hours}:0${timeLeft.minutes}`;
    } else if (timeLeft.days * 24 + timeLeft.hours < 10) {
      return `0${timeLeft.days * 24 + timeLeft.hours}:${timeLeft.minutes}`;
    } else if (
      timeLeft.minutes < 10 &&
      timeLeft.days * 24 + timeLeft.hours < 10
    ) {
      return `0${timeLeft.days * 24 + timeLeft.hours}:0${timeLeft.minutes}`;
    } else {
      return `${timeLeft.days * 24 + timeLeft.hours}:${timeLeft.minutes}`;
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timerLeft));

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(timerLeft));
  }, []);

  const scrollHandler = () => {
    window.scrollTo({ top: 0, left: 0 });
  };
  return (
    <>
      {isOpened ? (
        <NeedLogin setIsOpened={(bool: boolean) => setIsOpened(bool)} />
      ) : null}
      <PostCardContainer idx={idx}>
        <PostCardImgBox>
          {postInfo.imagePath ? (
            <PostCardImg
              src={`${process.env.REACT_APP_API_URL}${images[0].slice(6)}`}
              alt="PostImg"
            />
          ) : (
            <PostCardImg src={"./images/noImage.svg"} alt="PostImg" />
          )}
          <PostCardLikeBox>
            <PostCardLike>
              <path
                d="M15.2246 2.98517C14.989 2.43961 14.6493 1.94523 14.2244 1.5297C13.7993 1.11293 13.298 0.781735 12.7479 0.554114C12.1774 0.317149 11.5656 0.195856 10.9479 0.197278C10.0813 0.197278 9.23574 0.434583 8.50098 0.882825C8.3252 0.990052 8.1582 1.10783 8 1.23615C7.8418 1.10783 7.6748 0.990052 7.49902 0.882825C6.76426 0.434583 5.91875 0.197278 5.05215 0.197278C4.42812 0.197278 3.82344 0.316809 3.25215 0.554114C2.7002 0.78263 2.20273 1.11134 1.77559 1.5297C1.35019 1.94476 1.01037 2.43926 0.775391 2.98517C0.531055 3.55294 0.40625 4.15587 0.40625 4.77638C0.40625 5.36173 0.525781 5.97169 0.763086 6.5922C0.961719 7.11075 1.24648 7.64865 1.61035 8.19181C2.18691 9.05138 2.97969 9.94787 3.96406 10.8567C5.59531 12.3631 7.21074 13.4037 7.2793 13.4459L7.6959 13.7131C7.88047 13.8309 8.11777 13.8309 8.30234 13.7131L8.71895 13.4459C8.7875 13.402 10.4012 12.3631 12.0342 10.8567C13.0186 9.94787 13.8113 9.05138 14.3879 8.19181C14.7518 7.64865 15.0383 7.11075 15.2352 6.5922C15.4725 5.97169 15.592 5.36173 15.592 4.77638C15.5938 4.15587 15.4689 3.55294 15.2246 2.98517Z"
                fill={isLike ? "red" : "rgba(255, 255, 255, 0.5)"}
                onClick={() => likeHandle()}
              />
            </PostCardLike>
          </PostCardLikeBox>
          <PhotoCirclesBox>
            {images.map((image, idx) => {
              return <PhotoCircle key={`${idx}` + image} />;
            })}
          </PhotoCirclesBox>
          <Link
            to={{
              pathname: `/detail`,
              state: {
                postId: postInfo.id,
              },
            }}
            style={{
              textDecoration: "none",
              color: "#2d2d2d",
              position: "absolute",
            }}
            onClick={() => scrollHandler()}
          >
            <PostCardImgBackground />
          </Link>
        </PostCardImgBox>
        <Link
          to={{
            pathname: `/detail`,
            state: {
              postId: postInfo.id,
            },
          }}
          style={{ textDecoration: "none", color: "#2d2d2d" }}
          onClick={() => scrollHandler()}
        >
          <PostCardTitle>
            <span>{postInfo.title}</span>
          </PostCardTitle>
          <InfoBox>
            <ProfileBox>
              <PostCardUserProfile>
                {postInfo.user.imagePath ? (
                  !postInfo.user.imagePath.includes(":") ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/${postInfo.user.imagePath}`}
                      alt="UserPhoto"
                    />
                  ) : (
                    <img src={postInfo.user.imagePath} alt="UserPhoto" />
                  )
                ) : (
                  <img src="./images/profile.svg" alt="UserPhoto" />
                )}
              </PostCardUserProfile>
              <span className="User_Name">{postInfo.user.nickname}</span>
            </ProfileBox>
            {timeLeft === "나눔 마감" ? (
              <ShareDone>종료</ShareDone>
            ) : (
              <ShareDate>
                {postInfo.dueDate.slice(0, 10).replace(/-/g, ". ")}
              </ShareDate>
            )}
          </InfoBox>
          <PostCardAddress>
            <MapMarkIcon color={"#F44336"} />
            <span className="Share_Address">{`${userArea[0]} ${userArea[1]} ${userArea[2]}`}</span>
          </PostCardAddress>
          <CategoryBox>
            {uniqueArr.map((cate: any, mainIdx: number) => {
              if (mainIdx < 3) {
                return initMainCategories.map((mainCate) => {
                  if (cate === parseInt(mainCate.id)) {
                    return (
                      <CategoryCard key={mainCate.id} idx={mainIdx}>
                        {mainCate.name}
                      </CategoryCard>
                    );
                  }
                });
              }
            })}
          </CategoryBox>
        </Link>
      </PostCardContainer>
    </>
  );
}

export default PostCard;
