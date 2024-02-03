const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT, API_URL, API_KEY } = process.env;
const axios = require("axios");
const ip = require('ip');
const Compra = require('../model/compra/compra');

const EmailSend = require('../configuracion/EmailSend');

const Cliente = require('../model/usuario/cliente');

router.post('/', (req, res) => {
    
    const { amount, description, cardType, cvv, expirationMonth, expirationYear, productId, sessionToken } = req.body
console.log("adsfadsfads")
    jwt.verify(sessionToken, JWT, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido, por favor inicie sesión de nuevo', error: "token" });
        }

        const paymentData = {
            "amount": amount,
            "card-number": cardType,
            "cvv": cvv,
            "expiration-month": expirationMonth,
            "expiration-year": expirationYear,
            "full-name": "APPROVED",
            "currency": "USD",
            "description": description,
            "reference": `product_id:${productId}`,
        };

 

        axios.post(API_URL + "/payments", paymentData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            }
        })
            .then((response) => {
                console.log("Response:", response.data);

                // Guarda los datos de la compra en la base de datos

                // cliente_id
                // ip_cliente
                // id_transaccion
                // producto_id
                // cantidad
                // description
                // total_pagado
                // fecha

                console.log(decoded)
                Compra.create({
                    cliente_id: decoded.userId,
                    ip_cliente: ip.address(),
                    id_transaccion: response.data.data.transaction_id,
                    producto_id: productId,
                    description: description,
                    cantidad: 1,
                    total_pagado: amount,

                })
                    .then(async (compra) => {
                        console.log("Compra guardada:", compra);
                        
                        //trae el email del cliente por el id de decoded.id

                        const email = await Cliente.findOne({ where: { id: decoded.userId } });
                        console.log("email", email.dataValues.email)
                        new EmailSend().send(email.dataValues.email, 'Compra realizada', `Gracias por comprar el producto ${description}`);

                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        return
                    });
            });
    });


    res.status(200).json({ message: 'Pago procesado correctamente' });
});

module.exports = router;