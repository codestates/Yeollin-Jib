import express from "express";
const poststorageRouter = express.Router();
import * as poststoragecontroller from "../controllers/poststorage/index";
import accessToken from "../middleware/accessToken";

poststorageRouter.get(
  "/post/storage",
  accessToken,
  poststoragecontroller.get_likes
);
poststorageRouter.delete(
  "/post/storage/:id",
  poststoragecontroller.delete_like
);
poststorageRouter.post(
  "/post/storage/:postId",
  accessToken,
  poststoragecontroller.post_like
);

export default poststorageRouter;
