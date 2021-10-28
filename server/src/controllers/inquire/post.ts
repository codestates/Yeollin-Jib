import { Request, Response } from "express";
const { inquire } = require("../../models");

const post = async (req: Request, res: Response) => {
  console.log("hihiihi");
  const { email, title, contents } = req.body;
  try {
    await inquire
      .create({
        email: email,
        title: title,
        contents: contents,
      })
      .then((data: any) => {
        res.status(200).json({
          data,
          message: "문의 작성이 성공적으로 완료되었습니다.",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};

export default post;
