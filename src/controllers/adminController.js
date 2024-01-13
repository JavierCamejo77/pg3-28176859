const getProductos = require("./admin/getProductos");
const allCategoria = require("./admin/allCategoria");
const categoriaAdd = require("./admin/categoriaAdd");
const { actualizarCategoriaVista, actualizarCategoria } = require("./admin/actualizarCategoria");
const { nuevoProductoVista, nuevoProducto } = require("./admin/nuevoProducto");
const eliminarProducto = require("./admin/eliminarProducto");
const { actualizarProductoVista, actualizarProducto } = require("./admin/actualizarProducto");
const { allCompras } = require("./admin/allCompras");

const { imgsVista, imgs } = require("./admin/imgProducto");

module.exports = {
    getProductos,
    allCategoria,
    categoriaAdd,
    actualizarCategoriaVista,
    actualizarCategoria,
    nuevoProductoVista,
    nuevoProducto,
    eliminarProducto,
    actualizarProductoVista,
    actualizarProducto,
    imgsVista,
    imgs,
    allCompras
};
