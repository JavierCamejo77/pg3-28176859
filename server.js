const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const puerto = 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


// Configurar carpeta pública
app.use(express.static(path.join(__dirname, './src/public')));

//confiar en encabezados de proxy
app.set('trust proxy', true);

//db
const sequelize = require('./src/configuracion/db.js');

sequelize.sync({ logging: false }).then(() => {
    console.log("db conectada!");
});

// Middleware para analizar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
const inicioRouter = require('./src/routes/inicio.js');
const adminRouter = require('./src/routes/admin.js');
const clienteRouter = require('./src/routes/cliente.js');
const compraRouter = require('./src/routes/compra.js');
app.use('/', inicioRouter);
app.use('/admin', adminRouter);
app.use('/', clienteRouter); // registro y login
app.use('/compra', compraRouter);

// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});


// En el proyecto realizado en la asignación anterior, agregue las siguientes características:
//   - Formulario de registro de clientes
//      - Guardar los datos del cliente en una tabla de la base de datos, datos mínimos a guardar: email y contraseña
//      - El registro debe ser público
//      - Agregar un reCaptcha al formulario de registro
//   - Vista de inicio de sesión para clientes
//   - Formulario de compra de productos
//      - Este debe mostrarse al momento de hacer clic en el botón de compra
//      - En caso de que el usuario no esté logueado, debe redirigir al formulario de registro de clientes
//      - Se usará tarjeta de crédito como único medio de pago
//      - Guardar los datos de la compra en una tabla de la base de datos, datos mínimos a guardar:
//        cliente_id, producto_id, cantidad, total_pagado, fecha, ip_cliente
//      - Se usará la API https://fakepayment.onrender.com/ para validar el pago con tarjeta de crédito
//   - Vista en la interfaz administrativa de todos los clientes y todas las compras realizadas
// Respaldar lo realizado en la asignación anterior en una rama llamada 'client_view'.
// Una vez finalizada la tarea, haga entrega por GitHub Classroom, copiando los enlaces de GitHub y render correspondientes. Agregue como comentario en la entrega las credenciales del usuario administrativo.