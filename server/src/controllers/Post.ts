import { Request, Response } from "express";

import user from "../models/user";
import post from "../models/post";
import comment from "../models/comment";
import storage from "../models/storage";
import category from "../models/category";
import post_category from "../models/post_category";

import * as fs from "fs";
import Sequelize from "sequelize";
const { or, and, gt, lt, like, overlap } = Sequelize.Op;

class Post {
  constructor() {}

  post_user = async (req: Request, res: Response) => {
    try {
      const id = req.cookies.id;
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
      if (!contents)
        return res.status(400).send({ message: "내용이 없습니다." });
      if (!address)
        return res.status(400).send({ message: "주소가 없습니다." });
      if (!dueDate) {
        return res.status(400).send({ message: "만료기한이 없습니다." });
      }
      if (!longitude || !latitude) {
        return res.status(400).send({ message: "좌표가 없습니다." });
      }
      if (!category1 || !category2) {
        return res.status(400).send({ message: "선택한 카테고리가 없습니다." });
      }
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
        return res
          .status(400)
          .send({ message: "게시글이 생성되지 않았습니다." });

      return res
        .status(201)
        .json({ postId: postId, message: "게시글이 생성되었습니다." });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };

  delete_ = async (req: Request, res: Response) => {
    try {
      const id = req.cookies.id; //유저 아이디
      const postId = req.params.id; //게시물 아이디

      const postDelete = await post.destroy({ where: { id: postId } });
      await comment.destroy({ where: { postId } });
      await storage.destroy({ where: { postId } });
      await post_category.destroy({ where: { postId } });
      if (!postDelete)
        return res
          .status(404)
          .json({ message: "삭제하려는 게시물이 없습니다." });

      res.status(201).json({ message: "게시물이 삭제되었습니다." });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };

  patch = async (req: Request, res: Response) => {
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
        } else {
          await post.update(
            { imagePath: imageJoin },
            { where: { id: postId, userId: id } },
          );
        }
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

  patch_category = async (req: Request, res: Response) => {
    try {
      const { postId, categoryId } = req.body;

      if (!postId)
        return res.status(400).send({ message: "게시물 ID가 없습니다." });
      if (!categoryId)
        return res.status(400).send({ message: "카테고리 ID가 없습니다." });

      const gory = categoryId.split(",");
      for (let i = 0; i < gory.length; i++) {
        const find = await post_category.findOne({
          where: { postId: postId, categoryId: gory[i] },
        });

        if (find!.Boolean === true)
          await post_category.update(
            { Boolean: false },
            { where: { postId: postId, categoryId: gory[i] } },
          );
        else {
          await post_category.update(
            { Boolean: true },
            { where: { postId: postId, categoryId: gory[i] } },
          );
        }
      }

      res.status(200).send({ message: "정보 수정이 완료되었습니다" });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      //게시물 아이디
      const post_id = req.params.id;

      const postLike = await storage.findAll({
        where: { postId: post_id },
      });

      const postGet = await post.findOne({
        where: { id: post_id },
        include: [
          {
            model: user,
            attributes: ["nickname", "email", "imagePath"],
          },
          {
            model: post_category,
            required: false,
            attributes: ["categoryId", "Boolean"],
          },
          {
            model: storage,
            attributes: ["userId"],
          },
        ],
      });

      if (!postGet)
        return res
          .status(404)
          .json({ message: "이미 삭제된 게시글이거나 없는 게시글 입니다." });

      res.status(200).json({ postLike: postLike.length, postGet: postGet });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };

  get_user_infinite = async (req: Request, res: Response) => {
    try {
      const id = req.cookies.id; //유저아이디
      const pageNum: any = req.params; // page Number

      let offset = 0;
      if (pageNum > 1) {
        offset = 8 * (pageNum - 1);
      }

      const postGet = await post.findAndCountAll({
        attributes: [
          "id",
          "userId",
          "title",
          "address",
          "dueDate",
          "imagePath",
        ],
        order: [["id", "DESC"]],
        //   limit: 8,
        //   offset: offset,
        distinct: true, //Don't count include
        where: { userId: id },
        include: [
          {
            model: user,
            attributes: ["nickname", "imagePath"],
          },
          {
            model: storage,
            attributes: ["userId"],
          },
          {
            model: post_category,
            attributes: ["categoryId"],
          },
        ],
      });

      if (postGet.rows.length === 0) {
        return res
          .status(200)
          .send({ message: "더이상 조회할 게시물이 없습니다." });
      }

      res.status(200).send({ postGet });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };

  get_search = async (req: Request, res: Response) => {
    try {
      const pageNum: any = req.query.page; // page Number
      const code = req.query.code;
      const search = req.query.search;

      let offset = 0;
      if (pageNum > 1) {
        offset = 8 * (pageNum - 1);
      }

      // 제목 검색
      if (code === "title") {
        const postGet = await post.findAndCountAll({
          attributes: [
            "id",
            "userId",
            "title",
            "address",
            "dueDate",
            "imagePath",
          ],
          order: [["id", "DESC"]],
          limit: 8,
          offset: offset,
          distinct: true, //Don't count include
          where: {
            title: {
              [like]: "%" + search + "%",
            },
          },
          include: [
            {
              model: user,
              attributes: ["nickname", "imagePath"],
            },
            {
              model: storage,
              attributes: ["userId"],
            },
            {
              model: post_category,
              attributes: ["categoryId"],
            },
          ],
        });

        if (postGet.rows.length === 0) {
          return res
            .status(200)
            .send({ message: "더이상 조회할 게시물이 없습니다." });
        }
        return res.status(200).send({ postGet });
      }

      // 주소 검색
      if (code === "address") {
        const postGet = await post.findAndCountAll({
          order: [["id", "DESC"]],
          limit: 8,
          offset: offset,
          distinct: true, //Don't count include
          where: {
            address: {
              [like]: "%" + search + "%",
            },
          },
          include: [
            {
              model: user,
              attributes: ["nickname", "imagePath"],
            },
            {
              model: storage,
              attributes: ["userId"],
            },
            {
              model: post_category,
              attributes: ["categoryId"],
            },
          ],
        });
        if (postGet.rows.length === 0) {
          return res
            .status(200)
            .send({ message: "더이상 조회할 게시물이 없습니다." });
        }
        return res.status(200).send({ postGet });
      }
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };

  get_infinite = async (req: Request, res: Response) => {
    try {
      const pageNum: any = req.params.id; // page Number

      // offset 설정
      let offset = 0;
      if (pageNum > 1) {
        offset = 8 * (pageNum - 1);
      }

      const postGet = await post.findAndCountAll({
        attributes: [
          "id",
          "userId",
          "title",
          "address",
          "dueDate",
          "imagePath",
        ],
        order: [["id", "DESC"]],
        limit: 8,
        offset: offset,
        distinct: true, //Don't count include
        include: [
          {
            model: user,
            attributes: ["nickname", "imagePath"],
          },
          {
            model: storage,
            attributes: ["userId"],
          },
          {
            model: post_category,
            attributes: ["categoryId"],
          },
        ],
      });

      if (postGet.rows.length === 0) {
        return res
          .status(200)
          .send({ message: "더이상 조회할 게시물이 없습니다." });
      }

      return res.status(200).send({ postGet });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };

  get_category_infinite = async (req: Request, res: Response) => {
    try {
      const pageNum: any = req.query.page; // page Number
      const categoryNumber = req.query.code;
      let categoryNumbers = [];

      // 무한스크롤 offset 설정
      let offset = 0;
      if (pageNum > 1) {
        offset = 8 * (pageNum - 1);
      }

      // 대분류 해당 코드 categoryNumbers 배열에 나눔
      const categoryGet = await category.findAll({
        // where: { category1: categoryNumber },
      });
      for (let i = 0; i < categoryGet.length; i++) {
        categoryNumbers.push(categoryGet[i].id);
      }

      // 카테고리 대분류
      const postGet = await post.findAndCountAll({
        attributes: [
          "id",
          "userId",
          "title",
          "address",
          "dueDate",
          "imagePath",
        ],
        order: [["id", "DESC"]],
        limit: 8,
        offset: offset,
        distinct: true, //Don't count include
        include: [
          {
            model: post_category,
            attributes: ["postId", "categoryId", "Boolean"],
            where: { categoryId: { [or]: categoryNumbers } },
          },
          {
            model: user,
            attributes: ["nickname", "imagePath"],
          },
          {
            model: storage,
            attributes: ["userId"],
          },
        ],
      });

      if (postGet.rows.length === 0) {
        return res
          .status(200)
          .send({ message: "더이상 조회할 게시물이 없습니다." });
      }
      res.status(200).send({ postGet });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };
}
