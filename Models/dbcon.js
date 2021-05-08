const { Sequelize } = require('sequelize');

const con = new Sequelize('datatest', 'root', '17070714LIMA.', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: console.log
})

module.exports = con