import { injectable } from "inversify";
import "reflect-metadata";
import post from "../models/post";

@injectable()
export class PostData {
  async findAllOnlyPostIdByUserId<T>(userId: T) {
    return await post.findAll({
      where: { userId },
      attributes: ["id"],
    });
  }

  async findAllOnlyPostImagePathByUserId<T>(userId: T) {
    return await post.findAll({
      where: { userId: userId },
      attributes: ["imagePath"],
    });
  }
}
