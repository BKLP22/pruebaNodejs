// userRoutes.js
const express = require('express');
const ticketController = require('../controllers/productController');

const router = express.Router();

router.get('/productos', ticketController.getAllProducts);
router.get('/productos/referencia/:busqueda', ticketController.getProductsBySearchParameter);  // Corregido
// router.get('/tickets/:idCategoria', ticketController.getTicketsByCategoria);
// router.get('/tickets/:id', ticketController.getTicketById);
// router.post('/tickets', ticketController.createTicket);
// router.delete('/tickets/:idTicket', ticketController.deleteTicketById);

module.exports = router;
