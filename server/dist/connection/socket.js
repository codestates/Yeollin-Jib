"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class Socket {
    constructor(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
            },
        });
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error("token이 존재하지 않습니다."));
            }
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET, (error, decoded) => {
                if (error) {
                    return next(new Error("token이 유효하지 않습니다."));
                }
                next();
            });
        });
        this.io.on("connection", (socket) => {
            console.log("Socket client connected");
        });
    }
    static initSocket(server) {
        if (!Socket.socket) {
            Socket.socket = new Socket(server);
        }
    }
    static getSocketIO() {
        if (!Socket.socket) {
            throw new Error("initSocket을 먼저 선언하세요");
        }
        return Socket.socket.io;
    }
}
exports.Socket = Socket;
//# sourceMappingURL=socket.js.map