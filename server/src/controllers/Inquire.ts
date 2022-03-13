import { Request, Response } from "express";
import nodemailer from "nodemailer";
import mailGun from "nodemailer-mailgun-transport";

class Inquire {
  constructor() {}

  post = async (req: Request, res: Response) => {
    const { email, title, contents } = req.body;

    const auth = {
      auth: {
        api_key: `${process.env.MAILGUN_API_KEY}`,
        domain: `${process.env.MAILGUN_DOMAIN}`,
      },
    };

    const transporter = nodemailer.createTransport(mailGun(auth));

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
  };
}
