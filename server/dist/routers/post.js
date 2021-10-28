"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postRouter = express_1.default.Router();
const postcontroller = __importStar(require("../controllers/post/index"));
const accessToken_1 = __importDefault(require("../middleware/accessToken"));
const multer_1 = require("../middleware/multer");
// 게시물 업로드
postRouter.post("/", accessToken_1.default, multer_1.upload.array("image", 5), postcontroller.post_user);
// 메인페이지 게시물 리스트 첫 조회
postRouter.get("/page", accessToken_1.default, postcontroller.get_page);
// 무한스크롤 리스트 조회
postRouter.get("/page/:id", accessToken_1.default, postcontroller.get_infinite);
// 유저 작성 게시물 리스트 조회
postRouter.get("/user", accessToken_1.default, postcontroller.get_user);
// 카테고리 리스트 조회
postRouter.get("/category", accessToken_1.default, postcontroller.category_find);
// 게시물 조회(열람)
postRouter.get("/:id", accessToken_1.default, postcontroller.get);
// 게시물 수정
postRouter.patch("/:id", accessToken_1.default, multer_1.upload.array("image", 5), postcontroller.put);
// 게시물 삭제
postRouter.delete("/:id", accessToken_1.default, postcontroller.delete_);
exports.default = postRouter;
//# sourceMappingURL=post.js.map