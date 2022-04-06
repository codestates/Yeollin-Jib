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
exports.PostController = void 0;
const types_1 = require("../container/types");
class PostController {
    constructor(myContainer, fsModule) {
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const postCategoryRepository = this.container.get(types_1.TYPES.postCategoryDB);
            const categoryRepository = this.container.get(types_1.TYPES.categoryDB);
            const userId = req.cookies.id;
            const images = req.files;
            let imagesArray;
            let imagePaths;
            if (images) {
                imagesArray = images.map((oneFile) => {
                    return String(oneFile.path);
                });
                imagePaths = imagesArray.join(",");
            }
            const { title, contents, address, dueDate, latitude, longitude, category1, category2, } = req.body;
            const postCreate = yield postRepository.createPost(userId, title, contents, imagePaths, address, dueDate, latitude, longitude);
            if (!postCreate) {
                res.status(400).send({ message: "게시글이 생성되지 않았습니다." });
                return;
            }
            const postId = postCreate.id;
            const arrayCategory1 = category1.split(",");
            const arrayCategory2 = category2.split(",");
            const number = arrayCategory1.length;
            for (let i = 0; i < number; i++) {
                const findCategoryId = yield categoryRepository.findCategory(arrayCategory1[i], arrayCategory2[i]);
                postCategoryRepository.createPostCategory(postId, findCategoryId.id);
            }
            res
                .status(201)
                .json({ postId: postId, message: "게시글이 생성되었습니다." });
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const userId = req.cookies.id;
            const postId = Number(req.params.postId);
            const postDelete = yield postRepository.deletePostById(postId, userId);
            if (!postDelete) {
                res.status(404).json({ message: "삭제하려는 게시물이 없습니다." });
                return;
            }
            res.status(201).json({ message: "게시물이 삭제되었습니다." });
        });
        this.patchCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const postCategoryRepository = this.container.get(types_1.TYPES.postCategoryDB);
            const { postId, categoryId } = req.body;
            if (!(yield postRepository.findPostByPostId(postId))) {
                res
                    .status(404)
                    .send({ message: "카테고리를 변경하려는 게시물이 없습니다." });
                return;
            }
            const arrayCategoryId = categoryId.split(",");
            for (let i = 0; i < arrayCategoryId.length; i++) {
                const findPostCategory = yield postCategoryRepository.findPostCategory(postId, arrayCategoryId[i]);
                if (findPostCategory.Boolean === true) {
                    yield postCategoryRepository.updateFalsePostCategory(postId, arrayCategoryId[i]);
                }
                else {
                    yield postCategoryRepository.updateTruePostCategory(postId, arrayCategoryId[i]);
                }
            }
            res.status(200).send({ message: "정보 수정이 완료되었습니다" });
        });
        this.patch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const postCategoryRepository = this.container.get(types_1.TYPES.postCategoryDB);
            const categoryRepository = this.container.get(types_1.TYPES.categoryDB);
            const userId = req.cookies.id;
            const postId = Number(req.params.postId);
            const images = req.files;
            let imagesArray;
            let addImagePath;
            if (images) {
                imagesArray = images.map((oneFile) => {
                    return String(oneFile.path);
                });
                addImagePath = imagesArray.join(",");
            }
            const { title, contents, imagePath, imageDelete, address, dueDate, latitude, longitude, category1, category2, } = req.body;
            if (title) {
                postRepository.updatePostTitle(title, postId, userId);
            }
            if (contents) {
                postRepository.updatePostContents(contents, postId, userId);
            }
            if (address) {
                postRepository.updatePostAddress(address, postId, userId);
            }
            if (dueDate) {
                postRepository.updatePostDudate(dueDate, postId, userId);
            }
            if (latitude && longitude) {
                postRepository.updatePostCoordinate(latitude, longitude, postId, userId);
            }
            // image add
            if (addImagePath) {
                if (imagePath) {
                    const newImagePath = imagePath + "," + addImagePath;
                    postRepository.updatePostAddImage(newImagePath, postId, userId);
                }
                else {
                    postRepository.updatePostAddImage(addImagePath, postId, userId);
                }
            }
            // image delete
            if (imageDelete) {
                const deleteArrayImage = imageDelete.split(",");
                deleteArrayImage.map((value) => {
                    if (this.fs.existsSync(value)) {
                        this.fs.unlinkSync(value);
                    }
                });
            }
            // category
            if (category1 && category2) {
                yield postCategoryRepository.deletePostCategoryByPostId(postId);
                const arrayCategory1 = category1.split(",");
                const arrayCategory2 = category2.split(",");
                const number = arrayCategory1.length;
                for (let i = 0; i < number; i++) {
                    const find = yield categoryRepository.findCategory(arrayCategory1[i], arrayCategory2[i]);
                    postCategoryRepository.createPostCategory(postId, find.id);
                }
            }
            res.status(200).json({ message: "정보 수정이 완료되었습니다" });
        });
        this.getAllPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const pageNum = Number(req.params.pageNum);
            let offset = 0;
            if (pageNum > 1) {
                offset = 8 * (pageNum - 1);
            }
            const postData = yield postRepository.findAllEgithPostsByOffset(offset);
            if (postData.rows.length === 0) {
                res.status(404).send({ message: "더 이상 조회할 게시물이 없습니다." });
                return;
            }
            res.status(200).send({ postGet: postData });
        });
        this.getPostUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const userId = req.cookies.id;
            const pageNum = Number(req.params.pageNum);
            let offset = 0;
            if (pageNum > 1) {
                offset = 8 * (pageNum - 1);
            }
            const postData = yield postRepository.findAllUserPostByUserIdAndOffset(userId, offset);
            if (postData.rows.length === 0) {
                res.status(404).send({ message: "더 이상 조회할 게시물이 없습니다." });
                return;
            }
            res.status(200).send({ postGet: postData });
        });
        this.getCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const categoryRepository = this.container.get(types_1.TYPES.categoryDB);
            const pageNum = Number(req.query.page);
            const categoryNumber = Number(req.query.code);
            let categoryNumbers = [];
            const categoryGet = yield categoryRepository.findCategory1Code(categoryNumber);
            if (categoryGet) {
                categoryGet.map((category) => {
                    categoryNumbers.push(category.id);
                });
            }
            let offset = 0;
            if (pageNum > 1) {
                offset = 8 * (pageNum - 1);
            }
            // 카테고리 대분류
            const postData = yield postRepository.findAllPostByCategoryAndOffset(offset, categoryNumbers);
            if (postData.rows.length === 0) {
                res.status(404).send({ message: "더이상 조회할 게시물이 없습니다." });
                return;
            }
            res.status(200).send({ postGet: postData });
        });
        this.getSearchForPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const pageNum = Number(req.query.page);
            const code = req.query.code; //title or address
            const search = String(req.query.search);
            let offset = 0;
            if (pageNum > 1) {
                offset = 8 * (pageNum - 1);
            }
            let postData;
            if (code === "title") {
                postData = yield postRepository.findAllPostByTitleSearch(offset, search);
            }
            else if (code === "address") {
                postData = yield postRepository.findAllPostByAddressSearch(offset, search);
            }
            if ((postData === null || postData === void 0 ? void 0 : postData.rows.length) === 0) {
                res.status(404).send({ message: "더이상 조회할 게시물이 없습니다." });
                return;
            }
            res.status(200).send({ postGet: postData });
        });
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const storageRepository = this.container.get(types_1.TYPES.storageDB);
            const postId = Number(req.params.postId);
            const postStorageData = yield storageRepository.findAllStorageIdByPostId(postId);
            const postData = yield postRepository.readPostByPostId(postId);
            if (!postData) {
                res
                    .status(404)
                    .json({ message: "이미 삭제된 게시글이거나 없는 게시글 입니다." });
                return;
            }
            res
                .status(200)
                .json({ postLike: postStorageData.length, postGet: postData });
        });
        this.container = myContainer;
        this.fs = fsModule;
    }
}
exports.PostController = PostController;
//# sourceMappingURL=Post.js.map