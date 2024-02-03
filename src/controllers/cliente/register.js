const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cliente = require('../../model/usuario/cliente');
const axios = require('axios');
const { JWT } = process.env;
const EmailSend = require('../../configuracion/EmailSend');

const getRegister = (req, res) => {
    res.render("cliente/register");
};

const postRegister = async (req, res) => {
    const { nombre, email, password, 'g-recaptcha-response': captchaResponse } = req.body;
    console.log("token", JWT);
    console.log(req.body);

    try {

        const recaptchaResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: '6LfHqEopAAAAAFbvgCOUhlIU8u6_vJLP2azowYsI', // This should be your secret key
                response: captchaResponse
            }
        });

        if (!recaptchaResponse.data.success) {
            return res.status(400).json({ error: 'Invalid reCAPTCHA' });
        }

        console.log("token");
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await Cliente.create({
            nombre,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: newUser.id },
            JWT,
            { expiresIn: '1h' }
        );

        new EmailSend().send(email, 'Bienvenid@ a la tienda', 'Gracias por registrarte en nilo');

        res.json({ jwt: token })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};

module.exports = { getRegister, postRegister };