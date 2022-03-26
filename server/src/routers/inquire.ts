import express from "express";
import { InquireController } from "../controllers/Inquire";

const router = express.Router();

export default function inquireRouter(InquireController: InquireController) {
  router.post("/", InquireController.post);

  return router;
}
