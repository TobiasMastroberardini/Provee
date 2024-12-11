const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const AuthMiddleware = require("../middlewares/authMiddleware");

// Ruta para filtrar productos
router.get("/filter", ProductController.getByConditions);

// Ruta para obtener todos los productos
router.get("/", ProductController.getAll);

// Ruta para obtener un producto por su ID
router.get("/:id", ProductController.getById);

// Ruta protegida para crear productos (solo admin)
router.post(
  "/",
  AuthMiddleware.verifyToken, // Verificar si el usuario está autenticado
  AuthMiddleware.isAdmin, // Verificar si el usuario es admin
  ProductController.create
);

// Ruta protegida para actualizar productos (solo admin)
router.put(
  "/:id",
  AuthMiddleware.verifyToken, // Verificar si el usuario está autenticado
  AuthMiddleware.isAdmin, // Verificar si el usuario es admin
  ProductController.update
);

// Ruta protegida para eliminar productos (solo admin)
router.delete(
  "/:id",
  AuthMiddleware.verifyToken, // Verificar si el usuario está autenticado
  AuthMiddleware.isAdmin, // Verificar si el usuario es admin
  ProductController.delete
);

module.exports = router;
