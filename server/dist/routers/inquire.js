"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validatorError_1 = require("../middleware/validatorError");
const router = express_1.default.Router();
function inquireRouter(InquireController) {
    router.post("/", [
        (0, express_validator_1.body)("email").isEmail().withMessage("이메일을 입력해주세요"),
        (0, express_validator_1.body)("title").notEmpty().withMessage("제목을 입력해 주세요"),
        (0, express_validator_1.body)("contents").notEmpty().withMessage("문의 내용을 입력해 주세요"),
        validatorError_1.validateError,
    ], InquireController.sendInquire);
    return router;
}
exports.default = inquireRouter;
//# sourceMappingURL=inquire.js.map