const con = require("./dbcon");
const { Sequelize, DataTypes : dt } = require('sequelize');

const Datos = con.define('Dato', 
    {

        id: {
            type: dt.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        temperatura: {
            type: dt.DOUBLE(2, 2),
            allowNull: false,
            unique: false
        },
        fecha:{
            type: dt.DATE,
            defaultValue: dt.NOW,
            allowNull: false,
            unique: false

        },    
        usuario: {
            type: dt.INTEGER,
            allowNull: false
        }

    }
)

module.exports = Datos