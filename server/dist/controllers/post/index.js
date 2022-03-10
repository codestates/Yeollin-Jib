"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_ = exports.patch_category = exports.patch = exports.get = exports.get_search = exports.get_category_infinite = exports.get_user_infinite = exports.get_page_infinite = exports.post_user = void 0;
const post_1 = __importDefault(require("./post"));
exports.post_user = post_1.default;
const get_page_infinite_1 = __importDefault(require("./get_page_infinite"));
exports.get_page_infinite = get_page_infinite_1.default;
const get_user_infinite_1 = __importDefault(require("./get_user_infinite"));
exports.get_user_infinite = get_user_infinite_1.default;
const get_search_1 = __importDefault(require("./get_search"));
exports.get_search = get_search_1.default;
const get_1 = __importDefault(require("./get"));
exports.get = get_1.default;
const get_category_infinite_1 = __importDefault(require("./get_category_infinite"));
exports.get_category_infinite = get_category_infinite_1.default;
const patch_category_1 = __importDefault(require("./patch_category"));
exports.patch_category = patch_category_1.default;
const patch_1 = __importDefault(require("./patch"));
exports.patch = patch_1.default;
const delete_1 = __importDefault(require("./delete_"));
exports.delete_ = delete_1.default;
//# sourceMappingURL=index.js.map