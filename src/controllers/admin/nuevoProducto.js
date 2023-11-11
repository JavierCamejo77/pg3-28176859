const Categoria = require('../../model/producto/Categorias.js');
const Producto = require('../../model/producto/Producto.js');

/* vista para actualizar */
const nuevoProductoVista = async (req, res) => {

    //obtener categorias
    const categorias = await Categoria.findAll();

    res.render('admin/paneles/productos/nuevo', { datos: categorias });
}

/* metodo para actualizar */
const nuevoProducto = async (req, res) => {

    try {
        const { nombre, codigo, precio, descripcion, organico, stock, categoria_id } = req.body;


        console.log({ nombre, codigo, precio, descripcion, organico, stock, categoria_id })
        const nuevoProducto = await Producto.create({
            nombre,
            codigo,
            precio,
            descripcion,
            stock,
            organico,
            categoria_id,
        });

        res.redirect('/admin/');
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ mensaje: 'Error al crear el producto' });
    }


}

module.exports = { nuevoProductoVista, nuevoProducto };
