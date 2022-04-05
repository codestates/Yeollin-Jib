import { injectable } from "inversify";
import "reflect-metadata";
import post from "../models/post";
import user from "../models/user";
import storage from "../models/storage";
import post_category from "../models/post_category";
import Sequelize from "sequelize";
const { or, and, gt, lt, like, overlap } = Sequelize.Op;

type getPostData = {
  rows: post[];
  count: number;
};

@injectable()
export class PostData {
  async createPost(
    userId: number,
    title: string,
    contents: string,
    imagePath: string,
    address: string,
    dueDate: string,
    latitude: string,
    longitude: string,
  ): Promise<post> {
    return post.create({
      userId: userId,
      title: title,
      contents: contents,
      imagePath: imagePath,
      address: address,
      dueDate: dueDate,
      latitude: latitude,
      longitude: longitude,
    });
  }

  async findPostByPostId(postId: number): Promise<post | null> {
    return post.findOne({
      where: { id: postId },
    });
  }

  async findAllOnlyPostIdByUserId(userId: number): Promise<post[]> {
    return post.findAll({
      where: { userId },
      attributes: ["id"],
    });
  }

  async findAllOnlyPostImagePathByUserId(userId: number): Promise<post[]> {
    return post.findAll({
      where: { userId: userId },
      attributes: ["imagePath"],
    });
  }

  async findAllEgithPostsByOffset(offset: number): Promise<getPostData> {
    return post.findAndCountAll({
      attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
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
  }

  async findAllUserPostByUserIdAndOffset(
    userId: number,
    offset: number,
  ): Promise<getPostData> {
    return post.findAndCountAll({
      attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
      limit: 8,
      offset: offset,
      order: [["id", "DESC"]],
      distinct: true,
      where: { userId: userId },
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
  }

  async findAllPostStorageByUserId(userId: number): Promise<getPostData> {
    return post.findAndCountAll({
      attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
      order: [["id", "DESC"]],
      distinct: true, //Don't count include
      include: [
        {
          model: user,
          attributes: ["nickname", "imagePath"],
        },
        {
          model: storage,
          attributes: ["userId"],
          where: { userId: userId },
        },
        {
          model: post_category,
          attributes: ["categoryId"],
        },
      ],
    });
  }

  async findAllPostByCategoryAndOffset(
    offset: number,
    categoryNumbers: number[],
  ): Promise<getPostData> {
    return post.findAndCountAll({
      attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
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
  }

  async findAllPostByTitleSearch(
    offset: number,
    search: string,
  ): Promise<getPostData> {
    return post.findAndCountAll({
      attributes: ["id", "userId", "title", "address", "dueDate", "imagePath"],
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
  }

  async findAllPostByAddressSearch(
    offset: number,
    search: string,
  ): Promise<getPostData> {
    return post.findAndCountAll({
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
  }

  async readPostByPostId(postId: number): Promise<post | null> {
    return post.findOne({
      where: { id: postId },
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
  }

  async updatePostTitle(
    title: string,
    postId: number,
    userId: number,
  ): Promise<void> {
    post.update({ title: title }, { where: { id: postId, userId: userId } });
  }

  async updatePostContents(
    contents: string,
    postId: number,
    userId: number,
  ): Promise<void> {
    post.update(
      { contents: contents },
      { where: { id: postId, userId: userId } },
    );
  }

  async updatePostAddress(
    address: string,
    postId: number,
    userId: number,
  ): Promise<void> {
    post.update(
      { address: address },
      { where: { id: postId, userId: userId } },
    );
  }

  async updatePostDudate(
    dueDate: string,
    postId: number,
    userId: number,
  ): Promise<void> {
    post.update(
      { dueDate: dueDate },
      { where: { id: postId, userId: userId } },
    );
  }

  async updatePostCoordinate(
    latitude: string,
    longitude: string,
    postId: number,
    userId: number,
  ): Promise<void> {
    post.update(
      { latitude: latitude, longitude: longitude },
      { where: { id: postId, userId: userId } },
    );
  }

  async updatePostAddImage(
    imagePath: string,
    postId: number,
    userId: number,
  ): Promise<void> {
    post.update(
      { imagePath: imagePath },
      { where: { id: postId, userId: userId } },
    );
  }

  async deletePostById(postId: number, userId: number): Promise<number> {
    return post.destroy({ where: { id: postId, userId: userId } });
  }
}
