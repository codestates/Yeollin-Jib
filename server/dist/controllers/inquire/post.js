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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_mailgun_transport_1 = __importDefault(require("nodemailer-mailgun-transport"));
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, title, contents } = req.body;
    const auth = {
        auth: {
            api_key: `${process.env.MAILGUN_API_KEY}`,
            domain: `${process.env.MAILGUN_DOMAIN}`,
        },
    };
    const transporter = nodemailer_1.default.createTransport((0, nodemailer_mailgun_transport_1.default)(auth));
    const mailOptions = {
        from: email,
        to: "yeollinjib@gmail.com",
        subject: `[열린집 문의하기] ${title}`,
        text: contents,
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(501).json({ message: "서버에러 입니다." });
        }
        res.status(200).json({
            data,
            message: "문의 작성이 성공적으로 완료되었습니다.",
        });
    });
});
exports.default = post;
//# sourceMappingURL=post.js.map