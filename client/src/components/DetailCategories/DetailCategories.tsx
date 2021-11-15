import { useEffect, useState } from "react";
import {
  CategoryBox,
  CategoryTitle,
  CategoryRow,
  MainCategory,
  SubCategory,
  SubCategoryName,
  ShowAllCategoryBtn,
} from "./DetailCategories.style";
import { CategoryIcon } from "../../icons/Icons";
import ShareCategories from "../Modals/ShareCategories/ShareCategories";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";

interface IsMine {
  isMine: boolean;
  categoryLink: any;
  postId: number;
  mainCategories: any;
  setMainCategories: (cate: any) => void;
}

function DetailCategories({
  isMine,
  categoryLink,
  postId,
  mainCategories,
  setMainCategories,
}: IsMine) {
  // 대분류 테이블 State, Handle
  // const [mainCategories, setMainCategories] = useState(initMainCategories);
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  let count = 0;

  // 서브 체크박스 Handle
  const addSubCategoryHandle = (id: string, name: string) => {
    const newMainCate = [...mainCategories];
    newMainCate.forEach((mainCategory) => {
      mainCategory.subCategories.forEach(async (subCategory: any) => {
        if (mainCategory.id === id && subCategory.name === name) {
          const result: any = await axios.patch(
            `${process.env.REACT_APP_API_URL}/post/category`,
            { postId: `${postId}`, categoryId: `${subCategory.id}` },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (result.status === 200) {
            subCategory.isSelect = !subCategory.isSelect;
            setMainCategories(newMainCate);
          }
        }
      });
    });
  };
  // const addSubCategoryHandle = (id: string, name: string) => {
  //   const newMainCate = [...mainCategories];
  //   newMainCate.forEach((mainCategory) => {
  //     mainCategory.subCategories.forEach((subCategory) => {
  //       if (mainCategory.id === id && subCategory.name === name) {
  //         axios({
  //           method: "patch",
  //           url: `${process.env.REACT_APP_API_URL}/post/category`,
  //           data: { postId: `${postId}`, categoryId: `${subCategory.id}` },
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         }).then((result) => {
  //           if (result.status === 200)
  //             subCategory.isSelect = !subCategory.isSelect;
  //         });
  //       }
  //     });
  //   });
  //   setMainCategories(newMainCate);
  // };
  const [showAllCategory, setShowAllCategory] = useState(false);
  const showCategoryHandle = () => {
    setShowAllCategory(!showAllCategory);
  };

  const selectCategory = (id: string, name: string) => {
    if (isMine) {
      addSubCategoryHandle(id, name);
    }
  };

  useEffect(() => {
    const newMainCate = [...mainCategories];
    newMainCate.forEach((mainCate) => {
      mainCate.subCategories.forEach((subCate: any) => {
        if (categoryLink[mainCate.id]) {
          categoryLink[mainCate.id].forEach((cateBool: any) => {
            if (cateBool.cateId === subCate.name) {
              subCate.isSelect = !cateBool.cateBool;
            }
          });
        }
      });
    });
    setMainCategories(newMainCate);
  }, []);

  // unmount 시 카테고리 isSelect 상태 초기화
  // useEffect(() => {
  //   return () => {
  //     initCategoryFunc();
  //   };
  // }, []);

  return (
    <CategoryBox>
      <CategoryTitle>품목</CategoryTitle>
      <div className="Category_Slice">
        {mainCategories.map((mainCate: any) => {
          count = 0;
          if (categoryLink[mainCate.id] !== undefined) {
            return (
              <CategoryRow key={mainCate.name}>
                <MainCategory>{mainCate.name}</MainCategory>
                <SubCategory>
                  {mainCate.subCategories.map((subCate: any) => {
                    return categoryLink[mainCate.id].map((cateBool: any) => {
                      if (cateBool.cateId === subCate.name) {
                        count += 1;
                      }
                      if (cateBool.cateId === subCate.name && count < 4) {
                        return (
                          <div key={subCate.id}>
                            <CategoryIcon isCheck={subCate.isSelect} />
                            <SubCategoryName
                              isCheck={subCate.isSelect}
                              onClick={() =>
                                selectCategory(mainCate.id, subCate.name)
                              }
                              className="Sub_Item"
                            >
                              {subCate.name}
                            </SubCategoryName>
                          </div>
                        );
                      }
                    });
                  })}
                </SubCategory>
              </CategoryRow>
            );
          }
        })}
      </div>
      <ShowAllCategoryBtn>
        <div
          onClick={() => {
            showCategoryHandle();
          }}
        >
          <span className="Down_Arrow">∨</span>
          <span> 더보기</span>
        </div>
      </ShowAllCategoryBtn>
      {showAllCategory ? (
        <ShareCategories
          isMine={isMine}
          categoryLink={categoryLink}
          showCategoryHandle={showCategoryHandle}
        />
      ) : (
        <></>
      )}
    </CategoryBox>
  );
}

export default DetailCategories;
