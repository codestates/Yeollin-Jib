import express from "express";
import { ChattingController } from "../controllers/Chatting";

const router = express.Router();

export default function chattingRouter(ChattingController: ChattingController) {
  // 채팅방 생성
  // router.post("/chatting", ChattingController.createRoom);

  // // 채팅방 목록 조회
  // router.get("/chatting", ChattingController.getRoom);

  // // 채팅방 삭제
  // router.delete("/chatting", ChattingController.deleteRoom);

  return router;
}
