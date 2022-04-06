"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("express-async-errors");
// routers
const user_1 = __importDefault(require("./routers/user"));
const User_1 = require("./controllers/User");
const post_1 = __importDefault(require("./routers/post"));
const Post_1 = require("./controllers/Post");
const postStorage_1 = __importDefault(require("./routers/postStorage"));
const PostStorage_1 = require("./controllers/PostStorage");
const comment_1 = __importDefault(require("./routers/comment"));
const Comments_1 = require("./controllers/Comments");
const inquire_1 = __importDefault(require("./routers/inquire"));
const Inquire_1 = require("./controllers/Inquire");
const chatting_1 = __importDefault(require("./routers/chatting"));
const Chatting_1 = require("./controllers/Chatting");
//container(DB)
const inversify_config_1 = require("./container/inversify.config");
//module
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
const axios = __importStar(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_mailgun_transport_1 = __importDefault(require("nodemailer-mailgun-transport"));
const corsOption = {
    Headers: { "content-type": "application/json" },
    origin: "*",
    credentials: true,
    method: ["post", "get", "put", "patch", "delete", "options"],
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.urlencoded({
    extended: true,
}));
// routes
app.use("/user", (0, user_1.default)(new User_1.UserController(inversify_config_1.myContainer, crypto, fs, axios, jsonwebtoken_1.default)));
app.use("/post", (0, post_1.default)(new Post_1.PostController(inversify_config_1.myContainer, fs)));
app.use("/storage", (0, postStorage_1.default)(new PostStorage_1.PostStorageController(inversify_config_1.myContainer)));
app.use("/comment", (0, comment_1.default)(new Comments_1.CommentsController(inversify_config_1.myContainer)));
app.use("/inquire", (0, inquire_1.default)(new Inquire_1.InquireController(nodemailer_1.default, nodemailer_mailgun_transport_1.default)));
app.use("/chatting", (0, chatting_1.default)(new Chatting_1.ChattingController(inversify_config_1.myContainer)));
app.get("/", (req, res, next) => {
    res.status(200).send("Hello world");
});
app.use((req, res, next) => {
    return res.status(404).json({ message: "Not Found" });
});
app.use((error, req, res, next) => {
    console.error(error);
    return res.status(500).json({ message: "서버에러 입니다." });
});
exports.default = app;
//# sourceMappingURL=app.js.map