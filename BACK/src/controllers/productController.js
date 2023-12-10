// userController.js
const db = require('../db/db');


const getAllProducts = async (req, res) => {
  const sqlProductos = 
  "SELECT `stock`.`id_product` AS 'ID_PRODUCTO', `stock`.`id_product_attribute` AS 'ID_COMBINACION', `stock`.`id_stock_available` AS 'ID_STOCK', `stock`.`id_shop` AS 'ID_TIENDA', `tienda`.`name` AS 'TIENDA', `producto`.`reference` AS 'REFERENCIA', IFNULL( GROUP_CONCAT( DISTINCT `nombre_combinacion`.`name` ORDER BY `nombre_combinacion`.`id_attribute` SEPARATOR ', '), 'SIN COMBINACION' ) AS 'COMBINACION_TALLA_COLOR', `stock`.`quantity` AS 'CANTIDAD', `nombre_producto`.`name` AS 'NOMBRE', `combinacion`.`ean13` AS 'EAN13', CASE WHEN `oferta`.`reduction` IS NOT NULL AND `oferta`.`id_group` != 5 AND `oferta`.`reduction_type` = 'amount' THEN ROUND(( ( `producto`.`price` - `oferta`.`reduction` ) * 1.21 ), 2 ) WHEN `oferta`.`reduction` IS NOT NULL AND `oferta`.`id_group` != 5 AND `oferta`.`reduction_type` = 'percentage' THEN ROUND( ( ( `producto`.`price` -( `producto`.`price` * `oferta`.`reduction` / 100 ) ) * 1.21 ), 2 ) ELSE ROUND( (`producto`.`price` * 1.21) +(`combinacion`.`price` * 1.21), 2 ) END AS 'PRECIO_CON_IVA' FROM `ps_stock_available` stock INNER JOIN `ps_product` producto ON `stock`.`id_product` = `producto`.`id_product` INNER JOIN `ps_product_lang` nombre_producto ON `stock`.`id_product` = `nombre_producto`.`id_product` INNER JOIN `ps_product_attribute` combinacion ON `stock`.`id_product_attribute` = `combinacion`.`id_product_attribute` INNER JOIN `ps_product_attribute_combination` combi ON `stock`.`id_product_attribute` = `combi`.`id_product_attribute` INNER JOIN `ps_attribute_lang` nombre_combinacion ON `combi`.`id_attribute` = `nombre_combinacion`.`id_attribute` INNER JOIN `ps_shop` tienda ON `stock`.`id_shop` = `tienda`.`id_shop` LEFT JOIN `ps_specific_price` oferta ON `stock`.`id_product` = `oferta`.`id_product`  GROUP BY `ID_PRODUCTO`, `ID_COMBINACION`, `ID_TIENDA` ORDER BY `ID_PRODUCTO` DESC , `REFERENCIA`, `ID_COMBINACION`, `TIENDA` DESC;"
  try {
    console.log("Peticion hecha")
    const users = await db.query(sqlProductos);
    res.json(users);
  } catch (error) {
    console.error('Error al obtener tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductsBySearchParameter = async (req, res) => {
  const busqueda = req.params.busqueda;
  const sqlProductos = 
"SELECT `stock`.`id_product` AS 'ID_PRODUCTO', `stock`.`id_product_attribute` AS 'ID_COMBINACION', `stock`.`id_stock_available` AS 'ID_STOCK', `stock`.`id_shop` AS 'ID_TIENDA', `tienda`.`name` AS 'TIENDA', `producto`.`reference` AS 'REFERENCIA', IFNULL( GROUP_CONCAT( DISTINCT `nombre_combinacion`.`name` ORDER BY `nombre_combinacion`.`id_attribute` SEPARATOR ', '), 'SIN COMBINACION' ) AS 'COMBINACION_TALLA_COLOR', `stock`.`quantity` AS 'CANTIDAD', `nombre_producto`.`name` AS 'NOMBRE', `combinacion`.`ean13` AS 'EAN13', CASE WHEN `oferta`.`reduction` IS NOT NULL AND `oferta`.`id_group` != 5 AND `oferta`.`reduction_type` = 'amount' THEN ROUND(( ( `producto`.`price` - `oferta`.`reduction` ) * 1.21 ), 2 ) WHEN `oferta`.`reduction` IS NOT NULL AND `oferta`.`id_group` != 5 AND `oferta`.`reduction_type` = 'percentage' THEN ROUND( ( ( `producto`.`price` -( `producto`.`price` * `oferta`.`reduction` / 100 ) ) * 1.21 ), 2 ) ELSE ROUND( (`producto`.`price` * 1.21) +(`combinacion`.`price` * 1.21), 2 ) END AS 'PRECIO_CON_IVA' FROM `ps_stock_available` stock INNER JOIN `ps_product` producto ON `stock`.`id_product` = `producto`.`id_product` INNER JOIN `ps_product_lang` nombre_producto ON `stock`.`id_product` = `nombre_producto`.`id_product` INNER JOIN `ps_product_attribute` combinacion ON `stock`.`id_product_attribute` = `combinacion`.`id_product_attribute` INNER JOIN `ps_product_attribute_combination` combi ON `stock`.`id_product_attribute` = `combi`.`id_product_attribute` INNER JOIN `ps_attribute_lang` nombre_combinacion ON `combi`.`id_attribute` = `nombre_combinacion`.`id_attribute` INNER JOIN `ps_shop` tienda ON `stock`.`id_shop` = `tienda`.`id_shop` LEFT JOIN `ps_specific_price` oferta ON `stock`.`id_product` = `oferta`.`id_product` WHERE `stock`.`id_shop` != 1 AND( `producto`.`reference` = ? OR `combinacion`.`ean13` = ? ) GROUP BY `ID_PRODUCTO`, `ID_COMBINACION`, `ID_TIENDA` ORDER BY `ID_PRODUCTO` DESC , `REFERENCIA`, `ID_COMBINACION`, `TIENDA` DESC;"
  try {
    const tickets = await db.query(sqlProductos, [busqueda,busqueda]);
    res.json(tickets);
  } catch (error) {
    console.error('Error al obtener productos por búsqueda:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createTicket = async (req, res) => {
  const { asunto, descripcion, id_categoria, prioridad } = req.body;

  console.log('Datos de la solicitud:', req.body);

  try {
    const sql = 'INSERT INTO tickets (asunto, descripcion, id_categoria, prioridad) VALUES (?, ?, ?, ?)';
    console.log('SQL generado:', sql);

    await db.query(sql, [asunto, descripcion, id_categoria, prioridad]);

    res.status(201).json({
      message: 'Ticket creado exitosamente',
      ticket: { asunto, descripcion, id_categoria, prioridad }
    });
  } catch (error) {
    console.error('Error al crear ticket:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTicketById = async (req, res) =>{
  try{
    const id_ticket = req.params.idTicket;
    const sql = 'DELETE FROM tickets WHERE id_ticket = ?'
    await db.query(sql, id_ticket);

    res.status(201).json({
      message: 'Ticket eliminado exitosamente',
      
    });
  }catch(error){
    console.error('Error al eliminar ticket:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllProducts,
  createTicket,
  getProductsBySearchParameter,
  deleteTicketById
};
