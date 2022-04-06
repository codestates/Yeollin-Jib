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
const data_source_1 = require("./data-source");
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./connection/socket");
const PORT = parseInt(process.env.PORT, 10) || 80;
const HOST = process.env.HOST || "localhost";
const server = app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server Listening on ${PORT}`);
    //sequelize
    yield models_1.sequelize
        .authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("📚 DB connect! Sequelize");
    }))
        .catch((e) => {
        console.log("TT : ", e);
    });
    yield data_source_1.AppDataSource.initialize()
        //typeORM
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("📚 DB connect! TypeORM");
    }))
        .catch((error) => console.log("📚 DB error!", error));
}));
socket_1.Socket.initSocket(server);
//# sourceMappingURL=index.js.map