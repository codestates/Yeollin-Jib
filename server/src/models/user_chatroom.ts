import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  Model,
} from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class user_chatroom extends Model {
  public readonly id!: number;
  public userId!: number;
  public roomId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

user_chatroom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "user_chatroom",
    tableName: "user_chatroom",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  },
);
export const associate = (db: dbType) => {};

export default user_chatroom;
