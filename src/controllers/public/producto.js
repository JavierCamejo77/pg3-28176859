const { Categoria, Imagenes, Producto } = require("../../model/producto");

const productoGet = async (req, res) => {
    try {
        // Obtén el id del producto de los parámetros de la URL
        const { id } = req.params;

        // Busca el producto con el id correspondiente
        const producto = await Producto.findByPk(id);

        // Si no se encuentra el producto, devuelve un error
        if (!producto) {
            return res.status(404).json({ msg: 'No se encontró el producto con el id proporcionado' });
        }

        // Busca la categoría y las imágenes correspondientes
        const categoria = await Categoria.findByPk(producto.categoria_id);
        const imagenes = await Imagenes.findAll({ where: { producto_id: producto.id } });

        // Transforma el producto
        const productoTransformado = {
            id: producto.id,
            nombre: producto.nombre,
            codigo: producto.codigo,
            stock: producto.stock,
            organico: producto.organico,
            precio: producto.precio,
            descripcion: producto.descripcion,
            categoria: categoria ? categoria.nombre : 'Sin categoría',
            imagenes: imagenes.map(imagen => imagen.url) // Suponiendo que las imágenes tienen una propiedad 'url'
        };

        console.log(productoTransformado);

        // Renderiza el producto en la vista
        res.render("public/producto", { data: productoTransformado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al obtener el producto' });
    }
}

module.exports = { productoGet };