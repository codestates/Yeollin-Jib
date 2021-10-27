import React, { useState } from "react";
import PhotoUpload from "../../../components/PhotoUpload/PhotoUpload";
import {
  CameraIcon,
  CheckBoxIcon,
  ClockIcon,
  MapMarkIcon,
  PaperIcon,
  PencilIcon,
} from "../../../icons/Icons";
import {
  CreatePostContainer,
  TitleDatePickerContainer,
  TitleArea,
  DateArea,
  InputTitle,
  DatePicker,
  PostContentsArea,
  PostContents,
  PostCategoryArea,
  PostCategory,
  MainCategoryBox,
  MainCategoryItem,
  SubCategoryBox,
  SubCategoryItem,
  UploadPhotoArea,
  AddressArea,
  InputAddress,
  SubmitArea,
  SubmitBtn,
  CancelBtn,
} from "./CreatePostPage.style";
import { initLeftMainCategories, initRightMainCategories } from "../Categories";
function CreatePostPage() {
  // 게시물 제목 State, Handle
  const [inputTitle, setInputTitle] = useState<string>("");

  const TitleInputHandle = (value: string) => {
    setInputTitle(value);
    console.log(value);
  };

  // 게시물 마감일자 State, Handle
  const [inputDate, setInputDate] = useState<string>("");

  const DateInputHandle = (value: string) => {
    setInputDate(value);
    console.log(value);
  };

  // 게시물 내용 State, Handle
  const [inputContents, setInputContents] = useState<string>("");

  const ContentsInputHandle = (value: string) => {
    setInputContents(value);
    console.log(value);
  };

  // 대분류 왼쪽 테이블 State, Handle
  const [leftMainCategories, setLeftMainCategories] = useState(
    initLeftMainCategories
  );

  const CategoryLeftSelectHandle = (id: string): void => {
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

  // 대분류 오른쪽 테이블 State, Handle
  const [rightMainCategories, setRightMainCategories] = useState(
    initRightMainCategories
  );

  const CategoryRightSelectHandle = (id: string): void => {
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

  // checkBox
  const [isSubCategoryCheck, setIsSubCategoryCheck] = useState<string[]>([]);

  const addSubCategoryHandle = () => {};

  return (
    <CreatePostContainer>
      <span className="Create_Post_Word">{"게시글 작성"}</span>

      {/* 제목 작성 칸 ------------------------------------------------------*/}
      <TitleDatePickerContainer>
        <TitleArea>
          <div className="Title_Word">
            <PencilIcon color="#2D2D2D" />
            <span>{"제목을 작성해 주세요."}</span>
          </div>
          <div className="Title_Input">
            <InputTitle
              value={inputTitle}
              type={"text"}
              onChange={(e) => TitleInputHandle(e.target.value)}
            ></InputTitle>
          </div>
        </TitleArea>
        {/* 마감시간 작성 칸 ---------------------------------------------------*/}
        <DateArea>
          <div className="Date_Word">
            <ClockIcon color="#2D2D2D" />
            <span>{"마감 시간을 설정해 주세요."}</span>
          </div>
          <div className="Date_Input">
            <DatePicker
              value={inputDate}
              type={"date"}
              onChange={(e) => DateInputHandle(e.target.value)}
            ></DatePicker>
          </div>
        </DateArea>
      </TitleDatePickerContainer>

      {/* 내용 설명 칸 ----------------------------------------------------*/}
      <PostContentsArea>
        <div className="Contents_Word">
          <PaperIcon color="#2D2D2D" />
          <span className="">{"설명을 작성해 주세요."}</span>
        </div>
        <PostContents
          value={inputContents}
          onChange={(e) => ContentsInputHandle(e.target.value)}
        />
      </PostContentsArea>

      {/* 품목 선택 칸 ----------------------------------------------------*/}
      <PostCategoryArea>
        <div className="Check_Category_Word_Area">
          <CheckBoxIcon color="#2D2D2D" />
          <span className="Category_Word">{"품목을 선택해 주세요."}</span>
        </div>
        <div className="Category_Container">
          <PostCategory>
            <MainCategoryBox>
              {leftMainCategories.map((category) => {
                return (
                  <MainCategoryItem
                    key={category.name}
                    id={category.id}
                    onClick={() => CategoryLeftSelectHandle(category.id)}
                    isSelect={category.isSelect}
                  >
                    <span>{category.name}</span>
                  </MainCategoryItem>
                );
              })}
            </MainCategoryBox>
            <SubCategoryBox>
              {leftMainCategories.map((category) => {
                return category.isSelect
                  ? category.subCategories.map((subCategory) => {
                      return (
                        <>
                          <SubCategoryItem>
                            <input type={"checkbox"} />
                            {subCategory}
                          </SubCategoryItem>
                        </>
                      );
                    })
                  : null;
              })}
            </SubCategoryBox>
          </PostCategory>
          <PostCategory>
            <MainCategoryBox>
              {rightMainCategories.map((category) => {
                return (
                  <MainCategoryItem
                    key={category.name}
                    id={category.id}
                    onClick={() => CategoryRightSelectHandle(category.id)}
                    isSelect={category.isSelect}
                  >
                    <span>{category.name}</span>
                  </MainCategoryItem>
                );
              })}
            </MainCategoryBox>
            <SubCategoryBox>
              {rightMainCategories.map((category) => {
                return category.isSelect
                  ? category.subCategories.map((subCategory) => {
                      return (
                        <>
                          <SubCategoryItem>
                            <input type={"checkbox"} />
                            {subCategory}
                          </SubCategoryItem>
                        </>
                      );
                    })
                  : null;
              })}
            </SubCategoryBox>
          </PostCategory>
        </div>
      </PostCategoryArea>

      {/* 사진 업로드 칸 ----------------------------------------------------*/}
      <UploadPhotoArea>
        <div className="Upload_Word">
          <CameraIcon color="#2D2D2D" />
          <span className="">{"사진을 등록해 주세요. (최대 5장)"}</span>
        </div>
        <div className="Photo_Container">
          <PhotoUpload />
        </div>
      </UploadPhotoArea>

      {/* 주소 입력 칸 ----------------------------------------------------*/}
      <AddressArea>
        <div className="Address_Word">
          <MapMarkIcon color="#2D2D2D" />
          <span className="">{"주소를 검색해 주세요."}</span>
        </div>
        <div className="Search_Address_Box">
          <InputAddress />
          <button>주소 검색</button>
        </div>
      </AddressArea>

      {/* 등록 취소 버튼 ----------------------------------------------------*/}
      <SubmitArea>
        <SubmitBtn>완료</SubmitBtn>
        <CancelBtn>취소</CancelBtn>
      </SubmitArea>
    </CreatePostContainer>
  );
}

export default CreatePostPage;
