import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";
import user from "./user";

class comment extends Model {
  public readonly id!: number;
  public userId!: BelongsToManyGetAssociationsMixin<user>;
  public postId!: number;
  public contents!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

comment.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "comment",
    tableName: "comment",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  },
);

export const associate = (db: dbType) => {

  db.comment.belongsTo(db.user, { foreignKey: "id", targetKey: "id" });
};

export default comment;
