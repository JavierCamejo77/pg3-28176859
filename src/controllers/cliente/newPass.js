const jwt = require('jsonwebtoken');
const Cliente = require('../../model/usuario/cliente');
const bcrypt = require('bcryptjs');

const newPassGet = (req, res) => {
    res.render("cliente/newPass");
}

const newPassPost = async (req, res) => {

    const { password } = req.body;
    const token = req.params.token;

    try {
        // Verificar el token y obtener el ID del usuario
        const { email } = jwt.verify(token, process.env.JWT);
      
        // Buscar al usuario en la base de datos
        const user = await Cliente.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Actualizar la contraseña del usuario
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la contraseña', error });
    }
}

module.exports = { newPassGet, newPassPost };