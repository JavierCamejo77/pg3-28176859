const Categoria = require('../../model/producto/Categorias.js');
const Imagenes = require('../../model/producto/Imagenes.js');

/* vista para actualizar */
const imgsVista = async (req, res) => {

    try {
        const { id } = req.params;

        res.render('admin/paneles/productos/imgs', { id });

    } catch (error) {
        console.log('Error al obtener la categoria:', error);
    }
}

/* metodo para actualizar */
const imgs = async (req, res) => {

    try {

        const { id } = req.params;
        const inputArray = req.files;

        const outputArray = inputArray.map((item, index) => {

            return {
                name: `${item.originalname}`, // Se utiliza originalname como valor para name
                maxCount: 1,
                destacado: index === 0
            };
        });

        console.log(outputArray)

        // Iterar sobre los datos y crear instancias de Imagen
        for (const imagenData of outputArray) {
            await Imagenes.create({
                producto_id: id, // Obtener el ID del nombre
                url: `uploads/${imagenData.name}`, // Ajusta la ruta según tus necesidades
                destacado: imagenData.destacado,
            });
        }

        res.redirect('/admin');

    } catch (error) {
        console.log('Error al obtener el producto:', error);

    }
}

module.exports = { imgsVista, imgs };
