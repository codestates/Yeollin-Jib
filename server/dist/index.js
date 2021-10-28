"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const PORT = parseInt(process.env.PORT, 10) || 4000;
const HOST = process.env.HOST || "localhost";
app_1.default.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
    //sequelize-db 연결 테스트
});
//# sourceMappingURL=index.js.map