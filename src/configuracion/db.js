const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/configuracion/db.sqlite', // Ruta a tu archivo SQLite
});

// Consulta para eliminar la tabla
/* sequelize.query("DROP TABLE IF EXISTS clientes")
  .then(() => {
    console.log("Tabla eliminada");
  })
  .catch(err => {
    console.error("Error al eliminar la tabla: ", err);
  }); */

module.exports = sequelize;