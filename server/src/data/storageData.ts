import { injectable } from "inversify";
import "reflect-metadata";
import storage from "../models/storage";

@injectable()
export class StorageData {
  async findAllOnlyStorageIdByUserId<T>(userId: T) {
    return await storage.findAll({
      where: { userId },
      attributes: ["id"],
    });
  }
}
