import { Request, Response } from "express";
import post from "../../models/post";
import category from "../../models/category";
import post_category from "../../models/post_category";

const post_user = async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id;
    console.log("----------", id);
    const image: any = req.files;
    const images = image.map((value: any) => {
      return String(value.path);
    });

    const imagePath = images.join(",");

    const {
      title,
      contents,
      address,
      dueDate,
      latitude,
      longitude,
      category1,
      category2,
    } = req.body;

    if (!title) return res.status(400).send({ message: "제목이 없습니다." });
    if (!contents) return res.status(400).send({ message: "내용이 없습니다." });
    if (!address) return res.status(400).send({ message: "주소가 없습니다." });
    if (!dueDate)
      return res.status(400).send({ message: "만료기한이 없습니다." });
    if (!longitude || !latitude)
      return res.status(400).send({ message: "좌표가 없습니다." });
    if (!category1 || !category2)
      return res.status(400).send({ message: "선택한 카테고리가 없습니다." });

    const postCreate = await post.create({
      userId: id,
      title: title,
      contents: contents,
      imagePath: imagePath,
      address: address,
      dueDate: dueDate,
      latitude: latitude,
      longitude: longitude,
    });

    const postId = postCreate.id;
    const gory1 = category1.split(",");
    const gory2 = category2.split(",");

    for (let i = 0; i < gory1.length; i++) {
      const find = await category.findOne({
        where: { category1: gory1[i], category2: gory2[i] },
      });
      console.log("----------", find);
      await post_category.create({ postId: postId, categoryId: find!.id });
    }

    if (!postCreate)
      res.status(400).send({ message: "게시글이 생성되지 않았습니다." });

    res
      .status(201)
      .json({ postId: postId, message: "게시글이 생성되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};
export default post_user;
