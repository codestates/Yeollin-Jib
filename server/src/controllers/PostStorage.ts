import { Request, Response } from "express";
import user from "../models/user";
import storage from "../models/storage";
import post from "../models/post";
import post_category from "../models/post_category";

import { TYPES } from "../container/types";
import { Container } from "inversify";
import { PostData } from "../data/postData";
import { PostCategoryData } from "../data/postCategoryData";
import { CategoryData } from "../data/categoryData";
import { StorageData } from "../data/storageData";

export class PostStorageController {
  container: Container;

  constructor(myContainer: Container) {
    this.container = myContainer;
  }

  getStroage = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const userId = req.cookies.id;

    const postData = await postRepository.findAllPostStorageByUserId(userId);

    if (postData.rows.length === 0) {
      return res
        .status(404)
        .send({ message: "더이상 조회할 게시물이 없습니다." });
    }

    res.status(200).send({ postGet: postData });
  };

  postStorage = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const storageRepository = this.container.get<StorageData>(TYPES.storageDB);
    const userId: number = Number(req.cookies.id);
    const postId: number = Number(req.params.postId);

    const postData = await postRepository.findPostByPostId(postId);
    if (!postData) {
      return res.status(403).send({ message: "게시글이 존재하지 않습니다." });
    }

    const [createStorage, exist] = await storageRepository.createOrFindStroage(
      postId,
      userId,
    );

    if (!exist) {
      return res.status(200).send({ message: "이미 찜하기 등록 되었습니다." });
    }
    return res
      .status(201)
      .send({ message: "게시물 찜하기가 성공적으로 등록 되었습니다." });
  };

  deleteStorage = async (req: Request, res: Response) => {
    const storageRepository = this.container.get<StorageData>(TYPES.storageDB);
    const userId: number = Number(req.cookies.id);
    const postId: number = Number(req.params.postId);

    if (!(await storageRepository.findStorageByPostAndUserId(postId, userId))) {
      return res.status(404).json({ message: "이미 찜하기가 삭제되었습니다." });
    }

    storageRepository.deleteStorageByPostAndUserId(postId, userId);

    return res
      .status(200)
      .json({ message: "게시물 찜하기가 성공적으로 삭제되었습니다." });
  };
}
