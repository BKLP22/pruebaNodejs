// userRoutes.js
const express = require('express');
const categoriaController = require('../controllers/categoriaController.js');

const router = express.Router();

router.get('/categorias', categoriaController.getAllCategories);


module.exports = router;
