import * as dotenv from "dotenv";
dotenv.config();

type IConfig = {
  username: string;
  password: string;
  database: string;
  [key: string]: any;
};

interface IConfigGroup {
  development: IConfig;
  test: IConfig;
  production: IConfig;
}

const config: IConfigGroup = {
  development: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
  test: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME! || "localhost",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
  production: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME! || "localhost",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
};

export default config;
