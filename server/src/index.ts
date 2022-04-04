import "dotenv/config";
import { sequelize } from "./models";
import { AppDataSource } from "./data-source";
import app from "./app";
import { Socket } from "./connection/socket";
import { Server } from "http";

const PORT: number = parseInt(process.env.PORT as string, 10) || 80;
const HOST: string = process.env.HOST || "localhost";

const server: Server = app.listen(PORT, async () => {
  console.log(`Server Listening on ${PORT}`);
  //sequelize
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

Socket.initSocket(server);
