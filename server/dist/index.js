"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const models_1 = require("./models");
const app_1 = __importDefault(require("./app"));
const PORT = parseInt(process.env.PORT, 10) || 80;
const HOST = process.env.HOST || "localhost";
app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server Listening on ${PORT}`);
    //sequelize-db 연결 테스트
    yield models_1.sequelize
        .authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("connection success");
    }))
        .catch((e) => {
        console.log("TT : ", e);
    });
}));
//# sourceMappingURL=index.js.map