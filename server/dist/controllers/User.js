"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const crypto = __importStar(require("crypto"));
const user_1 = __importDefault(require("../models/user"));
const comment_1 = __importDefault(require("../models/comment"));
const storage_1 = __importDefault(require("../models/storage"));
const post_1 = __importDefault(require("../models/post"));
const post_category_1 = __importDefault(require("../models/post_category"));
const jwt = require("jsonwebtoken");
const fs = __importStar(require("fs"));
class User {
    constructor() {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { nickname, email, password } = req.body;
                if (!nickname || !email || !password) {
                    return res.status(400).json({
                        message: `필수 항목이 모두 채워지지 않았습니다. 다시 한번 확인해주세요.`,
                    });
                }
                const salt = crypto.randomBytes(64).toString("hex");
                const encryptedPassword = crypto
                    .pbkdf2Sync(password, salt, 256, 64, "sha512")
                    .toString("base64");
                // user 생성
                const newUser = yield user_1.default.create({
                    // 일반 회원가입 시 - 로그인 타입 false, 소셜 로그인 시 - true
                    loginType: false,
                    nickname,
                    email,
                    salt,
                    password: encryptedPassword,
                });
                const userId = newUser.id;
                return res.status(201).json({
                    userId,
                    nickname,
                    email,
                    message: "회원가입이 완료되었습니다",
                });
            }
            catch (err) {
                console.log(err);
                return res.status(501).json({ message: "서버 에러 입니다." });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // 이메일, 비밀번호 중 하나라도 입력하지 않았을 경우
                if (!email || !password) {
                    return res.status(417).json({
                        message: `필수 항목이 모두 채워지지않았습니다. 다시 한번 확인해주세요.`,
                    });
                }
                const findUser = yield user_1.default.findOne({
                    where: { email: email },
                });
                // 이메일이 없을 때
                if (!findUser) {
                    return res.status(404).json({ message: `회원을 찾을수 없습니다.` });
                }
                const dbPassword = findUser.password;
                const salt = findUser.salt;
                const hashedPassword = crypto
                    .pbkdf2Sync(password, salt, 256, 64, "sha512")
                    .toString("base64");
                if (hashedPassword !== dbPassword) {
                    return res.status(403).json({ message: "잘못된 비밀번호입니다." });
                }
                const payload = {
                    id: findUser.id,
                    email: findUser.email,
                    createdAt: findUser.createdAt,
                    updatedAt: findUser.updatedAt,
                };
                const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
                    expiresIn: "12h",
                });
                const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
                    expiresIn: "50d",
                });
                return res
                    .status(200)
                    .json({
                    accessToken,
                    id: findUser.id,
                    message: "로그인에 성공하였습니다.",
                })
                    .cookie("refreshToken", refreshToken, {
                    // secure: true,
                    httpOnly: true,
                });
            }
            catch (err) {
                return res.status(501).json({ message: "서버에러 입니다." });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
                if (!authorization && !req.cookies) {
                    return res.status(401).json({ message: `이미 로그아웃 되었습니다.` });
                }
                res.clearCookie("refreshToken");
                return res.status(200).json({ message: `로그아웃 되었습니다.` });
            }
            catch (err) {
                console.log(err);
                return res.status(501).json({ message: "서버에러 입니다." });
            }
        });
        this.nick_name = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const nickname = req.query;
                // 로그인된 아이디 정보 찾기
                const userByNick = yield user_1.default.findOne({
                    where: {
                        nickname: nickname,
                        //   || nickname!.toUpperCase()
                    },
                });
                // nickname 중복코드
                if (userByNick) {
                    return res.status(200).json({ message: `닉네임이 중복됩니다.` });
                }
                return res.status(200).json({ message: `사용할 수 있는 닉네임입니다.` });
            }
            catch (err) {
                console.log(err);
                return res.status(501).json({ message: "서버에러 입니다." });
            }
        });
        this.email = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.query;
                // 로그인된 아이디 정보 찾기
                const result = yield user_1.default.findOne({ where: { email: email } });
                // email 중복코드
                if (result) {
                    return res.status(200).json({ message: `이메일이 중복됩니다.` });
                }
                return res.status(200).json({ message: `사용할 수 있는 이메일입니다.` });
            }
            catch (err) {
                console.log(err);
                return res.status(501).json({ message: "서버에러 입니다." });
            }
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.cookies.id;
            try {
                const header = req.headers;
                if (!header) {
                    return res.status(403).json({ message: "잘못된 요청입니다." });
                }
                else {
                    const { nickname, password, userArea, imagePath } = req.body;
                    const imagePathReq = req.file;
                    const findUser = yield user_1.default.findOne({
                        where: { id: userId },
                    });
                    console.log("req.file", req.file);
                    if (findUser) {
                        // 닉네임 변경
                        if (nickname) {
                            yield user_1.default.update({
                                nickname: nickname,
                            }, { where: { id: userId } });
                        }
                        // 비밀번호 변경
                        if (password) {
                            const salt = crypto.randomBytes(64).toString("hex");
                            const newEncryptedPassword = crypto
                                .pbkdf2Sync(password, salt, 256, 64, "sha512")
                                .toString("base64");
                            yield user_1.default.update({
                                salt: salt,
                                password: newEncryptedPassword,
                            }, { where: { id: userId } });
                        }
                        // 우리 동네 위치 정보 수정
                        if (userArea) {
                            yield user_1.default.update({
                                userArea: userArea,
                            }, { where: { id: userId } });
                        }
                        // 프로필 사진 수정
                        if (imagePathReq) {
                            // 기존 파일 삭제
                            fs.unlink(`${__dirname}/../../../public/uploads/${findUser.imagePath}`, (err) => {
                                if (err) {
                                    console.log("기존 파일 삭제 에러 입니다.", err.message);
                                }
                            });
                            // 새 파일 업로드
                            yield user_1.default.update({ imagePath: `${imagePathReq.filename}` }, {
                                where: { id: userId },
                            });
                        }
                    }
                    return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(501).json({ message: "서버에러 입니다." });
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.cookies.id;
            try {
                const commentUser = yield comment_1.default.findAll({
                    where: { userId },
                    attributes: ["id"],
                });
                const postUser = yield post_1.default.findAll({
                    where: { userId },
                    attributes: ["id"],
                });
                const storageUser = yield storage_1.default.findAll({
                    where: { userId },
                    attributes: ["id"],
                });
                const findUser = yield user_1.default.findOne({
                    where: { id: userId },
                });
                if (!findUser) {
                    return res
                        .status(404)
                        .json({ message: "해당 유저를 찾을 수 없습니다." });
                }
                const userInfo = yield user_1.default.findAll({
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
                const { id, email, nickname, userArea, imagePath, loginType } = userInfo[0].dataValues;
                const data = { id, email, nickname, userArea, imagePath, loginType };
                res.status(200).json({
                    data,
                    myComment: commentUser.length,
                    myPost: postUser.length,
                    myStorage: storageUser.length,
                });
            }
            catch (err) {
                console.log(err);
                return res.status(501).json({ message: "서버 에러 입니다." });
            }
        });
        this.delete_ = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const header = req.headers;
                if (!header) {
                    return res.status(403).json({ message: "잘못된 요청입니다." });
                }
                else {
                    const userId = req.cookies.id;
                    const findPostId = yield post_1.default.findAll({
                        where: { userId },
                        attributes: ["id"],
                    });
                    // 내가 쓴 게시글의 id를 받아서 하나씩 다 지워주기
                    let postId;
                    if (findPostId) {
                        for (let i = 0; i < findPostId.length; i++) {
                            postId = findPostId[i].dataValues.id;
                            yield comment_1.default.destroy({ where: { postId } });
                            yield storage_1.default.destroy({ where: { postId } });
                            yield post_category_1.default.destroy({ where: { postId } });
                        }
                    }
                    yield user_1.default.destroy({ where: { id: userId } });
                    yield comment_1.default.destroy({ where: { userId } });
                    yield storage_1.default.destroy({ where: { userId } });
                    yield post_1.default.destroy({
                        where: {
                            userId,
                        },
                    });
                    return res
                        .status(200)
                        .cookie("refreshToken", "")
                        .setHeader("authorization", "")
                        .json({ message: "회원탈퇴가 완료 되었습니다." });
                }
            }
            catch (err) {
                console.log(err);
                return res.status(501).json({ message: "서버에러 입니다." });
            }
        });
    }
}
//# sourceMappingURL=User.js.map