import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  Model,
} from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class storage extends Model {
  public readonly id!: number;
  public userId!: number;
  public postId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

storage.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "storage",
    tableName: "storage",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  }
);

export const associate = (db: dbType) => {
  storage.belongsTo(db.post, {
    foreignKey: "postId",
    targetKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  storage.belongsTo(db.user, {
    foreignKey: "userId",
    targetKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default storage;
