import React, { useState } from "react";
import PostCard from "../../../components/PostCard/PostCard";
import {
  MainPageContainer,
  CategoryContainer,
  CategoryMenuCircle,
  CategoryMenu,
  CategoryItemsBox,
  CategoryItem,
  PostBoardTitleContainer,
  PostBoardTitleBox,
  CreatePostButton,
  PostCardArea,
} from "./MainPage.style";

function MainPage() {
  const categoryItems: string[] = [
    "가구/침구류",
    "디지털기기",
    "생활가전",
    "의류",
    "잡화",
    "도서/음반",
    "유아동",
    "게임/취미",
    "스포츠/레저",
    "반려동물용품",
    "기타",
  ];
  const [isShowCategory, setIsShowCategory] = useState<boolean>(false);

  const openCategory = () => {
    setIsShowCategory(!isShowCategory);
  };

  const selectCategory = (e: any): void => {
    console.log(e.target.key);
  };
  return (
    <MainPageContainer>
      <CategoryContainer>
        <CategoryMenu
          isShowCategory={isShowCategory}
          onClick={() => {
            openCategory();
          }}
        >
          <CategoryMenuCircle isShowCategory={isShowCategory}>
            <img src="./images/categoryMenu.svg" alt="categoryMenu" />
          </CategoryMenuCircle>
          <span>카테고리</span>
        </CategoryMenu>
        <CategoryItemsBox>
          {categoryItems.map((item, idx) => {
            return (
              <CategoryItem
                key={idx + 1}
                isShowCategory={isShowCategory}
                onClick={(e) => selectCategory(e)}
              >
                <span>{item}</span>
              </CategoryItem>
            );
          })}
        </CategoryItemsBox>
      </CategoryContainer>
      <PostBoardTitleContainer>
        <PostBoardTitleBox>
          <span className="Post_Title">게시판</span>
          <span className="Post_Count">총 10개</span>
        </PostBoardTitleBox>
        <CreatePostButton>
          <span>+</span>
        </CreatePostButton>
      </PostBoardTitleContainer>
      <PostCardArea>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
      </PostCardArea>
    </MainPageContainer>
  );
}

export default MainPage;
