import express from "express";
const chattingRouter = express.Router();
import * as chattingcontroller from "../controllers/chatting/index";

// 채팅방 생성
chattingRouter.post("/chatting", chattingcontroller.createRoom);
// 채팅방 목록 조회
chattingRouter.get("/chatting", chattingcontroller.getRoom);
// 채팅방 삭제
chattingRouter.delete("/chatting", chattingcontroller.deleteRoom);

export default chattingRouter;
