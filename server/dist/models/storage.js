"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class storage extends sequelize_1.Model {
}
storage.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "storage",
    tableName: "storage",
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
});
const associate = (db) => {
    storage.belongsTo(db.post, {
        foreignKey: "postId",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    storage.belongsTo(db.user, {
        foreignKey: "userId",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
};
exports.associate = associate;
exports.default = storage;
//# sourceMappingURL=storage.js.map