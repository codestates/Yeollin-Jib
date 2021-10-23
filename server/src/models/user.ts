import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  Model,
} from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class user extends Model {
<<<<<<< HEAD
  public dataValues!: { id: any; email: any; nickname: any };
=======
>>>>>>> 502d6b24db0970a493de3ff1bf7a571d1b529e21
  public readonly id!: number;
  public nickname!: string;
  public email!: string;
  public password!: string;
  public userArea!: string;
  public imagePath!: string;
<<<<<<< HEAD
  public salt!: string;
=======
>>>>>>> 502d6b24db0970a493de3ff1bf7a571d1b529e21
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

user.init(
  {
    nickname: {
      type: DataTypes.STRING(20), // 20글자 이하
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    email: {
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
      allowNull: true,
    },
    loginType: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize,
    modelName: "user",
    tableName: "user",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
<<<<<<< HEAD
  }
=======
  },
>>>>>>> 502d6b24db0970a493de3ff1bf7a571d1b529e21
);

export const associate = (db: dbType) => {};

export default user;
