"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.ChattingData = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const chatting_1 = __importDefault(require("../models/chatting"));
const user_1 = __importDefault(require("../models/user"));
let ChattingData = class ChattingData {
    createChat(userId, contents) {
        return __awaiter(this, void 0, void 0, function* () {
            return chatting_1.default.create({ userId: userId, contents: contents });
        });
    }
    getChatsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return chatting_1.default.findAll({
                where: { userId: userId },
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                ],
            });
        });
    }
    getChatById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return chatting_1.default.findOne({
                where: { id: id },
                include: [
                    {
                        model: user_1.default,
                        attributes: ["nickname", "imagePath"],
                    },
                ],
            });
        });
    }
    updateChatById(id, contents) {
        return __awaiter(this, void 0, void 0, function* () {
            chatting_1.default.update({ contents: contents }, { where: { id: id } });
        });
    }
    deleteChatById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            chatting_1.default.destroy({ where: { id: id } });
        });
    }
};
ChattingData = __decorate([
    (0, inversify_1.injectable)()
], ChattingData);
exports.ChattingData = ChattingData;
//# sourceMappingURL=chattingData.js.map