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
} from "./ShareCategorise.style";

interface IProps {
  isMine: boolean;
}
function ShareCategories({ isMine }: IProps) {
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

  const [categoryLink, setCategoryLink] = useState<any>({});

  useEffect(() => {
    let newCategoryLink: any = {};
    let dummy1 = ["1", "1", "1", "1", "1", "1", "1", "1", "2", "4", "5"];
    let dummy2 = [
      "침대",
      "이불",
      "책상",
      "옷장",
      "베개",
      "서랍장",
      "책장",
      "인테리어소품",
      "휴대폰",
      "남성의류",
      "신발",
    ];

    for (let i = 0; i < dummy1.length; i++) {
      if (newCategoryLink[dummy1[i]] === undefined) {
        newCategoryLink[dummy1[i]] = [];
        newCategoryLink[dummy1[i]].push(dummy2[i]);
      } else {
        newCategoryLink[dummy1[i]].push(dummy2[i]);
      }
    }
    setCategoryLink(newCategoryLink);
    console.log(newCategoryLink);
  }, []);

  return (
    <ModalBackground>
      <BodyContainer>
        <ModalContainer>
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
                            <>
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
                            </>
                          );
                        }
                      })}
                    </SubCategory>
                  </CategoryRow>
                );
              }
            })}
          </CategoriesContainer>
        </ModalContainer>
      </BodyContainer>
    </ModalBackground>
  );
}

export default ShareCategories;
