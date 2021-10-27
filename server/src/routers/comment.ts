import express from "express";
const commentRouter = express.Router();
import * as commentcontroller from "../controllers/comment/index";
import accessToken from "../middleware/accessToken";
commentRouter.get("/me", accessToken, commentcontroller.get_m);
commentRouter.get("/:id", commentcontroller.get);
commentRouter.post("/:id", accessToken, commentcontroller.post_c);
commentRouter.patch("/:id", accessToken, commentcontroller.patch_c);
commentRouter.delete("/:id", accessToken, commentcontroller.delete_c);

export default commentRouter;
