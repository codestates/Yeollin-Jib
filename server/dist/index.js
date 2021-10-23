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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const routers_1 = __importDefault(require("./routers"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT, 10) || 4000;
const HOST = process.env.HOST || "localhost";
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
const options = {
    origin: true,
    credentials: true,
    methods: "GET,PUT,PATCH,POST,DELETE",
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.static("public"));
app.use(routers_1.default);
app.get("/", (req, res, next) => {
    res.status(200).send("Hello world");
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server Listening on ${PORT}`);
}));
