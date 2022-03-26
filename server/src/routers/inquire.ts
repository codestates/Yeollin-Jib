import express from "express";
const router = express.Router();

export default function inquireRouter(inquireController: any) {
  router.post("/", inquireController.post);

  return router;
}
