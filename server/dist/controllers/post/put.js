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
const post_1 = __importDefault(require("../../models/post"));
const fs = __importStar(require("fs"));
const put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.cookies.id; //유저아이디
        const post_id = req.params.id;
        console.log("----------", id);
        //이미지 경로 추출 (,)
        const image = req.files;
        const images = image.map((value) => {
            return String(value.path);
        });
        const imageJoin = images.join(",");
        const { title, contents, imagePath, imageDelete, address, dueDate, latitude, longitude } = req.body;
        if (title) {
            yield post_1.default.update({ title: title }, { where: { id: post_id, userId: id } });
        }
        if (contents) {
            yield post_1.default.update({ contents: contents }, { where: { id: post_id, userId: id } });
        }
        if (address) {
            yield post_1.default.update({ address: address }, { where: { id: post_id, userId: id } });
        }
        if (dueDate) {
            yield post_1.default.update({ dueDate: dueDate }, { where: { id: post_id, userId: id } });
        }
        if (latitude && longitude) {
            yield post_1.default.update({ atitude: latitude, longitude: longitude }, { where: { id: post_id, userId: id } });
        }
        if (imageJoin) {
            if (imagePath) {
                const newImagePath = imagePath + "," + imageJoin;
                yield post_1.default.update({ imagePath: newImagePath }, { where: { id: post_id, userId: id } });
            }
            yield post_1.default.update({ imagePath: imageJoin }, { where: { id: post_id, userId: id } });
        }
        if (imageDelete) {
            const array = imageDelete.split(",");
            array.map((value) => {
                if (fs.existsSync(value)) {
                    fs.unlinkSync(value); // unlinkSync 파일 삭제
                }
                else {
                    return res.status(409).json({ massage: "삭제 되었거나, 존재하지 않는 파일입니다." });
                }
            });
        }
        res.status(200).json({ message: "정보 수정이 완료되었습니다" });
    }
    catch (err) {
        console.log(err);
        return res.status(501).json({ message: "서버 에러 입니다." });
    }
});
exports.default = put;
//# sourceMappingURL=put.js.map