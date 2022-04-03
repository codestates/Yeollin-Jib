import { injectable } from "inversify";
import "reflect-metadata";
import chatting from "../models/chatting";

@injectable()
export class ChattingData {
  async createChat(userId: number, contents: string) {
    return chatting.create({ userId: userId, contents: contents });
  }
}
