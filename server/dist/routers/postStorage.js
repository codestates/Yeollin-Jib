"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accessToken_1 = __importDefault(require("../middleware/accessToken"));
const validator_1 = require("../middleware/validator");
const router = express_1.default.Router();
function postStorageRouter(PostStorageController) {
    router.get("/", accessToken_1.default, PostStorageController.getStroage);
    router.post("/:postId", validator_1.validaterParamPostId, accessToken_1.default, PostStorageController.postStorage);
    router.delete("/:postId", validator_1.validaterParamPostId, accessToken_1.default, PostStorageController.deleteStorage);
    return router;
}
exports.default = postStorageRouter;
//# sourceMappingURL=postStorage.js.map