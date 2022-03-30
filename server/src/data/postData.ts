import { injectable } from "inversify";
import "reflect-metadata";
import post from "../models/post";

@injectable()
export class PostData {
  async findAllPostById<T>(userId: T) {
    return await post.findAll({
      where: { userId },
      attributes: ["id"],
    });
  }
}
