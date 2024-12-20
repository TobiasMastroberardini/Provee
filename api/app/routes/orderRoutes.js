const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

// Rutas para pedidos
router.get("/", OrderController.getAll); // Obtener todas las órdenes
router.get("/:id", OrderController.getById); // Obtener una orden por ID
router.get("/:id/items", OrderController.getOrderItems); // Obtener ítems de una orden
router.get("/user/:userId/items", OrderController.getOrderItemsByUser); // Obtener ítems de una orden por usuario
router.post("/", OrderController.create); // Crear una nueva orden
router.put("/:id", OrderController.update); // Actualizar una orden por ID
router.delete("/:id", OrderController.delete); // Eliminar una orden por ID

module.exports = router;
