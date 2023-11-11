const Categoria = require('../../model/producto/Categorias.js');
const Producto = require('../../model/producto/Producto.js');
/* vista para actualizar */
const actualizarProductoVista = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    //obtener categorias
    const categorias = await Categoria.findAll();

    res.render('admin/paneles/productos/actualizar', { datos: categorias, producto: producto.dataValues, id });
}

/* metodo para actualizar */
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params; // Supongo que el id del producto que se va a actualizar está en los parámetros de la solicitud
        const { nombre, codigo, precio, descripcion, organico, stock, categoria_id } = req.body;

        console.log({ nombre, codigo, precio, descripcion, organico, stock, categoria_id });

        // Suponiendo que tu modelo tiene un método de actualización llamado `update`
        const productoActualizado = await Producto.update({
            nombre,
            codigo,
            precio,
            descripcion,
            stock,
            organico,
            categoria_id,
        }, {
            where: { id: id } // Aquí debes especificar cómo identificar el producto que deseas actualizar
        });

        if (productoActualizado) {
            res.redirect('/admin/');
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el producto' });
    }
};

module.exports = { actualizarProductoVista, actualizarProducto };
