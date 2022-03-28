import express from "express";
import accessToken from "../middleware/accessToken";
import { PostStorageController } from "../controllers/PostStorage";

import { body, query, param } from "express-validator";
import { validateError } from "../middleware/validator";

const router = express.Router();

export default function postStorageRouter(
  PostStorageController: PostStorageController,
) {
  router.get("/", accessToken, PostStorageController.get_likes);

  router.post(
    "/:postId",
    [
      param("postId")
        .trim()
        .notEmpty()
        .withMessage("postId 정보가 없습니다.")
        .isInt()
        .toInt()
        .withMessage("postId 번호를 입력해주세요."),
      validateError,
    ],
    accessToken,
    PostStorageController.post_like,
  );

  router.delete(
    "/:postId",
    [
      param("postId")
        .trim()
        .notEmpty()
        .withMessage("postId 정보가 없습니다.")
        .isInt()
        .toInt()
        .withMessage("postId 번호를 입력해주세요."),
      validateError,
    ],
    accessToken,
    PostStorageController.delete_like,
  );
  return router;
}
