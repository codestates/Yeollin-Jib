"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class user extends sequelize_1.Model {
}
user.init({
    nickname: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false, // 필수
    },
    userId: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true, // 고유한 값
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    userArea: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    imagePath: {
        type: sequelize_1.DataTypes.STRING,
    },
    loginType: {
        type: sequelize_1.DataTypes.STRING(100),
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "user",
    tableName: "user",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글이 저장
});
const associate = (db) => { };
exports.associate = associate;
exports.default = user;
