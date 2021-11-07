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
} from "./PostCard.style";
import { RootState } from "../../reducers/rootReducer";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

interface Result {
  postInfo: any;
  idx: number;
}

function PostCard({ postInfo, idx }: Result) {
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const { id } = useSelector((state: RootState) => state.userReducer);
  // 저장된 유저의 카테고리에서 중복 제거
  let ArrCategory: string[] = [];
  postInfo.post_categories.forEach((category: any) => {
    ArrCategory.push(category.category.category1);
  });
  const uniqueArr = ArrCategory.filter((element, index) => {
    return ArrCategory.indexOf(element) === index;
  });

  // images중에 1번째 사진을 썸네일로 사용하고 사진개수만큼 circle을 추가 해주기위해 배열 생성
  let images: string[] = postInfo.imagePath.split(",");

  //주소 자르기
  const userArea = postInfo.address.split(" ");

  // 좋아요 상태
  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    postInfo.storages.map((user: any) => {
      if (user.userId === id) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    });
  }, []);

  const likeHandle = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/storage/${postInfo.id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLike(true);
      })
      .catch((err) => {
        if (err.message.slice(-3) === "400") {
          axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/storage/${postInfo.id}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }).then((res) => {
            setIsLike(false);
          });
        }
      });
  };
  return (
    <PostCardContainer idx={idx}>
      <PostCardImgBox>
        {postInfo.imagePath ? (
          <PostCardImg
            src={`${process.env.REACT_APP_API_URL}${images[0].slice(6)}`}
            alt="PostImg"
          />
        ) : (
          <PostCardImg src={"./images.noImage.jpeg"} alt="PostImg" />
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
        <PostCardImgBackground />
      </PostCardImgBox>
      <PostCardTitle>
        <span>{postInfo.title}</span>
      </PostCardTitle>
      <InfoBox>
        <ProfileBox>
          <PostCardUserProfile>
            <img
              src={`${process.env.REACT_APP_API_URL}/uploads/${postInfo.user.imagePath}`}
              alt="UserPhoto"
            />
          </PostCardUserProfile>
          <span className="User_Name">{postInfo.user.nickname}</span>
        </ProfileBox>
        <ShareDate>
          {postInfo.dueDate.slice(0, 10).replace(/-/g, ". ")}
        </ShareDate>
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
    </PostCardContainer>
  );
}

export default PostCard;
