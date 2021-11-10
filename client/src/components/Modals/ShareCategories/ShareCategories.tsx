import { useEffect, useState } from "react";
import { CategoryIcon } from "../../../icons/Icons";
import { initMainCategories } from "../../../pages/MainPage/Categories";
import {
  ModalBackground,
  ModalContainer,
  CategoriesContainer,
  CategoryTitle,
  CategoryRow,
  MainCategory,
  SubCategory,
  BodyContainer,
  SubCategoryName,
  CloseButton,
} from "./ShareCategorise.style";

interface IsMine {
  isMine: boolean;
  showCategoryHandle: () => void;
  categoryLink: any;
}
function ShareCategories({ isMine, showCategoryHandle, categoryLink }: IsMine) {
  // 로그인 상태를 가져옴

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

  const selectCategory = (id: string, name: string) => {
    if (isMine) {
      addSubCategoryHandle(id, name);
    }
  };

  const modalContainerStopClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <ModalBackground
      onClick={() => {
        showCategoryHandle();
      }}
    >
      <BodyContainer>
        <ModalContainer onClick={(e) => modalContainerStopClick(e)}>
          <CategoriesContainer>
            <CategoryTitle>
              <span>품목</span>
            </CategoryTitle>
            {mainCategories.map((mainCate) => {
              if (categoryLink[mainCate.id] !== undefined) {
                return (
                  <CategoryRow>
                    <MainCategory>{mainCate.name}</MainCategory>
                    <SubCategory>
                      {mainCate.subCategories.map((subCate) => {
                        if (categoryLink[mainCate.id].includes(subCate.name)) {
                          return (
                            <div className="Sub_Category_Box">
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
          </CategoriesContainer>
          <div className="Close_Button_Container">
            <CloseButton
              onClick={() => {
                showCategoryHandle();
              }}
            >
              닫기
            </CloseButton>
          </div>
        </ModalContainer>
      </BodyContainer>
    </ModalBackground>
  );
}

export default ShareCategories;
