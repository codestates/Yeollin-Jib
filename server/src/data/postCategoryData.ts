import { injectable } from "inversify";
import "reflect-metadata";
import post_category from "../models/post_category";

@injectable()
export class PostCategoryData {
  async findUser(email: string) {}
}
