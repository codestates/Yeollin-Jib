"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChattingController = void 0;
const socket_1 = require("../connection/socket");
const types_1 = require("../container/types");
class ChattingController {
    constructor(myContainer) {
        this.createChat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chattingRepository = this.container.get(types_1.TYPES.chattingDB);
            const userId = Number(req.cookies.id);
            const { contents } = req.body;
            const chat = yield chattingRepository.createChat(userId, contents);
            const chatId = chat.id;
            const chatData = yield chattingRepository.getChatById(chatId);
            socket_1.Socket.getSocketIO().emit("chatting", chatData);
            res.status(201).json(chatData);
        });
        this.getChats = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chattingRepository = this.container.get(types_1.TYPES.chattingDB);
            const userId = Number(req.cookies.id);
            const data = yield chattingRepository.getChatsByUserId(userId);
            res.status(200).json(data);
        });
        this.getChat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const chattingRepository = this.container.get(types_1.TYPES.chattingDB);
            const id = Number(req.params.id);
            const chat = yield chattingRepository.getChatById(id);
            if (chat) {
                res.status(200).json(chat);
                return;
            }
            else {
                res
                    .status(404)
                    .json({ message: `id: ${id} 는 존재하지 않는 메시지 입니다.` });
            }
        });
        this.updateChat = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const chattingRepository = this.container.get(types_1.TYPES.chattingDB);
            const userId = Number(req.cookies.id);
            const id = Number(req.params.id);
            const contents = req.body.contents;
            const chat = yield chattingRepository.getChatById(id);
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
        });
        this.deleteChat = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const chattingRepository = this.container.get(types_1.TYPES.chattingDB);
            const userId = Number(req.cookies.id);
            const id = Number(req.params.id);
            const chat = yield chattingRepository.getChatById(id);
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
        });
        this.container = myContainer;
    }
}
exports.ChattingController = ChattingController;
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
//# sourceMappingURL=Chatting.js.map