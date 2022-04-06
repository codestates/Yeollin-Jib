"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostData = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
const storage_1 = __importDefault(require("../models/storage"));
const post_category_1 = __importDefault(require("../models/post_category"));
const sequelize_1 = __importDefault(require("sequelize"));
const { or, and, gt, lt, like, overlap } = sequelize_1.default.Op;
let PostData = class PostData {
    createPost(userId, title, contents, imagePath, address, dueDate, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.create({
                userId: userId,
                title: title,
                contents: contents,
                imagePath: imagePath,
                address: address,
                dueDate: dueDate,
                latitude: latitude,
                longitude: longitude,
            });
        });
    }
    findPostByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findOne({
                where: { id: postId },
            });
        });
    }
    findAllOnlyPostIdByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findAll({
                where: { userId },
                attributes: ["id"],
            });
        });
    }
    findAllOnlyPostImagePathByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findAll({
                where: { userId: userId },
                attributes: ["imagePath"],
            });
        });
    }
    findAllEgithPostsByOffset(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findAndCountAll({
                attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
                order: [["id", "DESC"]],
                limit: 8,
                offset: offset,
                distinct: true,
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                    {
                        model: storage_1.default,
                        attributes: ["userId"],
                    },
                    {
                        model: post_category_1.default,
                        attributes: ["categoryId"],
                    },
                ],
            });
        });
    }
    findAllUserPostByUserIdAndOffset(userId, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findAndCountAll({
                attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
                limit: 8,
                offset: offset,
                order: [["id", "DESC"]],
                distinct: true,
                where: { userId: userId },
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                    {
                        model: storage_1.default,
                        attributes: ["userId"],
                    },
                    {
                        model: post_category_1.default,
                        attributes: ["categoryId"],
                    },
                ],
            });
        });
    }
    findAllPostStorageByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findAndCountAll({
                attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
                order: [["id", "DESC"]],
                distinct: true,
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                    {
                        model: storage_1.default,
                        attributes: ["userId"],
                        where: { userId: userId },
                    },
                    {
                        model: post_category_1.default,
                        attributes: ["categoryId"],
                    },
                ],
            });
        });
    }
    findAllPostByCategoryAndOffset(offset, categoryNumbers) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findAndCountAll({
                attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
                order: [["id", "DESC"]],
                limit: 8,
                offset: offset,
                distinct: true,
                include: [
                    {
                        model: post_category_1.default,
                        attributes: ["postId", "categoryId", "Boolean"],
                        where: { categoryId: { [or]: categoryNumbers } },
                    },
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                    {
                        model: storage_1.default,
                        attributes: ["userId"],
                    },
                ],
            });
        });
    }
    findAllPostByTitleSearch(offset, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findAndCountAll({
                attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
                order: [["id", "DESC"]],
                limit: 8,
                offset: offset,
                distinct: true,
                where: {
                    title: {
                        [like]: "%" + search + "%",
                    },
                },
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                    {
                        model: storage_1.default,
                        attributes: ["userId"],
                    },
                    {
                        model: post_category_1.default,
                        attributes: ["categoryId"],
                    },
                ],
            });
        });
    }
    findAllPostByAddressSearch(offset, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findAndCountAll({
                order: [["id", "DESC"]],
                limit: 8,
                offset: offset,
                distinct: true,
                where: {
                    address: {
                        [like]: "%" + search + "%",
                    },
                },
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                    {
                        model: storage_1.default,
                        attributes: ["userId"],
                    },
                    {
                        model: post_category_1.default,
                        attributes: ["categoryId"],
                    },
                ],
            });
        });
    }
    readPostByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.findOne({
                where: { id: postId },
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "email", "imagePath"],
                    },
                    {
                        model: post_category_1.default,
                        required: false,
                        attributes: ["categoryId", "Boolean"],
                    },
                    {
                        model: storage_1.default,
                        attributes: ["userId"],
                    },
                ],
            });
        });
    }
    updatePostTitle(title, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_1.default.update({ title: title }, { where: { id: postId, userId: userId } });
        });
    }
    updatePostContents(contents, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_1.default.update({ contents: contents }, { where: { id: postId, userId: userId } });
        });
    }
    updatePostAddress(address, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_1.default.update({ address: address }, { where: { id: postId, userId: userId } });
        });
    }
    updatePostDudate(dueDate, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_1.default.update({ dueDate: dueDate }, { where: { id: postId, userId: userId } });
        });
    }
    updatePostCoordinate(latitude, longitude, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_1.default.update({ latitude: latitude, longitude: longitude }, { where: { id: postId, userId: userId } });
        });
    }
    updatePostAddImage(imagePath, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_1.default.update({ imagePath: imagePath }, { where: { id: postId, userId: userId } });
        });
    }
    deletePostById(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_1.default.destroy({ where: { id: postId, userId: userId } });
        });
    }
};
PostData = __decorate([
    (0, inversify_1.injectable)()
], PostData);
exports.PostData = PostData;
//# sourceMappingURL=postData.js.map