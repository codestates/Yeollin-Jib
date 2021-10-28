"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_ = exports.put = exports.category_find = exports.get = exports.get_user = exports.get_infinite = exports.get_page = exports.post_user = void 0;
const post_1 = __importDefault(require("./post"));
exports.post_user = post_1.default;
const get_page_1 = __importDefault(require("./get_page"));
exports.get_page = get_page_1.default;
const get_infinite_1 = __importDefault(require("./get_infinite"));
exports.get_infinite = get_infinite_1.default;
const get_user_1 = __importDefault(require("./get_user"));
exports.get_user = get_user_1.default;
const get_1 = __importDefault(require("./get"));
exports.get = get_1.default;
const category_1 = __importDefault(require("./category"));
exports.category_find = category_1.default;
const put_1 = __importDefault(require("./put"));
exports.put = put_1.default;
const delete_1 = __importDefault(require("./delete_"));
exports.delete_ = delete_1.default;
//# sourceMappingURL=index.js.map