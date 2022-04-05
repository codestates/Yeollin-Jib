import { injectable } from "inversify";
import "reflect-metadata";
import chatting from "../models/chatting";
import user from "../models/user";

@injectable()
export class ChattingData {
  async createChat(userId: number, contents: string): Promise<chatting> {
    return chatting.create({ userId: userId, contents: contents });
  }

  async getChatsByUserId(userId: number): Promise<chatting[]> {
    return chatting.findAll({
      where: { userId: userId },
      include: [
        {
          model: user,
          attributes: ["nickname", "imagePath"],
        },
      ],
    });
  }

  async getChatById(id: number): Promise<chatting | null> {
    return chatting.findOne({
      where: { id: id },
      include: [
        {
          model: user,
          attributes: ["nickname", "imagePath"],
        },
      ],
    });
  }

  async updateChatById(id: number, contents: string): Promise<void> {
    chatting.update({ contents: contents }, { where: { id: id } });
  }

  async deleteChatById(id: number): Promise<void> {
    chatting.destroy({ where: { id: id } });
  }
}
