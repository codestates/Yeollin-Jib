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
exports.StorageData = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const storage_1 = __importDefault(require("../models/storage"));
let StorageData = class StorageData {
    findAllOnlyStorageIdByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return storage_1.default.findAll({
                where: { userId },
                attributes: ["id"],
            });
        });
    }
    findAllStorageIdByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return storage_1.default.findAll({
                where: { postId: postId },
            });
        });
    }
    createOrFindStroage(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return storage_1.default.findOrCreate({
                where: {
                    postId,
                    userId,
                },
                defaults: {
                    postId,
                    userId,
                },
            });
        });
    }
    findStorageByPostAndUserId(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return storage_1.default.findOne({
                where: { userId, postId },
            });
        });
    }
    deleteStorageByPostAndUserId(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            storage_1.default.destroy({
                where: { userId, postId },
            });
        });
    }
};
StorageData = __decorate([
    (0, inversify_1.injectable)()
], StorageData);
exports.StorageData = StorageData;
//# sourceMappingURL=storageData.js.map