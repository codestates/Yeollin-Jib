"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
function chattingRouter(ChattingController) {
    // 채팅방 생성
    // router.post("/chatting", ChattingController.createRoom);
    // // 채팅방 목록 조회
    // router.get("/chatting", ChattingController.getRoom);
    // // 채팅방 삭제
    // router.delete("/chatting", ChattingController.deleteRoom);
    return router;
}
exports.default = chattingRouter;
//# sourceMappingURL=chatting.js.map