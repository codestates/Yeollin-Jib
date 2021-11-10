import { DeleteIcon, EditPencilIcon } from "../../icons/Icons";
import { RootState } from "../../reducers/rootReducer";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Comment,
  CommentUserPhoto,
  CommentUserContainer,
  CommentUserAndDate,
  EditContainer,
  EditInput,
  SubmitButton,
} from "./PostComment.style";
import axios, { AxiosResponse } from "axios";

interface Comment {
  commentData: any;
  deleteCommentHandle: (target: string, commentId: number) => void;
}

function PostComment({
  commentData,
  deleteCommentHandle: deletePostHandle,
}: Comment) {
  const { id } = useSelector((state: RootState) => state.userReducer);
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState<string>(commentData.contents);
  const [showValue, setShowValue] = useState<string>(editValue);

  const editCancel = () => {
    if (!isEdit) {
      setShowValue(editValue);
    } else if(isEdit){
      setEditValue(showValue)
    }
    setIsEdit(!isEdit);
  };

  const submitHandle = async () => {
    if (commentData.contents !== editValue) {
      const result: AxiosResponse = await axios.patch(
        `${process.env.REACT_APP_API_URL}/comment/${commentData.id}`,
        { contents: editValue },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        setIsEdit(false);
      }
    }
  };
  return (
    <Comment>
      <CommentUserContainer>
        <CommentUserAndDate>
          <CommentUserPhoto>
            {commentData.user.imagePath === null ? (
              <img src="./images/profile.svg" alt="UserPhoto" />
            ) : commentData.user.imagePath?.includes(":") ? (
              <img src={commentData.user.imagePath} />
            ) : (
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${commentData.user.imagePath}`}
              />
            )}
          </CommentUserPhoto>
          <span className="Comment_User_Name">{commentData.user.nickname}</span>
          <span className="Comment_Date">
            {commentData.createdAt.slice(0, 10).replace(/-/g, ". ")}
          </span>
        </CommentUserAndDate>
        {id === Number(commentData.userId) ? (
          <>
            <div className="Edit_Delete">
              <span
                onClick={() => {
                  editCancel();
                }}
              >
                <EditPencilIcon color={"#2d2d2d"} />
              </span>
              <span onClick={() => deletePostHandle("comment", commentData.id)}>
                <DeleteIcon color={"#2d2d2d"} />
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </CommentUserContainer>
      {!isEdit ? (
        <div className="Comment_Contents">{editValue}</div>
      ) : (
        <EditContainer>
          <EditInput
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
            }}
          />
          <SubmitButton
            onClick={() => {
              submitHandle();
            }}
          >
            수정
          </SubmitButton>
        </EditContainer>
      )}
    </Comment>
  );
}

export default PostComment;
