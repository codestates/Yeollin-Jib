import "dotenv/config";
import { sequelize } from "./models";
import app from "./app";

const PORT: number = parseInt(process.env.PORT as string, 10) || 80;
const HOST: string = process.env.HOST || "localhost";

app.listen(PORT, async () => {
  console.log(`Server Listening on ${PORT}`);
  //sequelize-db 연결 테스트
  await sequelize
    .authenticate()
    .then(async () => {
      console.log("connection success");
    })
    .catch((e) => {
      console.log("TT : ", e);
    });
});
