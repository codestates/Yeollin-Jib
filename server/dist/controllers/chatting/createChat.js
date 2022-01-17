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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatroom_1 = __importDefault(require("../../models/chatroom"));
const user_1 = __importDefault(require("../../models/user"));
const chatting_1 = __importDefault(require("../../models/chatting"));
const createChat = (socket) => {
    // 방 입장
    socket.on("joinRoom", (room) => {
        socket.join(room);
    });
    //채팅 메시지
    socket.on("sendMessage", ({ room, name, message, chatLength }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const nowProject = yield chatroom_1.default.findOne({
                where: {},
            });
            const nowUser = yield user_1.default.findOne({
                where: {},
            });
            let chat = yield chatting_1.default.create({
                text: message,
                uploadImage: "",
                writer: nowUser,
                project: nowProject,
                room,
            });
            yield chat.save();
            socket.to(room).emit("sendMessage", Object.assign({}, chat));
            socket.emit("nowMessageId", { id: chat.id, chatLength });
        }
        catch (err) {
            console.log(err);
        }
    }));
    // 이미지 보내기
    socket.on("sendImage", ({ room, name, uploadImage, chatLength }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const nowProject = yield chatroom_1.default.findOne({
                where: {
                    id: 1,
                },
            });
            const nowUser = yield user_1.default.findOne({
                where: {
                    id: 1,
                },
            });
            let chat = yield chatting_1.default.create({
                uploadImage,
                text: "",
                writer: nowUser,
                project: nowProject,
                room,
            });
            yield chat.save();
            socket.to(room).emit("sendImage", Object.assign({}, chat));
            socket.emit("nowMessageId", { id: chat.id, chatLength });
        }
        catch (err) {
            console.log(err);
        }
    }));
    // 메시지 조회
    socket.on("getAllMessages", ({ room, order }) => __awaiter(void 0, void 0, void 0, function* () {
        const nowProject = yield chatroom_1.default.findOne({
            where: {
                id: 1,
            },
        });
        const chats = yield chatting_1.default.findAll({});
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
    }));
    // 방 퇴장
    socket.on("leaveRoom", (room) => {
        socket.leave(room);
    });
};
exports.default = createChat;
//# sourceMappingURL=createChat.js.map