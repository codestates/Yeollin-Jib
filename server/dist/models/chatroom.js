"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class chatroom extends sequelize_1.Model {
}
chatroom.init({
    chattingId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    delfalg: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "chatroom",
    tableName: "chatroom",
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
});
const associate = (db) => { };
exports.associate = associate;
exports.default = chatroom;
//# sourceMappingURL=chatroom.js.map