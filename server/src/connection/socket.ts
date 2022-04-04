import { Server } from "http";
import { Server as socketServer } from "socket.io";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class Socket {
  io: socketServer;
  static socket: Socket;

  private constructor(server: Server) {
    this.io = new socketServer(server, {
      cors: {
        origin: "*",
      },
    });

    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("token이 존재하지 않습니다."));
      }
      jwt.verify(
        token,
        process.env.ACCESS_SECRET!,
        (error: any, decoded: any) => {
          if (error) {
            return next(new Error("token이 유효하지 않습니다."));
          }
          next();
        },
      );
    });

    this.io.on("connection", (socket: any) => {
      console.log("Socket client connected");
    });
  }

  static initSocket(server: Server) {
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
