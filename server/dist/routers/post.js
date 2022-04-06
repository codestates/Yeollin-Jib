"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accessToken_1 = __importDefault(require("../middleware/accessToken"));
const multer_1 = require("../middleware/multer");
const express_validator_1 = require("express-validator");
const validatorError_1 = require("../middleware/validatorError");
const validator_1 = require("../middleware/validator");
const router = express_1.default.Router();
function postRouter(PostController) {
    // 게시물 업로드
    // Multipul/form-data는 validator 작동하지 않음
    router.post("/", accessToken_1.default, multer_1.upload.array("image", 5), PostController.createPost);
    // 게시물 삭제
    router.delete("/:postId", validator_1.validaterParamPostId, accessToken_1.default, PostController.deletePost);
    // 게시물 카테고리 수정 (True False)
    router.patch("/category", [
        (0, express_validator_1.body)("postId").notEmpty().withMessage("postId 정보가 없습니다."),
        (0, express_validator_1.body)("categoryId").notEmpty().withMessage("categoryId 정보가 없습니다."),
        validatorError_1.validateError,
    ], accessToken_1.default, PostController.patchCategory);
    // 게시물 수정
    router.patch("/:postId", validator_1.validaterParamPostId, accessToken_1.default, multer_1.upload.array("image", 5), PostController.patch);
    // 게시물 리스트 조회
    router.get("/page/:pageNum", validator_1.validaterParamPageNum, PostController.getAllPost);
    // 유저가 작성한 게시물 리스트 조회 (내가 쓴 게시물)
    router.get("/user/:pageNum", validator_1.validaterParamPageNum, accessToken_1.default, PostController.getPostUser);
    // 카테고리 리스트 조회
    router.get("/category", [
        (0, express_validator_1.query)("page")
            .trim()
            .notEmpty()
            .withMessage("page 정보가 없습니다.")
            .isInt()
            .withMessage("page 번호를 입력해주세요."),
        (0, express_validator_1.query)("code")
            .trim()
            .notEmpty()
            .withMessage("code 정보가 없습니다.")
            .isInt()
            .withMessage("code 번호를 입력해주세요."),
        validatorError_1.validateError,
    ], PostController.getCategory);
    // 게시물 검색 조회 기능 (제목, 주소)
    router.get("/search/condition", [
        (0, express_validator_1.query)("page")
            .trim()
            .notEmpty()
            .withMessage("page 정보가 없습니다.")
            .isInt()
            .withMessage("page 번호를 입력해주세요."),
        (0, express_validator_1.query)("code").trim().notEmpty().withMessage("code 정보가 없습니다."),
        (0, express_validator_1.query)("search").trim().notEmpty().withMessage("search 정보가 없습니다."),
        validatorError_1.validateError,
    ], PostController.getSearchForPost);
    // 게시물 조회(열람)
    router.get("/:postId", validator_1.validaterParamPostId, PostController.getPost);
    return router;
}
exports.default = postRouter;
//# sourceMappingURL=post.js.map