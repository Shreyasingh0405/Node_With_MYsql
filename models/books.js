const { Sequelize, DataTypes } = require("sequelize");;
const sequelize = require("../helpers/databaseConnection");
const Books = sequelize.define("Books", {
    bookName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coverPage: {
        type: DataTypes.JSON,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
})
module.exports = Books

