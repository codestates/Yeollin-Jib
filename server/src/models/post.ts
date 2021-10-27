import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class post extends Model {
  public readonly id!: number;
  public userId!: number;
  public title!: string;
  public contents!: string;
  public imagePath!: string;
  public address!: string;
  public dueDate!: string;
  public latitude!: number;
  public longitude!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  dataValues: any;
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
      type: DataTypes.STRING,
    },
    imagePath: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    dueDate: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.INTEGER,
    },
    longitude: {
      type: DataTypes.INTEGER,
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
  db.post.hasMany(db.post_category, { foreignKey: "postId", sourceKey: "id", onDelete: "CASCADE", onUpdate: "CASCADE" });
};

export default post;
