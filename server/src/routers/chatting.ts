import express from "express";
const chattingRouter = express.Router();
import * as chattingcontroller from "../controllers/chatting/index";

chattingRouter.get("/chatting", chattingcontroller.get);

export default chattingRouter;
