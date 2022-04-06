"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostStorageController = void 0;
const types_1 = require("../container/types");
class PostStorageController {
    constructor(myContainer) {
        this.getStroage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const userId = req.cookies.id;
            const postData = yield postRepository.findAllPostStorageByUserId(userId);
            if (postData.rows.length === 0) {
                res.status(404).send({ message: "더이상 조회할 게시물이 없습니다." });
                return;
            }
            res.status(200).send({ postGet: postData });
        });
        this.postStorage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const storageRepository = this.container.get(types_1.TYPES.storageDB);
            const userId = Number(req.cookies.id);
            const postId = Number(req.params.postId);
            const postData = yield postRepository.findPostByPostId(postId);
            if (!postData) {
                res.status(403).send({ message: "게시글이 존재하지 않습니다." });
                return;
            }
            const [createStorage, exist] = yield storageRepository.createOrFindStroage(postId, userId);
            if (!exist) {
                res.status(200).send({ message: "이미 찜하기 등록 되었습니다." });
                return;
            }
            res
                .status(201)
                .send({ message: "게시물 찜하기가 성공적으로 등록 되었습니다." });
        });
        this.deleteStorage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const storageRepository = this.container.get(types_1.TYPES.storageDB);
            const userId = Number(req.cookies.id);
            const postId = Number(req.params.postId);
            if (!(yield storageRepository.findStorageByPostAndUserId(postId, userId))) {
                res.status(404).json({ message: "이미 찜하기가 삭제되었습니다." });
                return;
            }
            storageRepository.deleteStorageByPostAndUserId(postId, userId);
            res
                .status(200)
                .json({ message: "게시물 찜하기가 성공적으로 삭제되었습니다." });
        });
        this.container = myContainer;
    }
}
exports.PostStorageController = PostStorageController;
//# sourceMappingURL=PostStorage.js.map