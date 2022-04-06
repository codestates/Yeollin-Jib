"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaterParamPageNum = exports.validaterParamCommentId = exports.validaterParamPostId = void 0;
const express_validator_1 = require("express-validator");
const validatorError_1 = require("./validatorError");
exports.validaterParamPostId = [
    (0, express_validator_1.param)("postId")
        .trim()
        .notEmpty()
        .withMessage("postId 정보가 없습니다.")
        .isInt()
        .toInt()
        .withMessage("postId 번호를 입력해주세요."),
    validatorError_1.validateError,
];
exports.validaterParamCommentId = [
    (0, express_validator_1.param)("commentId")
        .trim()
        .notEmpty()
        .withMessage("commentId 정보가 없습니다.")
        .isInt()
        .toInt()
        .withMessage("commentId 번호를 입력해주세요."),
    validatorError_1.validateError,
];
exports.validaterParamPageNum = [
    (0, express_validator_1.param)("pageNum")
        .trim()
        .notEmpty()
        .withMessage("pageNum 정보가 없습니다.")
        .isInt()
        .toInt()
        .withMessage("pageNum 번호를 입력해주세요."),
    validatorError_1.validateError,
];
//# sourceMappingURL=validator.js.map