
const Categoria = require("../../model/producto/Categorias.js");

const allCategoria = async (req, res) => {

    try {
        const categoria = await Categoria.findAll();

        res.render("admin/paneles/categorias", { datos: categoria });
    } catch (error) {
        res.json({ error: "No se pudieron cargar las categorias" });
    }
}

module.exports = allCategoria;