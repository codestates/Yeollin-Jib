import express from "express";
import accessToken from "../middleware/accessToken";

const router = express.Router();

export default function postStorageRouter(poststoragecontroller: any) {
  router.get("/", accessToken, poststoragecontroller.get_likes);

  router.delete("/:postId", accessToken, poststoragecontroller.delete_like);

  router.post("/:postId", accessToken, poststoragecontroller.post_like);

  return router;
}
