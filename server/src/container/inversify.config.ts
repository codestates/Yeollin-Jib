import { Container } from "inversify";
import { UserData } from "../data/userData";
import { PostData } from "../data/postData";
import { PostCategoryData } from "../data/postCategoryData";
import { CategoryData } from "../data/categoryData";
import { StorageData } from "../data/storageData";
import { CommentData } from "../data/commentData";
import { TYPES } from "./types";

export const myContainer = new Container();
myContainer.bind<UserData>(TYPES.userDB).to(UserData);
myContainer.bind<PostData>(TYPES.postDB).to(PostData);
myContainer.bind<PostCategoryData>(TYPES.postCategoryDB).to(PostCategoryData);
myContainer.bind<CategoryData>(TYPES.categoryDB).to(CategoryData);
myContainer.bind<CommentData>(TYPES.commentDB).to(CommentData);
myContainer.bind<StorageData>(TYPES.storageDB).to(StorageData);
