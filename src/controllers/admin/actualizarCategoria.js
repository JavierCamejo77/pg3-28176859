const Categoria = require('../../model/producto/Categorias.js');

/* vista para actualizar */
const actualizarCategoriaVista = async (req, res) => {

    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);

        res.render('admin/paneles/categorias/editar', { datos: categoria.dataValues });

    } catch (error) {
        console.log('Error al obtener la categoria:', error);
    }
}

/* metodo para actualizar */
const actualizarCategoria = async (req, res) => {

    try {

        const { id } = req.params;
        const { nombre } = req.body;

        const categoria = await Categoria.findByPk(id);
        categoria.nombre = nombre;
        await categoria.save();

        res.redirect('/admin/categorias');

    } catch (error) {
        console.log('Error al obtener la categoria:', error);
    }
}

module.exports = { actualizarCategoriaVista, actualizarCategoria };
