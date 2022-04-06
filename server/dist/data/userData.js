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
exports.UserData = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const user_1 = __importDefault(require("../models/user"));
let UserData = class UserData {
    newCreateUser(nickname, email, salt, encryptedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            // 일반 회원가입 시 - 로그인 타입 false, 소셜 로그인 시 - true
            return user_1.default.create({
                nickname,
                email,
                salt,
                password: encryptedPassword,
                loginType: false,
            });
        });
    }
    findUserByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findOne({
                where: { id: userId },
            });
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findOne({ where: { email: email } });
        });
    }
    findUserByNickname(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findOne({
                where: {
                    nickname: nickname,
                },
            });
        });
    }
    findAllUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findAll({
                where: { id: userId },
                attributes: [
                    "id",
                    "email",
                    "nickname",
                    "userArea",
                    "imagePath",
                    "loginType",
                ],
            });
        });
    }
    updateUserNicknameByUserId(nickname, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            user_1.default.update({
                nickname: nickname,
            }, { where: { id: userId } });
        });
    }
    updateUserPasswordByUserId(salt, newEncryptedPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            user_1.default.update({
                salt: salt,
                password: newEncryptedPassword,
            }, { where: { id: userId } });
        });
    }
    updateUserAreaByUserId(userArea, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            user_1.default.update({
                userArea: userArea,
            }, { where: { id: userId } });
        });
    }
    updateUserPhotoByUserId(imagePath, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            user_1.default.update({ imagePath: imagePath }, {
                where: { id: userId },
            });
        });
    }
    updateImagePathNullByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            user_1.default.update({ imagePath: null }, {
                where: { id: userId },
            });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            user_1.default.destroy({ where: { id: userId } });
        });
    }
    createGoogleUser(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findOrCreate({
                where: {
                    email: userInfo.data.email,
                },
                defaults: {
                    nickname: userInfo.data.email.split("@")[0],
                    imagePath: userInfo.data.picture,
                    password: userInfo.data.id,
                    salt: userInfo.data.id,
                    loginType: true,
                },
            });
        });
    }
    createKaKaoUser(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.default.findOrCreate({
                where: {
                    email: userInfo.data.kakao_account.email,
                },
                defaults: {
                    nickname: userInfo.data.kakao_account.email.split("@")[0],
                    email: userInfo.data.kakao_account.account_email,
                    imagePath: userInfo.data.kakao_account.profile.is_default_image
                        ? null
                        : userInfo.data.kakao_account.profile.profile_image_url,
                    password: userInfo.data.id,
                    salt: userInfo.data.id,
                    loginType: true,
                },
            });
        });
    }
};
UserData = __decorate([
    (0, inversify_1.injectable)()
], UserData);
exports.UserData = UserData;
//# sourceMappingURL=userData.js.map