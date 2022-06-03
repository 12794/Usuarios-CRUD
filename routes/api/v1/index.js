const express = require('express');
const router = express.Router();

const categoriesRoutes = require('./categorias');

router.use('/categories', categoriesRoutes);

const usuariosRoutes = require('./usuarios');

router.use('/usuarios', usuariosRoutes);


const bitacoraRoutes = require('./bitacora');

router.use('/bitacora', bitacoraRoutes);

module.exports = router;
