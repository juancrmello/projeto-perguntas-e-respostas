const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'vertrigo', {
    host:'localhost',
    dialect: 'mysql'
});

module.exports = connection;