const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

// Rutas para pedidos
router.get('/', OrderController.getAll);
router.get('/:id', OrderController.getById);
router.post('/', OrderController.create);
router.put('/:id', OrderController.update);
router.delete('/:id', OrderController.delete);

module.exports = router;