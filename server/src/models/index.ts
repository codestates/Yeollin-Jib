import user, { associate as associateUser } from "./user";
import Comment from "./comment";

Comment.hasMany(user, {
  sourceKey: "id",
  foreignKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(user, { foreignKey: "id", targetKey: "id" });

export * from "./sequelize";
const db = {
  user,
  Comment,
};
export type dbType = typeof db;

associateUser(db);
