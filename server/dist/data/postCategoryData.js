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
exports.PostCategoryData = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const post_category_1 = __importDefault(require("../models/post_category"));
let PostCategoryData = class PostCategoryData {
    createPostCategory(postId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_category_1.default.create({
                postId: postId,
                categoryId: categoryId,
            });
        });
    }
    findPostCategory(postId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_category_1.default.create({
                postId: postId,
                categoryId: categoryId,
            });
        });
    }
    updateFalsePostCategory(postId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_category_1.default.update({ Boolean: false }, { where: { postId: postId, categoryId: categoryId } });
        });
    }
    updateTruePostCategory(postId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_category_1.default.update({ Boolean: true }, { where: { postId: postId, categoryId: categoryId } });
        });
    }
    deletePostCategoryByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            post_category_1.default.destroy({
                where: { postId: postId },
            });
        });
    }
};
PostCategoryData = __decorate([
    (0, inversify_1.injectable)()
], PostCategoryData);
exports.PostCategoryData = PostCategoryData;
//# sourceMappingURL=postCategoryData.js.map