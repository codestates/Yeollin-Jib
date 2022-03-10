"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class post_category extends sequelize_1.Model {
}
post_category.init({
    postId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Boolean: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "post_category",
    tableName: "post_category",
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
});
const associate = (db) => {
    db.post_category.belongsTo(db.post, {
        foreignKey: "postId",
        targetKey: "id",
        foreignKeyConstraint: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
    });
    db.post_category.belongsTo(db.category, {
        foreignKey: "categoryId",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
};
exports.associate = associate;
exports.default = post_category;
//# sourceMappingURL=post_category.js.map