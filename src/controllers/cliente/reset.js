const jwt = require('jsonwebtoken');
const EmailSend = require('../../configuracion/EmailSend');

const resetPost = async (req, res) => {
    const { email } = req.body;


    jwt.sign({ email }, process.env.JWT, { expiresIn: '5h' }, (err, token) => {
        // Envía el correo
        try {
            console.log(token);

            const emailSend = new EmailSend();
            emailSend.send(email, 
                'Recuperación de contraseña',
                `recuperar contraseña: https://javier-camejo.onrender.com/reset/${token}`)

            res.json({ message: 'Correo de recuperación enviado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al enviar el correo' });
        }
    })


}

const resetGet = (req, res) => {
    res.render("cliente/reset");
}




module.exports = { resetPost, resetGet };