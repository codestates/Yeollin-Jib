import { Request, Response } from "express";
import post from "../../models/post";
import post_category from "../../models/post_category";
import category from "../../models/category";
import * as fs from "fs";

const patch = async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id; //유저아이디
    const postId = req.params.id;

    const image: any = req.files; //이미지 경로 추출 (,)
    const images = image.map((value: any) => {
      return String(value.path);
    });
    const imageJoin = images.join(",");

    const {
      title,
      contents,
      imagePath,
      imageDelete,
      address,
      dueDate,
      latitude,
      longitude,
      category1,
      category2,
    } = req.body;

    if (title) {
      await post.update(
        { title: title },
        { where: { id: postId, userId: id } },
      );
    }
    if (contents) {
      await post.update(
        { contents: contents },
        { where: { id: postId, userId: id } },
      );
    }
    if (address) {
      await post.update(
        { address: address },
        { where: { id: postId, userId: id } },
      );
    }
    if (dueDate) {
      await post.update(
        { dueDate: dueDate },
        { where: { id: postId, userId: id } },
      );
    }
    if (latitude && longitude) {
      await post.update(
        { atitude: latitude, longitude: longitude },
        { where: { id: postId, userId: id } },
      );
    }

    // image add
    if (imageJoin) {
      if (imagePath) {
        const newImagePath = imagePath + "," + imageJoin;
        await post.update(
          { imagePath: newImagePath },
          { where: { id: postId, userId: id } },
        );
      }
      await post.update(
        { imagePath: imageJoin },
        { where: { id: postId, userId: id } },
      );
    }

    // image delete
    if (imageDelete) {
      const array = imageDelete.split(",");
      array.map((value: string) => {
        if (fs.existsSync(value)) {
          fs.unlinkSync(value); // unlinkSync 파일 삭제
        } else {
          return res.status(409).json({
            massage: "삭제 되었거나, 존재하지 않는 이미지 파일입니다.",
          });
        }
      });
    }

    // category
    if (category1 && category2) {
      await post_category.destroy({
        where: { postId: postId },
      });

      const gory1 = category1.split(",");
      const gory2 = category2.split(",");

      for (let i = 0; i < gory1.length; i++) {
        const find = await category.findOne({
          where: { category1: gory1[i], category2: gory2[i] },
        });
        await post_category.create({ postId: postId, categoryId: find!.id });
      }
    }

    res.status(200).json({ message: "정보 수정이 완료되었습니다" });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default patch;
