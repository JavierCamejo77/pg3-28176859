const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cliente = require('../../model/usuario/cliente');
const { JWT, DURACION_JWT } = process.env;

const getLogin = (req, res, next) => {
    res.render('cliente/login');
};

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const cliente = await Cliente.findOne({ where: { email: email } });
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, cliente.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign({ id: cliente.id }, JWT, {
            expiresIn: DURACION_JWT,
        });


        res.json({ jwt: token })

    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};

module.exports = { getLogin, postLogin };