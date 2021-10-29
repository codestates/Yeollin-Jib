import { Request, Response } from "express";
import nodemailer from "nodemailer";
import mailGun from "nodemailer-mailgun-transport";

const post = async (req: Request, res: Response) => {
  const { email, title, contents } = req.body;

  const auth = {
    auth: {
      api_key: "4b58d05634031867fdd1da4c9b76e08a-20ebde82-faae9e48",
      domain: "sandbox931fd1095c56429db84ab978f7dee695.mailgun.org",
    },
  };

  const transporter = nodemailer.createTransport(mailGun(auth));

  const mailOptions = {
    from: email,
    to: "yeollinjib@gmail.com",
    subject: `[열린집 문의하기]: ${title}`,
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

export default post;
