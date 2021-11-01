import { useEffect, useState } from "react";
import PhotoUpload from "../../../components/PhotoUpload/PhotoUpload";
import {
  CameraIcon,
  CategoryIcon,
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
  TimePicker,
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
import { RootState } from "../../../reducers/rootReducer";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";

function CreatePostPage() {
  // 저장된 토큰값을 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  // 게시물 제목 State, Handle
  const [inputTitle, setInputTitle] = useState<string>("");

  const TitleInputHandle = (value: string) => {
    setInputTitle(value);
  };

  // 게시물 마감일자 State, Handle
  interface DatePicker {
    date?: string | undefined;
    time?: string | undefined;
  }
  const [inputDate, setInputDate] = useState<DatePicker>({
    date: "",
    time: "",
  });

  const DateInputHandle = (value: string) => {
    let newInputDate = { ...inputDate };
    if (value.length < 7) {
      newInputDate.time = value;
    } else {
      newInputDate.date = value;
    }
    setInputDate(newInputDate);
  };

  // 게시물 내용 State, Handle
  const [inputContents, setInputContents] = useState<string>("");

  const ContentsInputHandle = (value: string) => {
    setInputContents(value);
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

  // 해당 컴포넌트가 실행 될때 카테고리 박스 각 1번째 칸이 선택된 상태로 만들어준다.
  useEffect(() => {
    CategoryLeftSelectHandle("1");
    CategoryRightSelectHandle("7");
  }, []);

  // 서브 체크박스 Left Handle
  const addSubCategoryLeftHandle = (idx: number, name: string) => {
    const newCategory = [...leftMainCategories];
    newCategory.forEach((mainCategory) => {
      mainCategory.subCategories.forEach((subCategory) => {
        if (mainCategory.id === String(idx) && subCategory.name === name) {
          subCategory.isSelect = !subCategory.isSelect;
        } else if (
          mainCategory.id === String(idx) &&
          subCategory.name === name
        ) {
          subCategory.isSelect = !subCategory.isSelect;
        }
      });
    });
    setLeftMainCategories(newCategory);
  };

  // 서브 체크박스 Right Handle
  const addSubCategoryRightHandle = (idx: number, name: string) => {
    const newCategory = [...rightMainCategories];
    newCategory.forEach((mainCategory) => {
      mainCategory.subCategories.forEach((subCategory) => {
        if (mainCategory.id === String(idx) && subCategory.name === name) {
          subCategory.isSelect = !subCategory.isSelect;
        } else if (
          mainCategory.id === String(idx) &&
          subCategory.name === name
        ) {
          subCategory.isSelect = !subCategory.isSelect;
        }
      });
    });
    setRightMainCategories(newCategory);
  };

  // 업로드 할 사진정보 state
  const [files, setFiles] = useState<any[] | undefined[]>([]);

  const photoPath = (file: any) => {
    let newFiles = [...files];
    if (files.length === 5) {
      alert("더이상 등록 할 수 없습니다.");
    } else if (files.length + file.length > 5) {
      alert("5장까지만 등록 해 주세요.");
    } else if (newFiles.length < 5) {
      for (let i = 0; i < file.length; i++) {
        file[i].preview = URL.createObjectURL(file[i]);
        newFiles.push(file[i]);
      }
      newFiles = newFiles.slice(0, 5);
      setFiles(newFiles);
    }
  };

  const deletePhotoHandle = (path: string) => {
    const deleteNewFiles = files.filter((file) => {
      return file.preview !== path;
    });
    setFiles(deleteNewFiles);
  };

  const registerPost = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("imagePath", file));
    formData.append("title", inputTitle);
    formData.append("contents", inputContents);
    formData.append("address", "서울특별시 동대문구");
    formData.append("dueDate", `${inputDate.date}${inputDate.time}`);
    formData.append("latitude", "123");
    formData.append("longitude", "23");
    formData.append("category1", "1,1");
    formData.append("category2", `침대,티비선반`);

    const result: AxiosResponse = await axios.post(
      `${process.env.REACT_APP_API_URL}/post`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!result.data) {
      console.log("Upload Err");
    }
  };

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
        {/* 마감시간 작성 칸 ------------------------------------------------*/}
        <DateArea>
          <div className="Date_Word">
            <ClockIcon color="#2D2D2D" />
            <span>{"마감 시간을 설정해 주세요."}</span>
          </div>
          <div className="Date_Input">
            <DatePicker
              value={inputDate?.date}
              type={"date"}
              onChange={(e) => DateInputHandle(e.target.value)}
            ></DatePicker>
            <TimePicker
              value={inputDate?.time}
              type={"time"}
              onChange={(e) => DateInputHandle(e.target.value)}
            ></TimePicker>
          </div>
        </DateArea>
      </TitleDatePickerContainer>

      {/* 내용 설명 칸 ----------------------------------------------------*/}
      <PostContentsArea>
        <div className="Contents_Word">
          <PaperIcon color="#2D2D2D" />
          <span>{"설명을 작성해 주세요."}</span>
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
              {leftMainCategories.map((category, idx) => {
                return (
                  <MainCategoryItem
                    key={`${category.name + idx}`}
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
              {leftMainCategories.map((category, idx) => {
                return category.isSelect
                  ? category.subCategories.map((subCategory) => {
                      return (
                        <SubCategoryItem
                          key={`${subCategory.name + (idx + 1)}`}
                          checked={subCategory.isSelect}
                          onClick={() =>
                            addSubCategoryLeftHandle(idx + 1, subCategory.name)
                          }
                        >
                          <CategoryIcon isCheck={subCategory.isSelect} />
                          <span>{subCategory.name}</span>
                        </SubCategoryItem>
                      );
                    })
                  : null;
              })}
            </SubCategoryBox>
          </PostCategory>
          <PostCategory>
            <MainCategoryBox>
              {rightMainCategories.map((category, idx) => {
                return (
                  <MainCategoryItem
                    key={`${category.name + (idx + 1)}`}
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
              {rightMainCategories.map((category, idx) => {
                return category.isSelect
                  ? category.subCategories.map((subCategory) => {
                      return (
                        <SubCategoryItem
                          key={`${subCategory.name + (idx + 1)}`}
                          checked={subCategory.isSelect}
                          onClick={() =>
                            addSubCategoryRightHandle(idx + 7, subCategory.name)
                          }
                        >
                          <CategoryIcon isCheck={subCategory.isSelect} />
                          <span>{subCategory.name}</span>
                        </SubCategoryItem>
                      );
                    })
                  : null;
              })}
            </SubCategoryBox>
          </PostCategory>
        </div>
      </PostCategoryArea>

      {/* 사진 업로드 칸 --------------------------------------------------*/}
      <UploadPhotoArea>
        <div className="Upload_Word">
          <CameraIcon color="#2D2D2D" />
          <span>{"사진을 등록해 주세요. (최대 5장)"}</span>
        </div>
        {files[0] === undefined ? (
          <>
            <div className="Photo_Container">
              <PhotoUpload photoPath={photoPath} arrPhoto={files} />
            </div>
          </>
        ) : (
          files.map((file: any, idx) => {
            return (
              <div
                key={`${file.preview}+${idx}`}
                id={file.preview}
                className="Photo_Container"
              >
                <div
                  className="Delete_Photo"
                  onClick={() => deletePhotoHandle(file.preview)}
                >
                  <div className="Minus_Button"></div>
                </div>
                <PhotoUpload
                  key={`${file.preview}+${idx}`}
                  photoPath={photoPath}
                  arrPhoto={files}
                />
                <img
                  className="Photo_Thumb"
                  src={file.preview}
                  alt="Upload_Photo"
                />
              </div>
            );
          })
        )}
      </UploadPhotoArea>

      {/* 주소 입력 칸 ----------------------------------------------------*/}
      <AddressArea>
        <div className="Address_Word">
          <MapMarkIcon color="#2D2D2D" />
          <span>{"주소를 검색해 주세요."}</span>
        </div>
        <div className="Search_Address_Box">
          <InputAddress />
          <button>주소 검색</button>
        </div>
      </AddressArea>

      {/* 등록 취소 버튼 ---------------------------------------------------*/}
      <SubmitArea>
        <SubmitBtn onClick={() => registerPost()}>완료</SubmitBtn>
        <CancelBtn>취소</CancelBtn>
      </SubmitArea>
    </CreatePostContainer>
  );
}

export default CreatePostPage;
