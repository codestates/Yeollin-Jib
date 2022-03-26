import express from "express";
import accessToken from "../middleware/accessToken";
import { PostStorageController } from "../controllers/PostStorage";

const router = express.Router();

export default function postStorageRouter(
  PostStorageController: PostStorageController,
) {
  router.get("/", accessToken, PostStorageController.get_likes);

  router.delete("/:postId", accessToken, PostStorageController.delete_like);

  router.post("/:postId", accessToken, PostStorageController.post_like);

  return router;
}
