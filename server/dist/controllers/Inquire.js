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
exports.InquireController = void 0;
class InquireController {
    constructor(nodemailer, mailGun) {
        this.sendInquire = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, title, contents } = req.body;
            const auth = {
                auth: {
                    api_key: `${process.env.MAILGUN_API_KEY}`,
                    domain: `${process.env.MAILGUN_DOMAIN}`,
                },
            };
            const transporter = this.nodemailer.createTransport(this.mailGun(auth));
            const mailOptions = {
                from: email,
                to: "yeollinjib@gmail.com",
                subject: `[열린집 문의하기] ${title}`,
                text: contents,
            };
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(501).json({ message: "서버에러 입니다." });
                    return;
                }
                res.status(200).json({
                    data,
                    message: "문의 작성이 성공적으로 완료되었습니다.",
                });
            });
        });
        (this.nodemailer = nodemailer), (this.mailGun = mailGun);
    }
}
exports.InquireController = InquireController;
//# sourceMappingURL=Inquire.js.map