const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Vai sincronizar o código com o banco de dados ------------ force: false = ele nao vai forçar a criação da tabela se ja existir
Pergunta.sync({ force: false }).then(() => {});