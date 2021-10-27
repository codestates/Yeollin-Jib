import { BelongsToManyAddAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyRemoveAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";

class category extends Model {
  public readonly id!: number;
  public category1!: number;
  public category2!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

category.init(
  {
    category1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "category",
    tableName: "category",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
  },
);

export const associate = (db: dbType) => {
  db.category.hasMany(db.post_category, { foreignKey: "categoryId" });
};

export default category;
