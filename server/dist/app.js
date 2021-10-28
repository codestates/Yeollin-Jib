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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const corsOption = {
    Headers: { "content-type": "application/json" },
    origin: true,
    credentials: true,
    method: ["post", "get", "put", "patch", "delete", "options"],
};
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.urlencoded({
    extended: true,
}));
// routers
const user_1 = __importDefault(require("./routers/user"));
const post_1 = __importDefault(require("./routers/post"));
const poststorage_1 = __importDefault(require("./routers/poststorage"));
const comment_1 = __importDefault(require("./routers/comment"));
const chatting_1 = __importDefault(require("./routers/chatting"));
const inquire_1 = __importDefault(require("./routers/inquire"));
// routes
app.use("/user", user_1.default);
app.use("/storage", poststorage_1.default);
app.use("/post", post_1.default);
app.use("/comment", comment_1.default);
app.use("/chatting", chatting_1.default);
app.use("/inquire", inquire_1.default);
app.get("/", (req, res, next) => {
    res.status(200).send("Hello world");
});
exports.default = app;
//# sourceMappingURL=app.js.map