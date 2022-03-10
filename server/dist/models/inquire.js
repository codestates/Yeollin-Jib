"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class inquire extends sequelize_1.Model {
}
inquire.init({
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contents: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "inquire",
    tableName: "inquire",
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
});
const associate = (db) => { };
exports.associate = associate;
exports.default = inquire;
//# sourceMappingURL=inquire.js.map