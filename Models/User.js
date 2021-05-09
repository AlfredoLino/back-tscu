const con = require("./dbcon");
const { Sequelize, DataTypes } = require('sequelize');

const User = con.define('Usuario', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    pass:{
        type: DataTypes.STRING,
        allowNull: false,
        unique : false

    },
    idchat:{
        allowNull: true,
        unique: true,
        type : DataTypes.STRING
    }
})

module.exports = User