import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationsMixin,
  DataTypes,
  Model,
} from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";
import post_category from "./post_category";

class post extends Model {
  public readonly id!: number;
  public userId!: number;
  public title!: string;
  public contents!: string;
  public imagePath!: string;
  public address!: string;
  public dueDate!: string;
  public latitude!: string;
  public longitude!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getpost_category!: HasManyGetAssociationsMixin<post_category>;
  public removepost_categorys!: HasManyRemoveAssociationsMixin<
    post_category,
    number
  >;
}

post.init(
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    contents: {
      type: DataTypes.TEXT,
    },
    imagePath: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.STRING,
    },
    dueDate: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize,
    modelName: "post",
    tableName: "post",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  },
);

export const associate = (db: dbType) => {
  db.post.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.post.hasMany(db.post_category, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.post.hasMany(db.comment, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.post.hasMany(db.storage, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default post;
