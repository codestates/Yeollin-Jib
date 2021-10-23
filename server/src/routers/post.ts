import express from "express";
const postRouter = express.Router();
import * as postcontroller from "../controllers/post/index";

postRouter.post("/");

postRouter.post("/image", postcontroller.post_image);

postRouter.get("/", postcontroller.get);

postRouter.get("/user", postcontroller.get_user);

postRouter.get("/:id", postcontroller.get_id);

postRouter.get("/category", postcontroller.category);

postRouter.put("/", postcontroller.put);

postRouter.put("/image", postcontroller.put_image);

postRouter.delete("/", postcontroller.delete_);

export default postRouter;
