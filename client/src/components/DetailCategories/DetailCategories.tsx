import { useEffect, useState } from "react";
import { initMainCategories } from "../../pages/MainPage/Categories";
import {
  Testcontainer,
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

  return (
    <CategoryBox>
      <CategoryTitle>품목</CategoryTitle>
      <div className="Category_Slice">
        {mainCategories.map((mainCate, mainIdx) => {
          if (categoryLink[mainCate.id] !== undefined) {
            return (
              <CategoryRow>
                <MainCategory>{mainCate.name}</MainCategory>
                <SubCategory>
                  {mainCate.subCategories.map((subCate, subIdx) => {
                    if (categoryLink[mainCate.id].includes(subCate.name)) {
                      return (
                        <div>
                          <CategoryIcon
                            isCheck={subCate.isSelect}
                            isMine={isMine}
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
