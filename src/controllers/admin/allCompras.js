const Compra = require('../../model/compra/compra'); // Asegúrate de que el modelo Compra esté definido en tu carpeta models

const allCompras = async (req, res) => {

    // Compra {
    //     dataValues: {
    //       id: 17,
    //       cliente_id: 1,
    //       ip_cliente: '::1',
    //       id_transaccion: 'e2f16a12-c1e9-46ff-b23a-24fe6ae0b968',
    //       producto_id: 7,
    //       cantidad: 1,
    //       description: 'Lápiz labial líquido Maybelline ',
    //       total_pagado: 3,
    //       fecha: 2024-01-13T01:07:17.371Z
    //     }
    //   }


    try {
        const compras = await Compra.findAll();
       
        res.render('admin/paneles/compras', { datos: compras }); // Asume que tienes una vista llamada 'compras'
    } catch (error) {
        console.error('Error al obtener todas las compras:', error);
        res.status(500).send('Error al obtener todas las compras');
    }
};

module.exports = { allCompras };