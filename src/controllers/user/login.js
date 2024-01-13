const dotenv = require('dotenv');
dotenv.config();
const { USUARIO, PASS } = process.env;

// Ruta para procesar los datos del formulario
const loguear = ('/login', (req, res) => {
   
    const { usuario, password } = req.body;

    if (usuario === USUARIO && password === PASS) {
        res.redirect("/admin");

    } else {
        res.json({ msg: "Usuario o contraseña incorrectos" });
    }
});

module.exports = loguear;