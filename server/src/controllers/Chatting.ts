import { Request, Response } from "express";
import { Socket } from "socket.io/dist/socket";
import chatroom from "../models/chatroom";
import user from "../models/user";
import chatting from "../models/chatting";

export class ChattingController {
  constructor() {}

  createChat = async (socket: Socket) => {
    // 방 입장
    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    //채팅 메시지
    socket.on("sendMessage", async ({ room, name, message, chatLength }) => {
      try {
        const nowProject = await chatroom.findOne({
          where: {},
        });
        const nowUser = await user.findOne({
          where: {},
        });
        let chat = await chatting.create({
          text: message,
          uploadImage: "",
          writer: nowUser,
          project: nowProject,
          room,
        });
        await chat.save();
        socket.to(room).emit("sendMessage", { ...chat });
        socket.emit("nowMessageId", { id: chat.id, chatLength });
      } catch (err) {
        console.log(err);
      }
    });

    // 이미지 보내기
    socket.on("sendImage", async ({ room, name, uploadImage, chatLength }) => {
      try {
        const nowProject = await chatroom.findOne({
          where: {
            id: 1,
          },
        });
        const nowUser = await user.findOne({
          where: {
            id: 1,
          },
        });
        let chat = await chatting.create({
          uploadImage,
          text: "",
          writer: nowUser,
          project: nowProject,
          room,
        });
        await chat.save();
        socket.to(room).emit("sendImage", { ...chat });
        socket.emit("nowMessageId", { id: chat.id, chatLength });
      } catch (err) {
        console.log(err);
      }
    });

    // 메시지 조회
    socket.on("getAllMessages", async ({ room, order }) => {
      const nowProject = await chatroom.findOne({
        where: {
          id: 1,
        },
      });
      const chats = await chatting.findAll({});
      const COUNT_SCROLL = 30;
      let isEnd = false;
      let total = chats.length;
      let start_chat = total - (order + 1) * COUNT_SCROLL;
      if (start_chat < 0) {
        // 마지막 chat인지 확인
        start_chat = 0;
        isEnd = true;
      }
      let end_chat = total - order * COUNT_SCROLL;
      let sliceChats = chats.slice(start_chat, end_chat);
      socket.emit("getAllMessages", { chats: sliceChats, isEnd });
    });

    // 방 퇴장
    socket.on("leaveRoom", (room) => {
      socket.leave(room);
    });
  };

  createRoom = async (req: Request, res: Response) => {};

  deleteRoom = async (req: Request, res: Response) => {};

  getRoom = async (req: Request, res: Response) => {};
}
