import user, { associate as associateUser } from "./user";
import comment from "./comment";

comment.hasMany(user, {
  sourceKey: "id",
  foreignKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
comment.belongsTo(user, { foreignKey: "id", targetKey: "id" });

export * from "./sequelize";
const db = {
  user,
  comment,
};
export type dbType = typeof db;

associateUser(db);
