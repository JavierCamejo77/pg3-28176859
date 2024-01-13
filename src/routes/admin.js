const router = require('express').Router();

const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const upload = require('../configuracion/multer');


router.get("/login", (req, res) => {
    res.render("admin/login/login")
})

router.post("/login", userController.loguear)

router.get("/", adminController.getProductos);

router.get("/categorias", adminController.allCategoria);

router.get("/categoria/agregar", (req, res) => {
    res.render("admin/paneles/categorias/agregar")
});

router.post("/categoria/agregar", adminController.categoriaAdd);

router.get("/categoria/editar/:id", adminController.actualizarCategoriaVista)

router.post("/categoria/editar/:id", adminController.actualizarCategoria)


router.get("/producto/agregar", adminController.nuevoProductoVista)

router.post("/producto/agregar", adminController.nuevoProducto)

router.get("/producto/editar/:id", adminController.actualizarProductoVista)

router.post("/producto/editar/:id", adminController.actualizarProducto)

router.delete("/producto/eliminar/:id", adminController.eliminarProducto)

router.get("/producto/agregar-img/:id", adminController.imgsVista)

router.post("/producto/agregar-img/:id", upload.array('img', 4), adminController.imgs)


router.get("/compras", adminController.allCompras)

module.exports = router;