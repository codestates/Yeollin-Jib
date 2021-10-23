import { Router } from "express";
import userRouter from "./user";
import postRouter from "./post";
import poststorageRouter from "./poststorage";
import commentRouter from "./comment";
import chattingRouter from "./chatting";
import inquireRouter from "./inquire";
const router = Router();

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/post/storage", poststorageRouter);
router.use("/comment", commentRouter);
router.use("/chatting", chattingRouter);
router.use("/inquire", inquireRouter);

export default router;
