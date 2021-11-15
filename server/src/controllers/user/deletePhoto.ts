import { Request, Response } from "express";
import user from "../../models/user";
import * as fs from "fs";

const deletePhoto = async (req: Request, res: Response) => {
  const userId = req.cookies.id;
  try {
    const header = req.headers;
    if (!header) {
      return res.status(403).json({ message: "잘못된 요청입니다." });
    } else {
      const { imagePath } = req.body;

      const findUser: any = await user.findOne({
        where: { id: userId },
      });

      if (findUser) {
        // body로 imagePath라는 키값이 들어오면 db값을 null로 바꾸는 방식
        if (imagePath) {
          // null값이 아닌 사진이 존재할 경우
          if (findUser.imagePath !== null) {
            // 기존 파일 삭제
            fs.unlink(
              `${__dirname}/../../../public/uploads/${findUser.imagePath}`,
              (err) => {
                if (err) {
                  console.log("기존 파일 삭제 에러 입니다.", err.message);
                }
              }
            );
          }
          // db에 있는 유저 테이블의 imagePath를 null로 변경
          await user.update(
            { imagePath: null },
            {
              where: { id: userId },
            }
          );
        }
      }
      return res.status(200).json({ message: "사진 삭제가 완료되었습니다." });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버에러 입니다." });
  }
};
export default deletePhoto;
