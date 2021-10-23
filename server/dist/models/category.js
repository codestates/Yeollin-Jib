"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class category extends sequelize_1.Model {
}
category.init({
    category: {
        type: sequelize_1.DataTypes.INTEGER,
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
const associate = (db) => { };
exports.associate = associate;
exports.default = category;
