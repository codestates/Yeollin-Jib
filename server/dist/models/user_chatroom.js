"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class user_chatroom extends sequelize_1.Model {
}
user_chatroom.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    roomId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "user_chatroom",
    tableName: "user_chatroom",
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
});
const associate = (db) => { };
exports.associate = associate;
exports.default = user_chatroom;
//# sourceMappingURL=user_chatroom.js.map