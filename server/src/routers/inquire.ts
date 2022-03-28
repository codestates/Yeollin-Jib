import express from "express";
import { InquireController } from "../controllers/Inquire";

import { body } from "express-validator";
import { validateError } from "../middleware/validator";

const router = express.Router();

export default function inquireRouter(InquireController: InquireController) {
  router.post(
    "/",
    [
      body("email").isEmail().withMessage("이메일을 입력해주세요"),
      body("title").notEmpty().withMessage("제목을 입력해 주세요"),
      body("contents").notEmpty().withMessage("문의 내용을 입력해 주세요"),
      validateError,
    ],
    InquireController.sendInquire,
  );

  return router;
}
