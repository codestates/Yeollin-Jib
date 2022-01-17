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
const user_1 = __importDefault(require("../models/user"));
const refreshToken_1 = __importDefault(require("./refreshToken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jwt = require("jsonwebtoken");
const accessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    console.log("token===============", req.headers);
    if (!authHeader) {
        return res
            .status(400)
            .json({ data: null, message: "access token 존재하지 않습니다." });
    }
    let token = authHeader.split(" ")[1];
    yield jwt.verify(token, process.env.ACCESS_SECRET, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            token = yield (0, refreshToken_1.default)(req, res, next);
        }
        const Info = yield user_1.default.findOne({
            where: { id: decode.id },
        });
        if (!Info) {
            return res.status(401).json({
                message: "access token 일치하는 유저가 없습니다.",
            });
        }
        req.cookies.id = Info.id;
        next();
    }));
});
exports.default = accessToken;
//# sourceMappingURL=accessToken.js.map