import { DeleteIcon, EditPencilIcon } from "../../icons/Icons";
import { RootState } from "../../reducers/rootReducer";
import { useSelector } from "react-redux";

import {
  Comment,
  CommentUserPhoto,
  CommentUserContainer,
  CommentUserAndDate,
} from "./PostComment.style";

interface Comment {
  commentData: any;
  deleteCommentHandle: (target: string, commentId: number) => void;
}

function PostComment({
  commentData,
  deleteCommentHandle: deletePostHandle,
}: Comment) {
  const { id } = useSelector((state: RootState) => state.userReducer);

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
              <span>
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
      <div className="Comment_Contents">{commentData.contents}</div>
    </Comment>
  );
}

export default PostComment;
