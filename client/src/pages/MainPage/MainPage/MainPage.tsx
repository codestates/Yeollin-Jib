import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PostCard from "../../../components/PostCard/PostCard";
import { RootState } from "../../../reducers/rootReducer";
import { initMainCategories } from "../Categories";
import {
  Body,
  MainArea,
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
import Loading from "../../../components/Loading/Loading";
import { setSearch } from "../../../reducers/searchReducer";
import { setUser } from "../../../reducers/userReducer";

function MainPage() {
  const [postInfo, setPostInfo] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [postCount, setPostCount] = useState<number>();
  const [isShowCategory, setIsShowCategory] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLogin, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );
  const location: any = useLocation();
  const dispatch = useDispatch();
  const openCategory = () => {
    setIsShowCategory(!isShowCategory);
  };

  const valueHandler = (search: string) => {
    dispatch(setSearch(search));
  };

  // isLogin이 트루면 user 정보를 요청
  useEffect(() => {
    if (isLogin) {
      dispatch(setUser(accessToken));
    }
  }, [isLogin]);

  // 카테고리 선택 핸들
  const [mainCategories, setMainCategories] = useState(initMainCategories);

  const CategorySelectHandle = (id: string) => {
    let newMainCate = [...mainCategories];
    mainCategories.forEach((mainCate) => {
      if (mainCate.isSelect) {
        mainCate.isSelect = false;
      }
      if (id === mainCate.id) {
        mainCate.isSelect = true;
      }
    });
    setMainCategories(newMainCate);
    valueHandler("");
  };
  let select: string = "";
  const selectCategory = (id: string) => {
    setPage(1);
    select = id;
    CategorySelectHandle(id);
    initPostData(`post/category?code=${id}&page=1`);
    // 카테고리 검색 글 없을 시 로딩창 해제
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // 초기 게시글 호출
  const initPostData = async (endpoint: string) => {
    setIsLoading(true);
    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (result !== undefined) {
      if (result.data.message === undefined) {
        setPostInfo(result.data.postGet.rows);
        setPostCount(result.data.postGet.count);
        setPage(page + 1);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } else if (result.data.message) {
        setPostInfo([]);
        setPostCount(0);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // 해당 컴포넌트가 마운트될 때 초기 게시글을 호출한다, 카테고리 셀렉트 상태를 초기화 한다
  useEffect(() => {
    if (location.state) {
      if (location.state.isSearch !== undefined) {
        setPage(1);
        initPostData(
          `post/search/condition?search=${location.state.search}&code=${location.state.searchOption}`
        );
      } else {
        setPage(1);
        initPostData("post/page/1");
      }
    } else {
      setPage(1);
      initPostData("post/page/1");
    }
    CategorySelectHandle("init");
  }, []);

  const infinitePostData = async (endpoint: string) => {
    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (result !== undefined) {
      if (result.data.message === undefined) {
        setPostInfo(postInfo.concat(result.data.postGet.rows));
        setPostCount(result.data.postGet.count);
        setPage(page + 1);
      }
    } else if (result.data.message) {
      setPostInfo([]);
      setPostCount(0);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // 무한스크롤 함수
  const handleScroll = useCallback(async () => {
    // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)
    const { innerHeight } = window;

    // 브라우저 총 내용의 크기 (스크롤을 포함한다)
    const { scrollHeight } = document.body;

    // 현재 스크롤바의 위치
    const { scrollTop } = document.documentElement;

    // scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.
    if (
      Math.round(scrollTop + innerHeight) >= scrollHeight - 200 &&
      postCount !== undefined
    ) {
      if (location.state) {
        if (location.state.isSearch !== undefined && page - 1 < postCount / 8) {
          infinitePostData(
            `post/search/condition?search=${location.state.search}&code=${location.state.searchOption}&page=${page}`
          );
        }
      } else if (select !== "") {
        infinitePostData(`post/category?code=${select}&page=${page - 1}`);
      } else if (page - 1 < postCount / 8) {
        infinitePostData(`post/page/${page}`);
      }
    }
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
    <Body>
      <MainArea>
        {isLoading ? (
          <Loading></Loading>
        ) : (
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
                {mainCategories.map((item) => {
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
                <span className="Post_Count">
                  {!postCount ? `총 0개` : `총 ${postCount}개`}
                </span>
              </PostBoardTitleBox>
              {/* 게시글 작성 버튼 ------------------------------------------------*/}
              <Link
                to={isLogin ? "/createpost" : "/login"}
                style={{ textDecoration: "none", color: "#2d2d2d" }}
                onClick={() => valueHandler("")}
              >
                <CreatePostButton>
                  <span className="Redirect_Createpost">+</span>
                </CreatePostButton>
              </Link>
            </PostBoardTitleContainer>
            {/* 게시글 리스트 ----------------------------------------------------*/}
            <PostCardArea>
              {postInfo[0] === undefined ? (
                <BlankPostCard>
                  <span>검색 결과가</span>
                  <span> 없습니다</span>
                </BlankPostCard>
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
        )}
      </MainArea>
    </Body>
  );
}

export default MainPage;
