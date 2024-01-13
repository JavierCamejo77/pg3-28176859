const { Sequelize } = require('sequelize');
const sequelize = require('../../configuracion/db');

const Cliente = sequelize.define('Cliente', {
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Cliente;