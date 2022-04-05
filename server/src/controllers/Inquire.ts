import { Request, Response } from "express";

export class InquireController {
  nodemailer: typeof import("nodemailer");
  mailGun: typeof import("nodemailer-mailgun-transport");
  constructor(
    nodemailer: typeof import("nodemailer"),
    mailGun: typeof import("nodemailer-mailgun-transport"),
  ) {
    (this.nodemailer = nodemailer), (this.mailGun = mailGun);
  }

  sendInquire = async (req: Request, res: Response): Promise<void> => {
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
  };
}
