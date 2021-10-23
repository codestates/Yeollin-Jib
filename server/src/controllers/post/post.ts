import { Request, Response } from "express";
import post from "../../models/post";

const ost = async (req: Request, res: Response) => {
  try {
    // 유저아이디 받아와야함
    const title = req.body.title;
    const contents = req.body.contents;
    const address = req.body.address;
    const dueDate = req.body.dueDate;
    const latitude = req.body.latitude;
    const longtitude = req.body.longtitude;

    if (!title) return res.status(400).send({ message: "제목이 없습니다." });
    if (!contents) return res.status(400).send({ message: "내용이 없습니다." });
    if (!address) return res.status(400).send({ message: "주소가 없습니다." });
    if (!dueDate) return res.status(400).send({ message: "만료기한이 없습니다." });
    if (!longtitude || !latitude) return res.status(400).send({ message: "좌표가 없습니다." });

    const where = await post.create({
      title: title,
      contents: contents,
      address: address,
      dueDate: dueDate,
      latitude: latitude,
      longtitude: longtitude,
    });

    if (where) return res.status(201).send({ message: "게시글이 생성되었습니다." });
  } catch (err) {
    console.log("err");
  }
};
export default post;
