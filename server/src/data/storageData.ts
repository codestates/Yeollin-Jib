import { injectable } from "inversify";
import "reflect-metadata";
import storage from "../models/storage";

@injectable()
export class StorageData {
  async findAllOnlyStorageIdByUserId<T>(userId: T) {
    return storage.findAll({
      where: { userId },
      attributes: ["id"],
    });
  }

  async findAllStorageIdByPostId(postId: number) {
    return storage.findAll({
      where: { postId: postId },
    });
  }
}
