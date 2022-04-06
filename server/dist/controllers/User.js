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
exports.UserController = void 0;
const types_1 = require("../container/types");
const jwt = require("jsonwebtoken");
class UserController {
    constructor(myContainer, cryptoModule, fsModule, axiosModule, jwtModule) {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nickname, email, password } = req.body;
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const salt = this.crypto.randomBytes(64).toString("hex");
            const encryptedPassword = this.crypto
                .pbkdf2Sync(password, salt, 256, 64, "sha512")
                .toString("base64");
            const newUser = yield userRepository.newCreateUser(nickname, email, salt, encryptedPassword);
            const userId = newUser.id;
            res.status(201).json({
                userId,
                nickname,
                email,
                message: "회원가입이 완료되었습니다",
            });
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const findUser = yield userRepository.findUserByEmail(email);
            if (!findUser) {
                res.status(404).json({ message: "존재하지 않는 유저 입니다." });
                return;
            }
            const dbPassword = findUser.password;
            const salt = findUser.salt;
            const hashedPassword = this.crypto
                .pbkdf2Sync(password, salt, 256, 64, "sha512")
                .toString("base64");
            if (hashedPassword !== dbPassword) {
                res.status(403).json({ message: "잘못된 비밀번호입니다." });
                return;
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
                expiresIn: "30d",
            });
            res.cookie("refreshToken", refreshToken, {
                // secure: true,
                httpOnly: true,
            });
            res.status(200).json({
                accessToken,
                id: findUser.id,
                message: "로그인에 성공하였습니다.",
            });
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            if (!authorization && !req.cookies) {
                res.status(401).json({ message: `이미 로그아웃 되었습니다.` });
                return;
            }
            res.clearCookie("refreshToken");
            res.status(200).json({ message: `로그아웃 되었습니다.` });
        });
        this.checkNickname = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const nickname = String(req.query.email);
            const userRepository = this.container.get(types_1.TYPES.userDB);
            // 로그인된 아이디 정보 찾기
            const userByNick = yield userRepository.findUserByNickname(nickname);
            // nickname 중복코드
            if (userByNick) {
                res.status(200).json({ message: `닉네임이 중복됩니다.` });
                return;
            }
            res.status(200).json({ message: `사용할 수 있는 닉네임입니다.` });
        });
        this.checkEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = String(req.query.email);
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const result = yield userRepository.findUserByEmail(email);
            if (result) {
                res.status(200).json({ message: `이메일이 중복됩니다.` });
                return;
            }
            res.status(200).json({ message: `사용할 수 있는 이메일입니다.` });
        });
        this.putUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const { nickname, password, userArea } = req.body;
            const userId = Number(req.cookies.id);
            const reqImagePath = req.file;
            const findUser = yield userRepository.findUserByUserId(userId);
            if (!findUser) {
                res.status(404).json({ message: "존재하지 않는 유저 입니다." });
                return;
            }
            if (nickname) {
                userRepository.updateUserNicknameByUserId(nickname, userId);
            }
            if (password) {
                const salt = this.crypto.randomBytes(64).toString("hex");
                const newEncryptedPassword = this.crypto
                    .pbkdf2Sync(password, salt, 256, 64, "sha512")
                    .toString("base64");
                userRepository.updateUserPasswordByUserId(salt, newEncryptedPassword, userId);
            }
            if (userArea) {
                userRepository.updateUserAreaByUserId(userArea, userId);
            }
            if (reqImagePath) {
                if (findUser.imagePath) {
                    this.fs.unlink(`${__dirname}/../../public/uploads/${findUser.imagePath}`, (err) => {
                        if (err) {
                            console.log("err: 기존파일삭제가 되지 않았습니다", err.message);
                        }
                    });
                }
                userRepository.updateUserPhotoByUserId(reqImagePath.filename, userId);
            }
            res.status(200).json({ message: "정보 수정이 완료되었습니다" });
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const commentRepository = this.container.get(types_1.TYPES.commentDB);
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const storageRepository = this.container.get(types_1.TYPES.storageDB);
            const userId = Number(req.cookies.id);
            const findUser = userRepository.findUserByUserId(userId);
            if (!findUser) {
                res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
                return;
            }
            const userInfo = yield userRepository.findAllUserById(userId);
            const { id, email, nickname, userArea, imagePath, loginType } = userInfo[0].dataValues;
            const data = { id, email, nickname, userArea, imagePath, loginType };
            const allComment = yield commentRepository.findAllOnlyCommentIdByUserId(userId);
            const allPost = yield postRepository.findAllOnlyPostIdByUserId(userId);
            const allStorage = yield storageRepository.findAllOnlyStorageIdByUserId(userId);
            res.status(200).json({
                data,
                myComment: allComment.length,
                myPost: allPost.length,
                myStorage: allStorage.length,
            });
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const postRepository = this.container.get(types_1.TYPES.postDB);
            const userId = req.cookies.id;
            const deleteFindAllImagePath = yield postRepository.findAllOnlyPostImagePathByUserId(userId);
            deleteFindAllImagePath.map((oneOfPost) => {
                let imagePath = oneOfPost.imagePath;
                if (imagePath) {
                    const arrayImagePath = imagePath.split(",");
                    arrayImagePath.map((value) => {
                        if (this.fs.existsSync(value)) {
                            this.fs.unlinkSync(value); // unlinkSync 파일 삭제
                        }
                    });
                }
            });
            // 프로필 사진은 삭제되지않아 deletePhoto 사용 또는 클래스 상속 필요
            yield userRepository.deleteUser(userId);
            res
                .status(200)
                .cookie("refreshToken", "")
                .setHeader("authorization", "")
                .json({ message: "회원탈퇴가 완료 되었습니다." });
        });
        this.deletePhoto = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const userId = Number(req.cookies.id);
            const findUser = yield userRepository.findUserByUserId(userId);
            if (findUser) {
                if (findUser.imagePath === null) {
                    res
                        .status(200)
                        .json({ message: "이미 삭제 되었거나 존재하지않는 이미지 입니다." });
                    return;
                }
                else {
                    this.fs.unlink(
                    // 기존 파일 삭제
                    `${__dirname}/../../public/uploads/${findUser.imagePath}`, (err) => {
                        if (err) {
                            console.log("err: 기존파일삭제가 되지 않았습니다", err.message);
                        }
                    });
                }
                yield userRepository.updateImagePathNullByUserId(userId);
                res.status(200).json({ message: "사진 삭제가 완료되었습니다." });
            }
        });
        this.googleLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // 로그인 - OAuth 방식: google
            res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.CLIENT_REDIRECT_URL}&client_id=${process.env.GOOGLE_CLIENT_ID}`);
        });
        this.googleCallback = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const code = req.query.code;
            // 구글 자체 로그인
            const result = yield this.axios.default.post(`https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.CLIENT_REDIRECT_URL}&grant_type=authorization_code`);
            const GoogleAccessToken = result.data.access_token;
            const GoogleRefreshToken = result.data.refresh_token;
            // 구글 로그인한 회원 정보 받기
            const userInfo = yield this.axios.default.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${GoogleAccessToken}`, {
                headers: {
                    Authorization: `Bearer ${GoogleAccessToken}`,
                },
            });
            // 구글 로그인한 회원 정보 중 email이 데이터베이스에 존재하는지 검사 후 없으면 새로 저장
            const [findUser, exist] = yield userRepository.createGoogleUser(userInfo);
            const payload = {
                id: findUser.id,
                email: findUser.email,
                nickname: findUser.nickname,
                userArea: findUser.userArea,
                imagePath: findUser.imagePath,
                loginType: true,
            };
            const accessToken = yield jwt.sign(payload, process.env.ACCESS_SECRET, {
                expiresIn: "12h",
            });
            const refreshToken = yield jwt.sign(payload, process.env.REFRESH_SECRET, {
                expiresIn: "50d",
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "none",
            });
            const realQuery = encodeURIComponent(accessToken);
            // redirect를 이용해 쿼리로 accessToken을 전달 (ORIGIN : 클라이언트 url)
            res.redirect(`${process.env.ORIGIN}/login?access_token=${realQuery}`);
        });
        this.kakaoLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // 로그인 버튼
            res.redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&&response_type=code`);
        });
        this.kakaoCallback = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.container.get(types_1.TYPES.userDB);
            const code = req.query.code;
            // 카카오 로그인
            const result = yield this.axios.default.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`);
            const KaKaoAccessToken = result.data.access_token;
            // 카카오 로그인한 유저 정보 받기
            const userInfo = yield this.axios.default.get(`https://kapi.kakao.com/v2/user/me`, {
                headers: {
                    Authorization: `Bearer ${KaKaoAccessToken}`,
                },
            });
            // 카카오에서 유저 데이터를 받아와 email이 데이터베이스에 존재하는지 검사 후 없으면 새로 저장
            const [findUser, exist] = yield userRepository.createKaKaoUser(userInfo);
            const payload = {
                id: findUser.id,
                email: findUser.email,
                nickname: findUser.nickname,
                userArea: findUser.userArea,
                imagePath: findUser.imagePath,
                loginType: true,
            };
            const accessToken = yield jwt.sign(payload, process.env.ACCESS_SECRET, {
                expiresIn: "12h",
            });
            const refreshToken = yield jwt.sign(payload, process.env.REFRESH_SECRET, {
                expiresIn: "50d",
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "none",
            });
            const realQuery = encodeURIComponent(accessToken);
            // redirect를 이용해 쿼리로 accessToken을 전달 (ORIGIN : 클라이언트 url)
            res.redirect(`${process.env.ORIGIN}/login?access_token=${realQuery}`);
        });
        this.container = myContainer;
        this.crypto = cryptoModule;
        this.fs = fsModule;
        this.axios = axiosModule;
        this.jwt = jwtModule;
    }
}
exports.UserController = UserController;
//# sourceMappingURL=User.js.map