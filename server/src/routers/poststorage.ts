import express from "express";
const poststorageRouter = express.Router();
import * as poststoragecontroller from "../controllers/poststorage/index";

poststorageRouter.get("/post/storage", poststoragecontroller.get);

export default poststorageRouter;
