"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class user extends sequelize_1.Model {
}
user.init({
    nickname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // 고유한 값
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // 고유한 값
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userArea: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    imagePath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    loginType: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "user",
    tableName: "user",
    charset: "utf8",
    collate: "utf8_general_ci",
    freezeTableName: true,
    timestamps: true,
    updatedAt: "updateTimestamp",
});
const associate = (db) => {
    db.user.hasMany(db.post, {
        foreignKey: "userId",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    db.user.hasMany(db.comment, {
        foreignKey: "userId",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    db.user.hasMany(db.storage, {
        foreignKey: "userId",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
};
exports.associate = associate;
exports.default = user;
//# sourceMappingURL=user.js.map