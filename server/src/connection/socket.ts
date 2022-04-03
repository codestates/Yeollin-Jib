import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import "dotenv/config";

class Socket {
  io: any;
  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this.io.use((socket: any, next: any) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error"));
      }
      jwt.verify(
        token,
        process.env.ACCESS_SECRET!,
        (error: any, decoded: any) => {
          if (error) {
            return next(new Error("Authentication error"));
          }
          next();
        },
      );
    });

    this.io.on("connection", (socket: any) => {
      console.log("Socket client connected");
    });
  }
}

let socket: any;
export function initSocket(server: any) {
  if (!socket) {
    socket = new Socket(server);
  }
}
export function getSocketIO() {
  if (!socket) {
    throw new Error("Please call init first");
  }
  return socket.io;
}
