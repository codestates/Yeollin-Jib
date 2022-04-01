import { Request, Response } from "express";
import { TYPES } from "../container/types";
import { Container } from "inversify";
import { PostData } from "../data/postData";
import { PostCategoryData } from "../data/postCategoryData";
import { CategoryData } from "../data/categoryData";
import { StorageData } from "../data/storageData";

export class PostController {
  container: Container;
  fs: typeof import("fs");

  constructor(myContainer: Container, fsModule: typeof import("fs")) {
    this.container = myContainer;
    this.fs = fsModule;
  }

  createPost = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const postCategoryRepository = this.container.get<PostCategoryData>(
      TYPES.postCategoryDB,
    );
    const categoryRepository = this.container.get<CategoryData>(
      TYPES.categoryDB,
    );
    const userId = req.cookies.id;
    const images: any = req.files;
    let imagesArray;
    let imagePaths;

    if (images) {
      imagesArray = images.map((oneFile: any) => {
        return String(oneFile.path);
      });
      imagePaths = imagesArray.join(",");
    }

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

    const postCreate = await postRepository.createPost(
      userId,
      title,
      contents,
      imagePaths,
      address,
      dueDate,
      latitude,
      longitude,
    );
    if (!postCreate)
      return res.status(400).send({ message: "게시글이 생성되지 않았습니다." });

    const postId = postCreate.id;
    const arrayCategory1: number[] = category1.split(",");
    const arrayCategory2: number[] = category2.split(",");
    const number: number = arrayCategory1.length;

    for (let i = 0; i < number; i++) {
      const findCategoryId = await categoryRepository.findCategory(
        arrayCategory1[i],
        arrayCategory2[i],
      );
      postCategoryRepository.createPostCategory(postId, findCategoryId!.id);
    }

