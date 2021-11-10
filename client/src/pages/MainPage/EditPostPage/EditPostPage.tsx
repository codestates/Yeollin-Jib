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
  EditPostContainer,
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
  Body,
  MainArea,
} from "./EditPostPage.style";
import { initMainCategories } from "../Categories";
import { RootState } from "../../../reducers/rootReducer";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import KakaoMap from "../../../components/KakaoMap/KakaoMap";
import SearchAddress from "../../../components/SearchAddress/SearchAddress";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

function EditPostPage() {
  const history = useHistory();
  let location: any = useLocation();
  if (location.state === undefined) {
    history.go(-1);
  }

  // 저장된 토큰값을 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  // 게시물 제목 State, Handle
  const [inputTitle, setInputTitle] = useState<string>("");

  const TitleInputHandle = (value: string) => {
    setInputTitle(value);
  };

  // 게시물 마감일자 State, Handle
  const [inputDate, setInputDate] = useState<string>("");
  const [inputTime, setInputTime] = useState<string>("");

  // 게시물 내용 State, Handle
  const [inputContents, setInputContents] = useState<string>("");

  const ContentsInputHandle = (value: string) => {
    setInputContents(value);
  };

  // 대분류 테이블 State, Handle
  const [mainCategories, setMainCategories] = useState(initMainCategories);

  const CategorySelectHandle = (id: string, selectIdx: number): void => {
    let newMainCate = [...mainCategories];
    newMainCate.forEach((mainCate, idx) => {
      if (selectIdx < 6) {
        if (mainCate.isSelect && idx < 6) {
          mainCate.isSelect = false;
        }
        if (id === mainCate.id) {
          mainCate.isSelect = true;
        }
      } else if (selectIdx >= 6) {
        if (mainCate.isSelect && idx >= 6) {
          mainCate.isSelect = false;
        }
        if (id === mainCate.id) {
          mainCate.isSelect = true;
        }
      }
    });
    setMainCategories(newMainCate);
  };

  // 서브 체크박스 Handle
  const addSubCategoryHandle = (idx: number, name: string) => {
    console.log(idx, name);
    const newMainCate = [...mainCategories];
    newMainCate.forEach((mainCategory) => {
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
    setMainCategories(newMainCate);
  };

  // 기존 imagePath
  const imagePath = location.state.postData.imagePath.split(",");

  // 삭제 imagePath
  const [imageDelete, setImageDelete] = useState<string>("");

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

  // 선택된 카테고리 이름 string ex) main => 1,1,2,3,3,4,4,7,7,9,9 sub => 침대, 이불, 유모차,장난감,행거,스탠드
  const submitCateHandle = (name: string) => {
    let submitMainCategory: string[] = [];
    let submitSubCategory: string[] = [];
    mainCategories.forEach((mainCategory, idx) => {
      const subCheck = mainCategory.subCategories.filter((subCategory) => {
        return subCategory.isSelect === true;
      });
      subCheck.forEach((subCate) => {
        submitMainCategory.push(`${idx + 1}`);
        submitSubCategory.push(subCate.name);
      });
    });

    const newSubmitMainCategory = submitMainCategory.join(",");
    const newSubmitSubCategory = submitSubCategory.join(",");

    if (name === "main") {
      return newSubmitMainCategory;
    }
    return newSubmitSubCategory;
  };

  const [addressInput, setAddressInput] = useState("");

  const searchAddressHandle = (address: string) => {
    setAddressInput(address);
  };

  const [addressCoordinate, setAddressCoordinate] = useState<number[]>([]);

  const searchCoordinateHandle = (lat: number, log: number) => {
    let newCoordinate: number[] = [];
    newCoordinate.push(lat);
    newCoordinate.push(log);
    setAddressCoordinate(newCoordinate);
  };

  const registerPost = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("image", file));
    formData.append("title", inputTitle);
    formData.append("contents", inputContents);
    formData.append("address", addressInput);
    formData.append("dueDate", `${inputDate},${inputTime}`);
    formData.append("latitude", `${addressCoordinate[0]}`);
    formData.append("longitude", `${addressCoordinate[1]}`);
    formData.append("category1", submitCateHandle("main"));
    formData.append("category2", submitCateHandle("sub"));
    console.log(addressCoordinate);
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
    if (result) {
      history.push({
        pathname: "/detail",
      });
    }
  };

  const EditPullDataHandle = (postData: any) => {
    let dueDate = postData.dueDate.split(",");
    let images = postData.imagePath.split(",");
    console.log(postData);
    setInputTitle(postData.title);
    setInputDate(dueDate[0]);
    setInputTime(dueDate[1]);
    setInputContents(postData.contents);
  };

  // 카테고리 초기화 1,7번탭 선택상태로 컴포넌트 랜더링
  useEffect(() => {
    const newMainCategory = [...initMainCategories];
    newMainCategory[0].isSelect = true;
    newMainCategory[6].isSelect = true;
    setMainCategories(newMainCategory);
    EditPullDataHandle(location.state.postData);
  }, []);

  // unmount 시 카테고리 isSelect 상태 초기화
  useEffect(() => {
    return () => {
      initMainCategories.forEach((mainCategory) => {
        mainCategory.subCategories.forEach((subCategory) => {
          subCategory.isSelect = false;
        });
      });
    };
  }, []);

  // 오늘의 날짜 구하기 date 선택 제한
  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    if (day < 10) {
      return `${year}-${month + 1}-0${day}`;
    } else {
      return `${year}-${month + 1}-${day}`;
    }
  };
  return (
    <Body>
      <MainArea>
        <EditPostContainer>
          <span className="Edit_Post_Word">{"게시글 수정"}</span>

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
                  maxLength={40}
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
                  value={inputDate}
                  type={"date"}
                  min={getToday()}
                  onChange={(e) => setInputDate(e.target.value)}
                ></DatePicker>
                <TimePicker
                  value={inputTime}
                  type={"time"}
                  onChange={(e) => setInputTime(e.target.value)}
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
                  {mainCategories.map((category, idx) => {
                    if (idx < 6) {
                      return (
                        <MainCategoryItem
                          key={`${category.name + idx}`}
                          id={category.id}
                          onClick={() => CategorySelectHandle(category.id, idx)}
                          isSelect={category.isSelect}
                        >
                          <span>{category.name}</span>
                        </MainCategoryItem>
                      );
                    }
                  })}
                </MainCategoryBox>
                <SubCategoryBox>
                  {mainCategories.map((category, idx) => {
                    return category.isSelect && idx < 6
                      ? category.subCategories.map((subCategory) => {
                          return (
                            <SubCategoryItem
                              key={`${subCategory.name + (idx + 1)}`}
                              checked={subCategory.isSelect}
                              onClick={() =>
                                addSubCategoryHandle(idx + 1, subCategory.name)
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
                  {mainCategories.map((category, idx) => {
                    if (idx >= 6) {
                      return (
                        <MainCategoryItem
                          key={`${category.name + (idx + 1)}`}
                          id={category.id}
                          onClick={() => CategorySelectHandle(category.id, idx)}
                          isSelect={category.isSelect}
                        >
                          <span>{category.name}</span>
                        </MainCategoryItem>
                      );
                    }
                  })}
                </MainCategoryBox>
                <SubCategoryBox>
                  {mainCategories.map((category, idx) => {
                    return category.isSelect && idx >= 6
                      ? category.subCategories.map((subCategory) => {
                          return (
                            <SubCategoryItem
                              key={`${subCategory.name + (idx + 1)}`}
                              checked={subCategory.isSelect}
                              onClick={() =>
                                addSubCategoryHandle(idx + 1, subCategory.name)
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
            {imagePath[0] === undefined ? (
              <>
                <div className="Photo_Container">
                  <PhotoUpload photoPath={photoPath} arrPhoto={files} />
                </div>
              </>
            ) : (
              imagePath.map((file: any, idx: any) => {
                return (
                  <div
                    key={`${file}+${idx}`}
                    id={`${file}+${idx}`}
                    className="Photo_Container"
                  >
                    <div
                      className="Delete"
                      onClick={() => deletePhotoHandle(file)}
                    >
                      x
                    </div>
                    <PhotoUpload
                      key={`${file}+${idx}`}
                      photoPath={photoPath}
                      arrPhoto={files}
                    />
                    <img
                      className="Photo_Thumb"
                      src={`${process.env.REACT_APP_API_URL}${file.slice(6)}`}
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
              <InputAddress value={addressInput} readOnly />
              <SearchAddress searchAddressHandle={searchAddressHandle} />
            </div>
            {addressInput ? (
              <KakaoMap
                addressInput={addressInput}
                searchCoordinateHandle={searchCoordinateHandle}
              />
            ) : null}
          </AddressArea>
          {/* 등록 취소 버튼 ---------------------------------------------------*/}
          <SubmitArea>
            <SubmitBtn onClick={() => registerPost()}>완료</SubmitBtn>
            <Link to="/main">
              <CancelBtn>취소</CancelBtn>
            </Link>
          </SubmitArea>
        </EditPostContainer>
      </MainArea>
    </Body>
  );
}

export default EditPostPage;
