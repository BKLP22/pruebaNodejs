const db = require('../db/db');


const getAllCategories = async (req, res) => {
  const sqlCategorias = 
  "SELECT id_category,name,description FROM `ps_category_lang` WHERE `id_shop`= 1"
  try {
    //console.log("Peticion hecha")
    const users = await db.query(sqlCategorias);
    res.json(users);
  } catch (error) {
    console.error('Error al obtener categorias:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
    getAllCategories
  };
  