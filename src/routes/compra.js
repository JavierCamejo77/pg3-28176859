const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT, API_URL, API_KEY } = process.env;
const axios = require("axios");

const Compra = require('../model/compra/compra');

router.post('/', (req, res) => {
    const token = req.headers['x-access-token'];
    const { amount, description, cardType, cvv, expirationMonth, expirationYear, productId, sessionToken } = req.body

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

                Compra.create({
                    cliente_id: decoded.id,
                    ip_cliente: req.ip,
                    id_transaccion: response.data.data.transaction_id,
                    producto_id: productId,
                    description: description,
                    cantidad: 1,
                    total_pagado: amount,

                })
                    .then((compra) => {
                        console.log("Compra guardada:", compra);

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