import { Request, Response } from "express";
import post from "../../models/post";
import user from "../../models/user";

const post_like = async (req: Request, res: Response) => {
  //   const userId = req.body.id;
  //   const { postId } = req.params;
  //   if (userId && postId) {
  //     try {
  //       const postInfo: any = await post.findOne({
  //         where: {
  //           id: postId,
  //         },
  //       });
  //       if (!postInfo) {
  //         return res.status(403).send({ message: "게시글이 존재하지 않습니다." });
  //       }
  //       const isInterest = await postInfo.hasUsers(userId);
  //       if (!isInterest) {
  //         await postInfo.addUsers(userId);
  //         postInfo.interest_cnt = postInfo.interest_cnt + 1;
  //         await postInfo.save();
  //         return res
  //           .status(200)
  //           .send({ message: "게시물 찜하기가 성공적으로 했습니다." });
  //       }
  //       res.status(400).send({ message: "이미 관심 등록 했습니다." });
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(501).json({ message: "서버에러 입니다." });
  //     }
  //   } else {
  //     res
  //       .status(400)
  //       .send({ message: "회원 또는 포스트 아이디가 존재하지않습니다." });
  //   }
};
export default post_like;
