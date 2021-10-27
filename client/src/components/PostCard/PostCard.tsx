import React from "react";
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

function PostCard() {
  return (
    <PostCardContainer>
      <PostCardImgBox>
        <PostCardImg src="./images/test.jpeg" alt="PostImg"></PostCardImg>
        <PostCardLikeBox>
          <PostCardLike>
            <path
              d="M15.2246 2.98517C14.989 2.43961 14.6493 1.94523 14.2244 1.5297C13.7993 1.11293 13.298 0.781735 12.7479 0.554114C12.1774 0.317149 11.5656 0.195856 10.9479 0.197278C10.0813 0.197278 9.23574 0.434583 8.50098 0.882825C8.3252 0.990052 8.1582 1.10783 8 1.23615C7.8418 1.10783 7.6748 0.990052 7.49902 0.882825C6.76426 0.434583 5.91875 0.197278 5.05215 0.197278C4.42812 0.197278 3.82344 0.316809 3.25215 0.554114C2.7002 0.78263 2.20273 1.11134 1.77559 1.5297C1.35019 1.94476 1.01037 2.43926 0.775391 2.98517C0.531055 3.55294 0.40625 4.15587 0.40625 4.77638C0.40625 5.36173 0.525781 5.97169 0.763086 6.5922C0.961719 7.11075 1.24648 7.64865 1.61035 8.19181C2.18691 9.05138 2.97969 9.94787 3.96406 10.8567C5.59531 12.3631 7.21074 13.4037 7.2793 13.4459L7.6959 13.7131C7.88047 13.8309 8.11777 13.8309 8.30234 13.7131L8.71895 13.4459C8.7875 13.402 10.4012 12.3631 12.0342 10.8567C13.0186 9.94787 13.8113 9.05138 14.3879 8.19181C14.7518 7.64865 15.0383 7.11075 15.2352 6.5922C15.4725 5.97169 15.592 5.36173 15.592 4.77638C15.5938 4.15587 15.4689 3.55294 15.2246 2.98517Z"
              fill="red"
            />
          </PostCardLike>
        </PostCardLikeBox>
        <PhotoCirclesBox>
          <PhotoCircle />
          <PhotoCircle />
          <PhotoCircle />
          <PhotoCircle />
          <PhotoCircle />
        </PhotoCirclesBox>
        <PostCardImgBackground />
      </PostCardImgBox>
      <PostCardTitle>
        <span>{"나눔해여어어어"}</span>
      </PostCardTitle>
      <InfoBox>
        <ProfileBox>
          <PostCardUserProfile>
            <img src="./images/dummyPost.png" alt="UserPhoto" />
          </PostCardUserProfile>
          <span className="User_Name">까까마리</span>
        </ProfileBox>
        <ShareDate>{"2021.10.26"}</ShareDate>
      </InfoBox>
      <PostCardAddress>
        <img src="./images/mapMark.svg" alt="MapMark" />
        <span className="Share_Address">{"경기도 용인시 기흥구"}</span>
      </PostCardAddress>
      <CategoryBox>
        <CategoryCard>{"가구/침구류"}</CategoryCard>
      </CategoryBox>
    </PostCardContainer>
  );
}

export default PostCard;
