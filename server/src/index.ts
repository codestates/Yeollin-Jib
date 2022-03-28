import "dotenv/config";
import { sequelize } from "./models";
import { AppDataSource } from "./data-source";
import app from "./app";

const PORT: number = parseInt(process.env.PORT as string, 10) || 80;
const HOST: string = process.env.HOST || "localhost";

app.listen(PORT, async () => {
  console.log(`Server Listening on ${PORT}`);
  //sequelize-db 연결 테스트
  await sequelize
    .authenticate()
    .then(async () => {
      console.log("📚 DB connect! Sequelize");
    })
    .catch((e) => {
      console.log("TT : ", e);
    });

  await AppDataSource.initialize()
    //typeORM
    .then(async (connection) => {
      console.log("📚 DB connect! TypeORM");
    })
    .catch((error) => console.log("📚 DB error!", error));
});
