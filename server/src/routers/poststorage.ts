import express from "express";
const poststorageRouter = express.Router();
import * as poststoragecontroller from "../controllers/poststorage/index";
import accessToken from "../middleware/accessToken";

poststorageRouter.get("/", accessToken, poststoragecontroller.get_likes);
poststorageRouter.delete(
  "/:postId",
  accessToken,
  poststoragecontroller.delete_like,
);
poststorageRouter.post(
  "/:postId",
  accessToken,
  poststoragecontroller.post_like,
);

export default poststorageRouter;
