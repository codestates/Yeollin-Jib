import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class chatroom extends Model {
  public readonly id!: number;
  public chattingId!: number;
  public delfalg!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

chatroom.init(
  {
    chattingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delfalg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "chatroom",
    tableName: "chatroom",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  },
);

export const associate = (db: dbType) => {};

export default chatroom;
