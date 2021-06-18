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
            type: dt.DOUBLE(4, 2),
            allowNull: false,
            unique: false
        },
        distancia:{
            type: dt.DOUBLE(4,2),
            allowNull:false,
            unique: false
        }
    }
)

module.exports = Datos