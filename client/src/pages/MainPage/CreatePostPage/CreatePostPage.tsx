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
  DatePiker,
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

function CreatePostPage() {
  interface SelectMainCategory {
    "1": boolean;
    "2": boolean;
    "3": boolean;
    "4": boolean;
    "5": boolean;
    "6": boolean;
    "7": boolean;
    "8": boolean;
    "9": boolean;
    "10": boolean;
    "11": boolean;
  }

  let selectCategoryMain: SelectMainCategory = {
    "1": true,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": true,
    "8": false,
    "9": false,
    "10": false,
    "11": false,
  };

  const mainCategories: string[] = ["1", "2", "3", "4", "5", "6"];

  const [isSelect, setIsSelect] = useState(selectCategoryMain);
  return (
    <CreatePostContainer>
      <span className="Create_Post_Word">{"게시글 작성"}</span>

      {/* 제목, 마감시간 작성 칸 ---------------------------------------------*/}
      <TitleDatePickerContainer>
        <TitleArea>
          <div className="Title_Word">
            <PencilIcon color="#2D2D2D" />
            <span>{"제목을 작성해 주세요."}</span>
          </div>
          <div className="Title_Input">
            <InputTitle type={"text"}></InputTitle>
          </div>
        </TitleArea>
        <DateArea>
          <div className="Date_Word">
            <ClockIcon color="#2D2D2D" />
            <span>{"마감 시간을 설정해 주세요."}</span>
          </div>
          <div className="Date_Input">
            <DatePiker type={"text"}></DatePiker>
          </div>
        </DateArea>
      </TitleDatePickerContainer>

      {/* 내용 설명 칸 ----------------------------------------------------*/}
      <PostContentsArea>
        <div className="Contents_Word">
          <PaperIcon color="#2D2D2D" />
          <span className="">{"설명을 작성해 주세요."}</span>
        </div>
        <PostContents />
      </PostContentsArea>

      {/* 품목 선택 칸 ----------------------------------------------------*/}
      <PostCategoryArea>
        <div className="Check_Category_Word">
          <CheckBoxIcon color="#2D2D2D" />
          <span className="">{"품목을 선택해 주세요."}</span>
        </div>
        <div className="Category_Container">
          <PostCategory>
            <MainCategoryBox>
              {/* {mainCategories.map((category,idx)=>{
                return 
                <MainCategoryItem id={idx} isSelect={isSelect[idx]}]></MainCategoryItem>
              })} */}
              <MainCategoryItem
                id={"1"}
                isSelect={isSelect[1]}
              ></MainCategoryItem>
              <MainCategoryItem isSelect={isSelect[2]}></MainCategoryItem>
              <MainCategoryItem isSelect={isSelect[3]}></MainCategoryItem>
              <MainCategoryItem isSelect={isSelect[4]}></MainCategoryItem>
              <MainCategoryItem isSelect={isSelect[5]}></MainCategoryItem>
              <MainCategoryItem isSelect={isSelect[6]}></MainCategoryItem>
            </MainCategoryBox>
            <SubCategoryBox>
              <SubCategoryItem></SubCategoryItem>
            </SubCategoryBox>
          </PostCategory>
          <PostCategory>
            <MainCategoryBox>
              <MainCategoryItem isSelect={isSelect[7]}></MainCategoryItem>
              <MainCategoryItem isSelect={isSelect[8]}></MainCategoryItem>
              <MainCategoryItem isSelect={isSelect[9]}></MainCategoryItem>
              <MainCategoryItem isSelect={isSelect[10]}></MainCategoryItem>
              <MainCategoryItem isSelect={isSelect[11]}></MainCategoryItem>
            </MainCategoryBox>
            <SubCategoryBox>
              <SubCategoryItem></SubCategoryItem>
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
