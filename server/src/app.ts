import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  Application,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";

// routers
import userRouter from "./routers/user";
import { UserController } from "./controllers/User";

import postRouter from "./routers/post";
import { PostController } from "./controllers/Post";

import postStorageRouter from "./routers/postStorage";
import { PostStorageController } from "./controllers/PostStorage";

import commentRouter from "./routers/comment";
import { CommentsController } from "./controllers/Comments";

import inquireRouter from "./routers/inquire";
import { InquireController } from "./controllers/Inquire";

import chattingRouter from "./routers/chatting";
import { ChattingController } from "./controllers/Chatting";

//container(DB)
import { myContainer } from "./container/inversify.config";

//module
import * as crypto from "crypto";
import * as fs from "fs";
import * as axios from "axios";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import mailGun from "nodemailer-mailgun-transport";

const corsOption = {
  Headers: { "content-type": "application/json" },
  origin: true,
  credentials: true,
  method: ["post", "get", "put", "patch", "delete", "options"],
};

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// routes
app.use(
  "/user",
  userRouter(new UserController(myContainer, crypto, fs, axios, jwt)),
);
app.use("/post", postRouter(new PostController(myContainer, fs)));
app.use("/storage", postStorageRouter(new PostStorageController(myContainer)));
app.use("/comment", commentRouter(new CommentsController(myContainer)));
app.use("/inquire", inquireRouter(new InquireController(nodemailer, mailGun)));
app.use("/chatting", chattingRouter(new ChattingController(myContainer)));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello world");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  return res.status(500).json({ message: "서버에러 입니다." });
});

export default app;
