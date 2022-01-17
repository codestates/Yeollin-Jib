"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const createChat_1 = __importDefault(require("./controllers/chatting/createChat"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const http = require("http");
const server = http.createServer(app_1.default);
const io_socket = require("socket.io");
const io = io_socket(server);
try {
    const chatIo = io.of(/^\/chat\/\w{4,20}$/); // dynamic namespace
    chatIo.use();
    io.on("connect", (socket) => {
        console.log("클라이언트 접속");
        const projectChatIo = chatIo.nsp;
        app_1.default.set("chatIo", projectChatIo);
        (0, createChat_1.default)(socket);
        socket.on("disconnect", function () {
            console.log("클라이언트 접속 종료");
        });
    });
}
catch (err) {
    console.log(err);
}
module.exports = server;
//# sourceMappingURL=socket.js.map