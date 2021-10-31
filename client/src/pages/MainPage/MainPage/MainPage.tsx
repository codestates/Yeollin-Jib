import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostCard from "../../../components/PostCard/PostCard";
import { RootState } from "../../../reducers/rootReducer";
import { initLeftMainCategories, initRightMainCategories } from "../Categories";
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
  BlankPostCard,
} from "./MainPage.style";

function MainPage() {
  const [postInfo, setPostInfo] = useState<any[]>([]);
  const [page, setPage] = useState<number>(36);
  const [isShowCategory, setIsShowCategory] = useState<boolean>(false);
  const { isLogin } = useSelector((state: RootState) => state.authReducer);
  const openCategory = () => {
    setIsShowCategory(!isShowCategory);
  };

  // 카테고리 선택 핸들
  const [leftMainCategories, setLeftMainCategories] = useState(
    initLeftMainCategories
  );

  const CategoryLeftSelectHandle = (id: string) => {
    let newMainCate = [...leftMainCategories];
    leftMainCategories.forEach((mainCate) => {
      if (mainCate.isSelect) {
        mainCate.isSelect = false;
      }
      if (id === mainCate.id) {
        mainCate.isSelect = true;
      }
    });
    setLeftMainCategories(newMainCate);
  };

  const [rightMainCategories, setRightMainCategories] = useState(
    initRightMainCategories
  );

  const CategoryRightSelectHandle = (id: string) => {
    let newMainCate = [...rightMainCategories];
    rightMainCategories.forEach((mainCate) => {
      if (mainCate.isSelect) {
        mainCate.isSelect = false;
      }
      if (id === mainCate.id) {
        mainCate.isSelect = true;
      }
    });
    setRightMainCategories(newMainCate);
  };

  const selectCategory = (id: string) => {
    CategoryLeftSelectHandle(id);
    CategoryRightSelectHandle(id);
  };

  // 초기 게시글 호출
  const firstLoadPost = async () => {
    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/page`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setPostInfo(result.data.postGet);
  };

  // 해당 컴포넌트가 마운트될 때 초기 게시글을 호출한다, 카테고리 셀렉트 상태를 초기화 한다
  useEffect(() => {
    firstLoadPost();
    CategoryRightSelectHandle("init");
    CategoryLeftSelectHandle("init");
  }, []);

  // 무한스크롤 함수
  const handleScroll = useCallback(async () => {
    // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)
    const { innerHeight } = window;

    // 브라우저 총 내용의 크기 (스크롤을 포함한다)
    const { scrollHeight } = document.body;

    // 현재 스크롤바의 위치
    const { scrollTop } = document.documentElement;

    // scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.
    if (Math.round(scrollTop + innerHeight) >= scrollHeight - 200) {
      if (page > 3) {
        const result: any = await axios.get(
          `${process.env.REACT_APP_API_URL}/post/page/${page}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // 페이지에 따라서 불러온 배열을 새로운 요청으로 받아온 게시물 배열과 합쳐준다.
        setPostInfo(postInfo.concat(result.data.postGet));

        // 페이지를 불러오는 게시물의 수만큼 줄여준다.
        setPage(page - 4);
      }
    }
    console.log(postInfo);
  }, [page]);

  // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 한다.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);

    // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거한다.
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  return (
    <MainPageContainer>
      {/* 카테고리 메뉴 슬라이드 버튼----------------------------------------------*/}
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
          <span>{"카테고리"}</span>
        </CategoryMenu>
        {/* 카테고리 선택 창 ----------------------------------------------------*/}
        <CategoryItemsBox>
          {leftMainCategories.map((item) => {
            return (
              <CategoryItem
                key={item.name}
                isShowCategory={isShowCategory}
                isSelect={item.isSelect}
                onClick={() => selectCategory(item.id)}
              >
                <span>{item.name}</span>
              </CategoryItem>
            );
          })}
          {rightMainCategories.map((item) => {
            return (
              <CategoryItem
                key={item.name}
                isShowCategory={isShowCategory}
                isSelect={item.isSelect}
                onClick={() => selectCategory(item.id)}
              >
                <span>{item.name}</span>
              </CategoryItem>
            );
          })}
        </CategoryItemsBox>
      </CategoryContainer>
      {/* 게시글  시작 ----------------------------------------------------*/}
      <PostBoardTitleContainer>
        <PostBoardTitleBox>
          <span className="Post_Title">{"게시판"}</span>
          <span className="Post_Count">{`총 ${postInfo.length}개`}</span>
        </PostBoardTitleBox>
        {/* 게시글 작성 버튼 ------------------------------------------------*/}
        <Link
          to={isLogin ? "/createpost" : "/login"}
          style={{ textDecoration: "none", color: "#2d2d2d" }}
        >
          <CreatePostButton>
            <span className="Redirect_Createpost">+</span>
          </CreatePostButton>
        </Link>
      </PostBoardTitleContainer>
      {/* 게시글 리스트 ----------------------------------------------------*/}
      <PostCardArea>
        {postInfo[0] === undefined ? (
          <BlankPostCard>{"검색 결과가 없습니다"}</BlankPostCard>
        ) : (
          postInfo.map((postInfo, idx) => {
            return (
              <PostCard
                key={postInfo.id}
                idx={idx}
                postInfo={postInfo}
              ></PostCard>
            );
          })
        )}
      </PostCardArea>
    </MainPageContainer>
  );
}

export default MainPage;
