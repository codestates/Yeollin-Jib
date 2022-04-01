import { body, query, param } from "express-validator";
import { validateError } from "./validatorError";

export const validaterParamPostId = [
  param("postId")
    .trim()
    .notEmpty()
    .withMessage("postId 정보가 없습니다.")
    .isInt()
    .toInt()
    .withMessage("postId 번호를 입력해주세요."),
  validateError,
];

export const validaterParamCommentId = [
  param("commentId")
    .trim()
    .notEmpty()
    .withMessage("commentId 정보가 없습니다.")
    .isInt()
    .toInt()
    .withMessage("commentId 번호를 입력해주세요."),
  validateError,
];

export const validaterParamPageNum = [
  param("pageNum")
    .trim()
    .notEmpty()
    .withMessage("pageNum 정보가 없습니다.")
    .isInt()
    .toInt()
    .withMessage("pageNum 번호를 입력해주세요."),
  validateError,
];
