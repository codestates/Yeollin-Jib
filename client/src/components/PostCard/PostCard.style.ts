import styled from "styled-components";

// interface PostCardPadding {
//   idx: number;
// }
interface PostCardMargin {
  idx: number;
}
export const PostCardContainer = styled.article<PostCardMargin>`
  width: 17.938rem;
  border: 0.063rem solid #e0dde1;
  box-sizing: border-box;
  border-radius: 0.313rem;
  display: flex;
  flex-direction: column;
  font-family: "Gmarket Sans TTF";
  margin: 1.063rem 0 0.813rem 0;
  /* margin: ${(props) =>
    props.idx % 4 === 1
      ? "1.063rem 1.25rem 0.813rem 1.25rem"
      : props.idx % 4 === 2
      ? "1.063rem 1.25rem 0.813rem 0"
      : "1.063rem 0 0.813rem 0"}; */
  @media screen and (max-width: 37.5rem) {
    width: 100%;
  }
`;

export const PostCardImgBox = styled.div`
  position: relative;
  width: 17.938rem;
  height: 17.938rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 37.5rem) {
    width: 100%;
    height: auto;
  }
`;

export const PostCardImg = styled.img`
  width: 17.813rem;
  height: 17.813rem;
  border-radius: 0.313rem 0.313rem 0px 0px;
  font-size: 16px;
  font-weight: 100;
  @media screen and (max-width: 37.5rem) {
    border-radius: 0.25rem 0.25rem 0px 0px;
    width: 100%;
    height: auto;
  }
`;

export const PostCardImgBackground = styled.div`
  position: absolute;
  width: 17.813rem;
  height: 17.813rem;
  border-radius: 0.313rem 0.313rem 0px 0px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
  @media screen and (max-width: 37.5rem) {
    border-radius: 0.25rem 0.25rem 0px 0px;
    width: 100%;
    height: auto;
    z-index: 99;
  }
`;

export const PostCardLikeBox = styled.div`
  display: flex;
  justify-content: end;
  position: relative;
  z-index: 4;
  width: 17.813rem;
  height: 3.125rem;
  position: absolute;
  @media screen and (max-width: 37.5rem) {
    width: 100%;
  }
`;

export const PostCardLike = styled.svg`
  width: 1rem;
  margin-top: 0.813rem;
  margin-right: 0.75rem;
  cursor: pointer;
`;

export const PhotoCirclesBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const PhotoCircle = styled.span`
  background: #ffffff;
  width: 0.438rem;
  height: 0.438rem;
  border-radius: 0.938rem;
  margin-right: 0.438rem;
  margin-bottom: 0.75rem;
`;

export const PostCardTitle = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 1rem;
  color: #2d2d2d;
  margin: 15px 0 0 11px;
  font-weight: 500;
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 11px 0 11px;
  font-weight: 300;
`;

export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  height: 26px;
  .User_Name {
    font-size: 14px;
    margin-left: 7px;
  }
`;

export const PostCardUserProfile = styled.span`
  width: 26px;
  height: 26px;
  border: 1px solid #e0dde1;
  border-radius: 20px;
  img {
    border-radius: 20px;
    width: 26px;
    height: 26px;
  }
`;

export const ShareDate = styled.div`
  width: 81px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  background: #fede8a;
  border-radius: 0.313rem;
  font-weight: 100;
`;

export const PostCardAddress = styled.div`
  height: 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin: 12px 0 0 11px;
  font-weight: 100;
  img {
    width: 15px;
    margin-right: 2px;
  }
  .Share_Address {
    margin-left: 4px;
  }
`;
export const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 11px 0 11px;
  padding: 21px 0 14px 0;
`;

export const CategoryCard = styled.span<PostCardMargin>`
  width: 85px;
  height: 26px;
  background: #f7f7f8;
  border: 1px solid #e0dde1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.313rem;
  font-size: 12px;
  font-weight: 100;
  margin: ${(props) => (props.idx === 1 ? "0 3px 0 3px" : "none")};
  cursor: pointer;
`;
