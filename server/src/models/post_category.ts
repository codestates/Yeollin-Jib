import { BelongsTo, BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class post_category extends Model {
  public readonly id!: number;
  public postId!: number;
  public categoryId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

post_category.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "post_category",
    tableName: "post_category",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  },
);

export const associate = (db: dbType) => {
  db.post_category.belongsTo(db.post, { foreignKey: "postId", targetKey: "id", onDelete: "CASCADE", onUpdate: "CASCADE" });
  db.post_category.belongsTo(db.category, { onDelete: "CASCADE", onUpdate: "CASCADE" });
};

export default post_category;
