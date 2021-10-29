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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importStar(require("./user"));
const post_1 = __importStar(require("./post"));
const post_category_1 = __importStar(require("./post_category"));
const comment_1 = __importStar(require("./comment"));
const category_1 = __importStar(require("./category"));
const storage_1 = __importStar(require("./storage"));
__exportStar(require("./sequelize"), exports);
const db = {
    user: user_1.default,
    post: post_1.default,
    post_category: post_category_1.default,
    comment: comment_1.default,
    category: category_1.default,
    storage: storage_1.default,
};
(0, user_1.associate)(db);
(0, post_1.associate)(db);
(0, post_category_1.associate)(db);
(0, comment_1.associate)(db);
(0, category_1.associate)(db);
(0, storage_1.associate)(db);
//# sourceMappingURL=index.js.map