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
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    contents: {
        type: sequelize_1.DataTypes.TEXT,
    },
    imagePath: {
        type: sequelize_1.DataTypes.TEXT,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    dueDate: {
        type: sequelize_1.DataTypes.STRING,
    },
    latitude: {
        type: sequelize_1.DataTypes.STRING,
    },
    longitude: {
        type: sequelize_1.DataTypes.STRING,
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
const associate = (db) => {
    db.post.belongsTo(db.user, {
        foreignKey: "userId",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    db.post.hasMany(db.post_category, {
        foreignKey: "postId",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    db.post.hasMany(db.comment, {
        foreignKey: "postId",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    db.post.hasMany(db.storage, {
        foreignKey: "postId",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    db.post.hasMany(db.comment, {
        foreignKey: "postId",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
};
exports.associate = associate;
exports.default = post;
//# sourceMappingURL=post.js.map