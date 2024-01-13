const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../configuracion/db.js");

class Compra extends Model { }

Compra.init({

    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    ip_cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    id_transaccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    total_pagado: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    fecha: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW, // Genera la fecha automáticamente
        allowNull: false,
    },


}, {
    sequelize,
    modelName: 'Compra',
    tableName: 'compras',
    timestamps: false,
});

module.exports = Compra;