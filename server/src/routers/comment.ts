import express from "express";
const commentRouter = express.Router();
import * as commentcontroller from "../controllers/comment/index";

commentRouter.get("/comment", commentcontroller.get);

export default commentRouter;
