import user, { associate as associateUser } from "./user";

export * from "./sequelize";
const db = {
  user,
};
export type dbType = typeof db;

associateUser(db);
