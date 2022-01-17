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
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path = __importStar(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
});
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, "public/uploads/");
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext) + "(" + Date.now() + ")" + ext;
            cb(null, name);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
// export const upload = multer({
//   storage: multerS3({
//     //multerS3 설정 항목
//     s3: s3,
//     bucket: "yeollin", //bucket 이름
//     contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
//     acl: "public-read-write", //읽고 쓰기 모두 허용
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString() + file.originalname.split(".").pop());
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });
//# sourceMappingURL=multer.js.map