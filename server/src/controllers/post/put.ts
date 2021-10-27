import { Request, Response } from "express";
import post from "../../models/post";
import * as fs from "fs";

const put = async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id; //유저아이디
    const post_id = req.params.id;
    console.log("----------", id);
    //이미지 경로 추출 (,)
    const image: any = req.files;
    const images = image.map((value: any) => {
      return String(value.path);
    });
    const imageJoin = images.join(",");

    const { title, contents, imagePath, imageDelete, address, dueDate, latitude, longitude } = req.body;

    if (title) {
      await post.update({ title: title }, { where: { id: post_id, userId: id } });
    }
    if (contents) {
      await post.update({ contents: contents }, { where: { id: post_id, userId: id } });
    }
    if (address) {
      await post.update({ address: address }, { where: { id: post_id, userId: id } });
    }
    if (dueDate) {
      await post.update({ dueDate: dueDate }, { where: { id: post_id, userId: id } });
    }
    if (latitude && longitude) {
      await post.update({ atitude: latitude, longitude: longitude }, { where: { id: post_id, userId: id } });
    }

    if (imageJoin) {
      if (imagePath) {
        const newImagePath = imagePath + "," + imageJoin;
        await post.update({ imagePath: newImagePath }, { where: { id: post_id, userId: id } });
      }
      await post.update({ imagePath: imageJoin }, { where: { id: post_id, userId: id } });
    }

    if (imageDelete) {
      const array = imageDelete.split(",");
      array.map((value: string) => {
        if (fs.existsSync(value)) {
          fs.unlinkSync(value); // unlinkSync 파일 삭제
        } else {
          return res.status(409).json({ massage: "삭제 되었거나, 존재하지 않는 파일입니다." });
        }
      });
    }

    res.status(200).json({ message: "정보 수정이 완료되었습니다" });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default put;
