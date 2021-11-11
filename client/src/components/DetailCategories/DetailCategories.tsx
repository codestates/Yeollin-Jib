import { useEffect, useState } from "react";
import {
  initCategoryFunc,
  initMainCategories,
} from "../../pages/MainPage/Categories";
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

interface IsMine {
  isMine: boolean;
  categoryLink: any;
}

function DetailCategories({ isMine, categoryLink }: IsMine) {
  // 대분류 테이블 State, Handle
  const [mainCategories, setMainCategories] = useState(initMainCategories);

  let count = 0;

  // 서브 체크박스 Handle
  const addSubCategoryHandle = (id: string, name: string) => {
    const newMainCate = [...mainCategories];
    newMainCate.forEach((mainCategory) => {
      mainCategory.subCategories.forEach((subCategory) => {
        if (mainCategory.id === id && subCategory.name === name) {
          subCategory.isSelect = !subCategory.isSelect;
        } else if (mainCategory.id === id && subCategory.name === name) {
          subCategory.isSelect = !subCategory.isSelect;
        }
      });
    });
    setMainCategories(newMainCate);
  };
  const [showAllCategory, setShowAllCategory] = useState(false);
  const showCategoryHandle = () => {
    setShowAllCategory(!showAllCategory);
  };

  const selectCategory = (id: string, name: string) => {
    addSubCategoryHandle(id, name);
  };

  // unmount 시 카테고리 isSelect 상태 초기화
  useEffect(() => {
    return () => {
      initCategoryFunc();
    };
  }, []);
  return (
    <CategoryBox>
      <CategoryTitle>품목</CategoryTitle>
      <div className="Category_Slice">
        {mainCategories.map((mainCate) => {
          if (categoryLink[mainCate.id] !== undefined) {
            return (
              <CategoryRow>
                <MainCategory>{mainCate.name}</MainCategory>
                <SubCategory>
                  {mainCate.subCategories.map((subCate) => {
                    if (categoryLink[mainCate.id].includes(subCate.name)) {
                      count += 1;
                    }
                    if (
                      categoryLink[mainCate.id].includes(subCate.name) &&
                      count < 4
                    ) {
                      return (
                        <div>
                          <CategoryIcon
                            isCheck={subCate.isSelect}
                            isMine={false}
                          />
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
                  })}
                </SubCategory>
              </CategoryRow>
            );
          } else if (categoryLink[mainCate.id] === undefined) {
            count = 0;
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
