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
  public dataValues!: {
    id: number;
    nickname: string;
    email: string;
    password: string;
    salt: string;
    userArea: string;
    imagePath: string;
    loginType: boolean;
  };
  public readonly id!: number;
  public nickname!: string;
  public email!: string;
  public password!: string;
  public userArea!: string;
  public imagePath!: string;
  public loginType!: boolean;
  public salt!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

user.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // 고유한 값
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userArea: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loginType: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
  },
);

export const associate = (db: dbType) => {
  db.user.hasMany(db.post, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.user.hasMany(db.comment, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.user.hasMany(db.storage, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.user.hasMany(db.chatroom, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default user;
