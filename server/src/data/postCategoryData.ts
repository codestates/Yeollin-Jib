import { injectable } from "inversify";
import "reflect-metadata";
import post_category from "../models/post_category";

@injectable()
export class PostCategoryData {
  async createPostCategory<T, R>(postId: T, categoryId: R) {
    return post_category.create({
      postId: postId,
      categoryId: categoryId,
    });
  }

  async findPostCategory<T, R>(postId: T, categoryId: R) {
    return post_category.create({
      postId: postId,
      categoryId: categoryId,
    });
  }

  async updateFalsePostCategory<T, R>(postId: T, categoryId: R) {
    return post_category.update(
      { Boolean: false },
      { where: { postId: postId, categoryId: categoryId } },
    );
  }

  async updateTruePostCategory<T, R>(postId: T, categoryId: R) {
    return post_category.update(
      { Boolean: true },
      { where: { postId: postId, categoryId: categoryId } },
    );
  }

  async deletePostCategoryByPostId<T>(postId: T) {
    return post_category.destroy({
      where: { postId: postId },
    });
  }
}
