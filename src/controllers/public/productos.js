const { Categoria, Imagenes, Producto } = require("../../model/producto");

const productosGet = async (req, res) => {

    // Obtén todos los productos
    const productos = await Producto.findAll();

    // Para cada producto, busca la categoría y las imágenes correspondientes
    const productosTransformados = await Promise.all(productos.map(async (producto) => {
        const categoria = await Categoria.findByPk(producto.categoria_id);
        const imagenes = await Imagenes.findAll({ where: { producto_id: producto.id } });

        // Transforma el producto
        return {
            nombre: producto.nombre,
            codigo: producto.codigo,
            id: producto.id,
            stock: producto.stock,
            organico: producto.organico,
            precio: producto.precio,
            descripcion: producto.descripcion,
            categoria: categoria ? categoria.nombre : 'Sin categoría',
            imagenes: imagenes.map(imagen => imagen.url) // Suponiendo que las imágenes tienen una propiedad 'url'
        };
    }));

    console.log(productosTransformados);

    //me los renderizas en la vista
    res.render("public/productos", { data: productosTransformados });
}

module.exports = { productosGet };