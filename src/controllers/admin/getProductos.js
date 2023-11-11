const Producto = require("../../model/producto/Producto.js");
const Categoria = require("../../model/producto/Categorias.js");
const getProductos = async (req, res) => {

    try {
        const productos = await Producto.findAll();

        const categoria = await Categoria.findAll();

        //unir los productos con las categorias por id
        productos.forEach(producto => {
            categoria.forEach(categoria => {
                if (producto.categoria_id === categoria.id) {
                    // en el arreglo de productos se agrega la propiedad categoria con el nombre de la categoria  
                    producto.categoria = categoria.nombre;

                }
            })
        })

        res.render("admin/paneles/productos", { datos: productos });
    } catch (error) {
        res.json({ error: "No se pudieron cargar los productos" });
    }
}


module.exports = getProductos;