import express from "express";
const postRouter = express.Router();
import * as postcontroller from "../controllers/post/index";

postRouter.get("/post", postcontroller.get);

export default postRouter;
