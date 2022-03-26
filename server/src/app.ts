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
import * as userRepository from "./data/userData";

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
app.use("/user", userRouter(new UserController(userRepository)));
app.use("/post", postRouter(new PostController()));
app.use("/storage", postStorageRouter(new PostStorageController()));
app.use("/comment", commentRouter(new CommentsController()));
app.use("/inquire", inquireRouter(new InquireController()));
app.use("/chatting", chattingRouter(new ChattingController()));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello world");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  return res.status(500).json({ message: "서버 에러 입니다." });
});

export default app;
