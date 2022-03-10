"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class category extends sequelize_1.Model {
}
category.init({
    category1: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    category2: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "category",
    tableName: "category",
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
});
const associate = (db) => {
    db.category.hasMany(db.post_category, {
        foreignKey: "categoryId",
        sourceKey: "id",
    });
};
exports.associate = associate;
exports.default = category;
//# sourceMappingURL=category.js.map