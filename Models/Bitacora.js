const con = require("./dbcon");
const { DataTypes : dt } = require('sequelize');

const Bitacora = con.define('Bitacora', 
    {

        id: {
            type: dt.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        informe: {
            type: dt.STRING,
            allowNull: false,
            unique: false
        },
        foto: {
            type: dt.STRING,
            allowNull: true,
            unique: false,
        }

    }
)

module.exports = Bitacora