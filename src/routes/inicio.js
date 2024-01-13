const router = require('express').Router();

const { productosGet, productoGet } = require("../controllers/productosController");

router.get("/", productosGet)

router.get("/productos", productosGet)

router.get("/productos/:id", productoGet)




module.exports = router;