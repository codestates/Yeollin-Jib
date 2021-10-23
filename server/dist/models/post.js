"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class post extends sequelize_1.Model {
}
post.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false, // 필수
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contents: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    imagePath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "post",
    tableName: "post",
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
});
const associate = (db) => { };
exports.associate = associate;
exports.default = post;
