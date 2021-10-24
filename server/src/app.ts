import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

const corsOption = {
  Headers: { "content-type": "application/json" },
  origin: true,
  credentials: true,
  method: ["post", "get", "put", "delete", "options"],
};

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routers
import userRouter from "./routers/user";
import postRouter from "./routers/post";
import poststorageRouter from "./routers/poststorage";
import commentRouter from "./routers/comment";
import chattingRouter from "./routers/chatting";
import inquireRouter from "./routers/inquire";

// routes
app.use("/user", userRouter);
app.use("/post/storage", poststorageRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/chatting", chattingRouter);
app.use("/inquire", inquireRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hello world");
});

export default app;
