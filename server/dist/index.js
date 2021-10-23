"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const routers_1 = __importDefault(require("./routers"));
const models_1 = require("./models");
const accessToken_1 = __importDefault(require("./middleware/accessToken"));
const usercontroller = __importStar(require("./controllers/user/index"));
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
app.post("/user", usercontroller.signup);
app.post("/user/login", usercontroller.login);
app.post("/user/logout", accessToken_1.default, usercontroller.logout);
app.get("/", (req, res, next) => {
    res.status(200).send("Hello world");
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
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
