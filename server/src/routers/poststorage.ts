import express from "express";
import accessToken from "../middleware/accessToken";
import { PostStorageController } from "../controllers/PostStorage";

import { validaterParamPostId } from "../middleware/validator";

const router = express.Router();

export default function postStorageRouter(
  PostStorageController: PostStorageController,
) {
  router.get("/", accessToken, PostStorageController.getStroage);

  router.post(
    "/:postId",
    validaterParamPostId,
    accessToken,
    PostStorageController.postStorage,
  );

  router.delete(
    "/:postId",
    validaterParamPostId,
    accessToken,
    PostStorageController.deleteStorage,
  );
  return router;
}
