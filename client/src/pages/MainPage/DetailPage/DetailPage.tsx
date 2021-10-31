import React, { useEffect, useState } from "react";
import { DeleteIcon, EditPencilIcon, LikeIcon } from "../../../icons/Icons";
import {
  DetailPageContainer,
  TitleArea,
  LikeAndCommentIconArea,
  PostContentsArea,
  PhotoBox,
  Photo,
  ContentsBox,
  ContentsUserBox,
  TextBox,
  Timer,
  DueDateBox,
  CategoryBox,
  MapArea,
  CommentArea,
  Comment,
  SubmitCommentBtn,
} from "./DetailPage.style";

function DetailPage() {
  return (
    <DetailPageContainer>
      <TitleArea>
        <div className="Post_Title">{"이민으로 인해 이것저것 나눔합니다"}</div>
        <div className="Edit_Delete">
          <EditPencilIcon color={"#2d2d2d"} />
          <DeleteIcon color={"#2d2d2d"} />
        </div>
      </TitleArea>
      <LikeAndCommentIconArea>
        <LikeIcon />
        <span>{"2개"}</span>
        <img src={"./images/commentMark.svg"} />
        <span>{"4개"}</span>
      </LikeAndCommentIconArea>
      <PostContentsArea>
        <PhotoBox>
          <img className="Photo_Slide_Button" src="./images/arrowLeft.svg" />
          <Photo>
            <img src="./images/test.jpeg" />
          </Photo>
          <img className="Photo_Slide_Button" src="./images/arrowRight.svg" />
        </PhotoBox>
        <ContentsBox>
          <ContentsUserBox></ContentsUserBox>
          <TextBox>
            <div className="Create_Post_Date">
              작성일<span className="Date">{"2021.10.19"}</span>
            </div>
            {"테스트"}
          </TextBox>
          <Timer>
            <div className="Due_Date_Icon_Box">
              <img
                className="Due_Date_Icon"
                src="./images/clock.svg"
                alt="dueDate"
              />
            </div>
            <div className="Due_Time">{"21:22:22"}</div>
          </Timer>
          <DueDateBox>
            <span className="Due_Date_Word">마감</span>
            <span className="Due_Date">{"2021년 10월 25일 오전 10시"}</span>
          </DueDateBox>
          <CategoryBox></CategoryBox>
        </ContentsBox>
      </PostContentsArea>
      <MapArea></MapArea>
      <CommentArea>
        <div className="Comment_Word"></div>
        <div className="Comment_Box">
          <Comment />
          <SubmitCommentBtn>등록</SubmitCommentBtn>
        </div>
      </CommentArea>
    </DetailPageContainer>
  );
}

export default DetailPage;
