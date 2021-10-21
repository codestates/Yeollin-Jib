import express from "express";
const inquireRouter = express.Router();
import * as inquirecontroller from "../controllers/inquire/index";

inquireRouter.post("/inquire", inquirecontroller.post);

export default inquireRouter;
