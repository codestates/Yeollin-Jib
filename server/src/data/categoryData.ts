import { injectable } from "inversify";
import "reflect-metadata";
import category from "../models/category";

@injectable()
export class CategoryData {
  async findCategory(category1: number, category2: number) {
    return category.findOne({
      where: { category1: category1, category2: category2 },
    });
  }

  async findCategory1Code(category1: number) {
    return await category.findAll({
      where: { category1: category1 },
    });
  }
}
