import { injectable } from "inversify";
import "reflect-metadata";
import post_category from "../models/post_category";

@injectable()
export class PostCategoryData {
  async createPostCategory(postId: number, categoryId: number): Promise<void> {
    post_category.create({
      postId: postId,
      categoryId: categoryId,
    });
  }

  async findPostCategory(
    postId: number,
    categoryId: number,
  ): Promise<post_category> {
    return post_category.create({
      postId: postId,
      categoryId: categoryId,
    });
  }

  async updateFalsePostCategory(
    postId: number,
    categoryId: number,
  ): Promise<void> {
    post_category.update(
      { Boolean: false },
      { where: { postId: postId, categoryId: categoryId } },
    );
  }

  async updateTruePostCategory(
    postId: number,
    categoryId: number,
  ): Promise<void> {
    post_category.update(
      { Boolean: true },
      { where: { postId: postId, categoryId: categoryId } },
    );
  }

  async deletePostCategoryByPostId(postId: number): Promise<void> {
    post_category.destroy({
      where: { postId: postId },
    });
  }
}
