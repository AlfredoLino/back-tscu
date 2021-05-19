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
    nombre: {
        allowNull: false,
        unique: false,
        type: DataTypes.STRING
    },
    idchat:{
        allowNull: true,
        unique: true,
        type : DataTypes.STRING
    },
    photoProfile: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true
    }
})

module.exports = User