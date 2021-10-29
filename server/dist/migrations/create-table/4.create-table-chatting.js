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
const chatting_1 = __importDefault(require("../../models/chatting"));
console.log("======Create Table======");
const create_table_users = () => __awaiter(void 0, void 0, void 0, function* () {
    yield chatting_1.default
        .sync({ force: true })
        .then(() => {
        console.log("✅Success Create Table");
    })
        .catch((err) => {
        console.log("❗️Error in Create users Table : ", err);
    });
});
create_table_users();
//# sourceMappingURL=4.create-table-chatting.js.map