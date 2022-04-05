import { injectable } from "inversify";
import "reflect-metadata";
import storage from "../models/storage";

@injectable()
export class StorageData {
  async findAllOnlyStorageIdByUserId(userId: number): Promise<storage[]> {
    return storage.findAll({
      where: { userId },
      attributes: ["id"],
    });
  }

  async findAllStorageIdByPostId(postId: number): Promise<storage[]> {
    return storage.findAll({
      where: { postId: postId },
    });
  }

  async createOrFindStroage(
    postId: number,
    userId: number,
  ): Promise<[storage, boolean]> {
    return storage.findOrCreate({
      where: {
        postId,
        userId,
      },
      defaults: {
        postId,
        userId,
      },
    });
  }

  async findStorageByPostAndUserId(
    postId: number,
    userId: number,
  ): Promise<storage | null> {
    return storage.findOne({
      where: { userId, postId },
    });
  }

  async deleteStorageByPostAndUserId(
    postId: number,
    userId: number,
  ): Promise<void> {
    storage.destroy({
      where: { userId, postId },
    });
  }
}
