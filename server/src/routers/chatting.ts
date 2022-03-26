import express from "express";
const router = express.Router();

export default function chattingRouter(chattingController: any) {
  // 채팅방 생성
  router.post("/chatting", chattingController.createRoom);
  // 채팅방 목록 조회
  router.get("/chatting", chattingController.getRoom);
  // 채팅방 삭제
  router.delete("/chatting", chattingController.deleteRoom);
  return router;
}
