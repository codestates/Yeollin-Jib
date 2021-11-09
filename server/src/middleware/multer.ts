import multer from "multer";
import multerS3 from "multer-s3";
import * as path from "path";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

export const upload = multer({
  storage: multerS3({
    //multerS3 설정 항목
    s3: s3,
    bucket: "yeollin", //bucket 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read-write", //읽고 쓰기 모두 허용
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname.split(".").pop());
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
