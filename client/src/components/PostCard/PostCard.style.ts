import styled from "styled-components";

export const PostCardContainer = styled.article`
  width: 287px;
  height: 442px;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Gmarket Sans TTF";
`;

export const PostCardImgBox = styled.div`
  width: 287px;
  height: 287px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const PostCardImg = styled.img`
  width: 285px;
  height: 285px;
  border-radius: 5px 5px 0px 0px;
`;

export const PostCardImgBackground = styled.div`
  position: absolute;
  width: 285px;
  height: 285px;
  border-radius: 5px 5px 0px 0px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
`;
export const PostCardLikeBox = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  z-index: 1;
  width: 285px;
  height: 50px;
`;

export const PostCardLike = styled.svg`
  width: 16px;
  fill: red;
  margin-top: 13px;
  margin-right: 12px;
`;

export const PhotoCirclesBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 285px;
  height: 20px;
  margin-top: 200px;
  z-index: 1;
`;

export const PhotoCircle = styled.span`
  background: #ffffff;
  width: 7px;
  height: 7px;
  border-radius: 15px;
  margin-right: 7px;
`;

export const PostCardTitle = styled.div`
  height: 20px;
`;
export const PostCardUserInfo = styled.div`
  height: 26px;
`;
export const PostCardAddress = styled.div`
  height: 24px;
`;
export const CategoryCard = styled.div`
  height: 30px;
`;