    return res
      .status(201)
      .json({ postId: postId, message: "게시글이 생성되었습니다." });
  };

  deletePost = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const userId = req.cookies.id; //유저 아이디
    const postId = req.params.postId; //게시물 아이디

    const postDelete = await postRepository.deletePostById(postId, userId);
    if (!postDelete) {
      return res.status(404).json({ message: "삭제하려는 게시물이 없습니다." });
    }

    return res.status(201).json({ message: "게시물이 삭제되었습니다." });
  };

  patchCategory = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const postCategoryRepository = this.container.get<PostCategoryData>(
      TYPES.postCategoryDB,
    );
    const { postId, categoryId } = req.body;

    if (!(await postRepository.findPostByPostId(postId))) {
      return res
        .status(404)
        .send({ message: "카테고리를 변경하려는 게시물이 없습니다." });
    }

    const arrayCategoryId = categoryId.split(",");

    for (let i = 0; i < arrayCategoryId.length; i++) {
      const findPostCategory = await postCategoryRepository.findPostCategory(
        postId,
        arrayCategoryId[i],
      );

      if (findPostCategory!.Boolean === true) {
        await postCategoryRepository.updateFalsePostCategory(
          postId,
          arrayCategoryId[i],
        );
      } else {
        await postCategoryRepository.updateTruePostCategory(
          postId,
          arrayCategoryId[i],
        );
      }
    }

    res.status(200).send({ message: "정보 수정이 완료되었습니다" });
  };

  patch = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const postCategoryRepository = this.container.get<PostCategoryData>(
      TYPES.postCategoryDB,
    );
    const categoryRepository = this.container.get<CategoryData>(
      TYPES.categoryDB,
    );
    const userId = req.cookies.id;
    const postId: string = req.params.postId;
    const images: any = req.files;
    let imagesArray;
    let addImagePath;

    if (images) {
      imagesArray = images.map((oneFile: any) => {
        return String(oneFile.path);
      });
      addImagePath = imagesArray.join(",");
    }

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
      postRepository.updatePostTitle(title, postId, userId);
    }
    if (contents) {
      postRepository.updatePostContents(contents, postId, userId);
    }
    if (address) {
      postRepository.updatePostAddress(address, postId, userId);
    }
    if (dueDate) {
      postRepository.updatePostDudate(dueDate, postId, userId);
    }
    if (latitude && longitude) {
      postRepository.updatePostCoordinate(latitude, longitude, postId, userId);
    }

    // image add
    if (addImagePath) {
      if (imagePath) {
        const newImagePath = imagePath + "," + addImagePath;
        postRepository.updatePostAddImage(newImagePath, postId, userId);
      } else {
        postRepository.updatePostAddImage(addImagePath, postId, userId);
      }
    }

    // image delete
    if (imageDelete) {
      const deleteArrayImage = imageDelete.split(",");
      deleteArrayImage.map((value: string) => {
        if (this.fs.existsSync(value)) {
          this.fs.unlinkSync(value);
        }
      });
    }

    // category
    if (category1 && category2) {
      await postCategoryRepository.deletePostCategoryByPostId(postId);

      const arrayCategory1 = category1.split(",");
      const arrayCategory2 = category2.split(",");
      const number: number = arrayCategory1.length;

      for (let i = 0; i < number; i++) {
        const find = await categoryRepository.findCategory(
          arrayCategory1[i],
          arrayCategory2[i],
        );
        postCategoryRepository.createPostCategory(postId, find!.id);
      }
    }
    res.status(200).json({ message: "정보 수정이 완료되었습니다" });
  };

  getAllPost = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const pageNum: number = Number(req.params.pageNum);

    let offset: number = 0;
    if (pageNum > 1) {
      offset = 8 * (pageNum - 1);
    }

    const postData = await postRepository.findAllEgithPostsByOffset(offset);

    if (postData.rows.length === 0) {
      return res
        .status(200)
        .send({ message: "더 이상 조회할 게시물이 없습니다." });
    }

    return res.status(200).send({ postData });
  };

  getPostUser = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const userId: number = req.cookies.id;
    const pageNum: number = Number(req.params.pageNum);

    let offset = 0;
    if (pageNum > 1) {
      offset = 8 * (pageNum - 1);
    }

    const postData = await postRepository.findAllUserPostByUserId(userId);

    if (postData.rows.length === 0) {
      return res
        .status(200)
        .send({ message: "더 이상 조회할 게시물이 없습니다." });
    }

    res.status(200).send({ postData });
  };

  getCategory = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const categoryRepository = this.container.get<CategoryData>(
      TYPES.categoryDB,
    );
    const pageNum: number = Number(req.query.page);
    const categoryNumber: number = Number(req.query.code);
    let categoryNumbers: number[] = [];

    const categoryGet = await categoryRepository.findCategory1Code(
      categoryNumber,
    );
    if (categoryGet) {
      categoryGet.map((category) => {
        categoryNumbers.push(category.id);
      });
    }

    let offset = 0;
    if (pageNum > 1) {
      offset = 8 * (pageNum - 1);
    }

    // 카테고리 대분류
    const postData = await postRepository.findAllPostByCategoryAndOffset(
      offset,
      categoryNumbers,
    );

    if (postData.rows.length === 0) {
      return res
        .status(200)
        .send({ message: "더이상 조회할 게시물이 없습니다." });
    }
    res.status(200).send({ postData });
  };

  getSearchForPost = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const pageNum: number = Number(req.query.page);
    const code = req.query.code; //title or address
    const search: string = String(req.query.search);

    let offset = 0;
    if (pageNum > 1) {
      offset = 8 * (pageNum - 1);
    }

    let postData;
    if (code === "title") {
      postData = await postRepository.findAllPostByTitleSearch(offset, search);
    } else if (code === "address") {
      postData = await postRepository.findAllPostByAddressSearch(
        offset,
        search,
      );
    }

    if (postData?.count === 0) {
      return res
        .status(200)
        .send({ message: "더이상 조회할 게시물이 없습니다." });
    }
    return res.status(200).send({ postData });
  };

  getPost = async (req: Request, res: Response) => {
    const postRepository = this.container.get<PostData>(TYPES.postDB);
    const storageRepository = this.container.get<StorageData>(TYPES.storageDB);
    const postId: number = Number(req.params.postId);

    const postStorageData = await storageRepository.findAllStorageIdByPostId(
      postId,
    );
    const postData = await postRepository.readPostByPostId(postId);

    if (!postData)
      return res
        .status(404)
        .json({ message: "이미 삭제된 게시글이거나 없는 게시글 입니다." });

    res
      .status(200)
      .json({ postLike: postStorageData.length, postGet: postData });
  };
}
