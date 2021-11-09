import app from "./app";
import { Socket } from "socket.io/dist/socket";
import socketChat from "./controllers/chatting/createChat";
import * as dotenv from "dotenv";
dotenv.config();

const http = require("http");
const server = http.createServer(app);
const io_socket = require("socket.io");
const io = io_socket(server);

try {
  const chatIo = io.of(/^\/chat\/\w{4,20}$/); // dynamic namespace
  chatIo.use();

  io.on("connect", (socket: Socket) => {
    console.log("클라이언트 접속");

    const projectChatIo = chatIo.nsp;
    app.set("chatIo", projectChatIo);

    socketChat(socket);

    socket.on("disconnect", function () {
      console.log("클라이언트 접속 종료");
    });
  });
} catch (err) {
  console.log(err);
}

module.exports = server;
