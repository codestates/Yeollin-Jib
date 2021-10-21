import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class user extends Model {
  public id!: number;
  public nickname!: string;
  public userId!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

user.init(
  {
    nickname: {
      type: DataTypes.STRING(20), // 20글자 이하
      allowNull: false, // 필수
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true, // 고유한 값
    },
    password: {
      type: DataTypes.STRING(100), // 100글자 이하
      allowNull: false,
    },
    userArea: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imagePath: {
      type: DataTypes.STRING,
    },
    loginType: {
      type: DataTypes.STRING(100),
    },
  },

  {
    sequelize,
    modelName: "user",
    tableName: "user",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
  },
);

export const associate = (db: dbType) => {};

export default user;
