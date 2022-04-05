import { Request, Response, NextFunction } from "express";
import { Socket } from "../connection/socket";
import { Container } from "inversify";
import { TYPES } from "../container/types";
import { ChattingData } from "../data/chattingData";

export class ChattingController {
  container: Container;

  constructor(myContainer: Container) {
    this.container = myContainer;
  }

  createChat = async (req: Request, res: Response): Promise<void> => {
    const chattingRepository = this.container.get<ChattingData>(
      TYPES.chattingDB,
    );
    const userId: number = Number(req.cookies.id);
    const { contents } = req.body;

    const chat = await chattingRepository.createChat(userId, contents);
    const chatId = chat.id;
    const chatData = await chattingRepository.getChatById(chatId);

    Socket.getSocketIO().emit("chatting", chatData);
    res.status(201).json(chatData);
  };

  getChats = async (req: Request, res: Response): Promise<void> => {
    const chattingRepository = this.container.get<ChattingData>(
      TYPES.chattingDB,
    );
    const userId: number = Number(req.cookies.id);

    const data = await chattingRepository.getChatsByUserId(userId);

    res.status(200).json(data);
  };

  getChat = async (req: Request, res: Response): Promise<void> => {
    const chattingRepository = this.container.get<ChattingData>(
      TYPES.chattingDB,
    );
    const id: number = Number(req.params.id);

    const chat = await chattingRepository.getChatById(id);
    if (chat) {
      res.status(200).json(chat);
      return;
    } else {
      res
        .status(404)
        .json({ message: `id: ${id} 는 존재하지 않는 메시지 입니다.` });
    }
  };

  updateChat = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const chattingRepository = this.container.get<ChattingData>(
      TYPES.chattingDB,
    );
    const userId: number = Number(req.cookies.id);
    const id: number = Number(req.params.id);
    const contents = req.body.contents;

    const chat = await chattingRepository.getChatById(id);
    if (!chat) {
      res
        .status(404)
        .json({ message: `id: ${id} 는 존재하지 않는 메시지 입니다.` });
      return;
    }
    if (chat.userId !== userId) {
      res.sendStatus(403).json({ message: `user가 일치하지 않습니다.` });
      return;
    }
    chattingRepository.updateChatById(id, contents);
    res.status(200).json({ message: `메세지가 수정되었습니다.` });
  };

  deleteChat = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const chattingRepository = this.container.get<ChattingData>(
      TYPES.chattingDB,
    );
    const userId: number = Number(req.cookies.id);
    const id: number = Number(req.params.id);

    const chat = await chattingRepository.getChatById(id);
    if (!chat) {
      res.status(404).json({ message: `Tweet not found: ${id}` });
      return;
    }
    if (chat.userId !== userId) {
      res.sendStatus(403).json({ message: `user가 일치하지 않습니다.` });
      return;
    }
    chattingRepository.deleteChatById(id);
    res.sendStatus(204);
  };
}

//   // 방 입장
//   socket.on("joinRoom", (room) => {
//     socket.join(room);
//   });

//   //채팅 메시지
//   socket.on("sendMessage", async ({ room, name, message, chatLength }) => {
//     try {
//       const nowProject = await chatroom.findOne({
//         where: {},
//       });
//       const nowUser = await user.findOne({
//         where: {},
//       });
//       let chat = await chatting.create({
//         text: message,
//         uploadImage: "",
//         writer: nowUser,
//         project: nowProject,
//         room,
//       });
//       await chat.save();
//       socket.to(room).emit("sendMessage", { ...chat });
//       socket.emit("nowMessageId", { id: chat.id, chatLength });
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   // 이미지 보내기
//   socket.on("sendImage", async ({ room, name, uploadImage, chatLength }) => {
//     try {
//       const nowProject = await chatroom.findOne({
//         where: {
//           id: 1,
//         },
//       });
//       const nowUser = await user.findOne({
//         where: {
//           id: 1,
//         },
//       });
//       let chat = await chatting.create({
//         uploadImage,
//         text: "",
//         writer: nowUser,
//         project: nowProject,
//         room,
//       });
//       await chat.save();
//       socket.to(room).emit("sendImage", { ...chat });
//       socket.emit("nowMessageId", { id: chat.id, chatLength });
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   // 메시지 조회
//   socket.on("getAllMessages", async ({ room, order }) => {
//     const nowProject = await chatroom.findOne({
//       where: {
//         id: 1,
//       },
//     });
//     const chats = await chatting.findAll({});
//     const COUNT_SCROLL = 30;
//     let isEnd = false;
//     let total = chats.length;
//     let start_chat = total - (order + 1) * COUNT_SCROLL;
//     if (start_chat < 0) {
//       // 마지막 chat인지 확인
//       start_chat = 0;
//       isEnd = true;
//     }
//     let end_chat = total - order * COUNT_SCROLL;
//     let sliceChats = chats.slice(start_chat, end_chat);
//     socket.emit("getAllMessages", { chats: sliceChats, isEnd });
//   });

//   // 방 퇴장
//   socket.on("leaveRoom", (room) => {
//     socket.leave(room);
//   });
// };

// createRoom = async (req: Request, res: Response) => {};

// deleteRoom = async (req: Request, res: Response) => {};

// getRoom = async (req: Request, res: Response) => {};
