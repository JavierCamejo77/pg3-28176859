const Producto = require("../../model/producto/Producto.js");

const eliminarProducto = async (req, res) => {
    try {
  

        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        await producto.destroy();

        res.redirect('/admin/inicio');

    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el producto' });
    }
}

module.exports = eliminarProducto;