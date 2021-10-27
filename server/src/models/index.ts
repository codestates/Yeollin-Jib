import user, { associate as associateUser } from "./user";
import comment from "./comment";
import post, { associate as associatepost } from "./post";
import post_category, { associate as associatepost_category } from "./post_category";
import category, { associate as associatecategory } from "./category";
export * from "./sequelize";

comment.hasMany(user, {
  sourceKey: "id",
  foreignKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
comment.belongsTo(user, { foreignKey: "id", targetKey: "id" });

const db = {
  user,
  post,
  post_category,
  category,


};
export type dbType = typeof db;

associateuser(db);
associatepost(db);
associatepost_category(db);
associatecategory(db);
