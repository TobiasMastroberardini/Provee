const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

// Ruta para filtrar productos
router.get("/filter", ProductController.getByConditions);

// Ruta para obtener todos los productos
router.get("/", ProductController.getAll);

router.get("/paginated", ProductController.getPaginatedProducts);

// Ruta para obtener un producto por su ID
router.get("/:id", ProductController.getById);

// Ruta protegida para crear productos (solo admin)
router.post(
  "/",
  AuthMiddleware.verifyToken,
  AuthMiddleware.isAdmin,
  uploadMiddleware.array("images", 5), // Permitir hasta 5 imágenes por producto
  ProductController.create
);

// Ruta protegida para eliminar productos (solo admin)
router.delete(
  "/:id",
  AuthMiddleware.verifyToken, // Verificar si el usuario está autenticado
  AuthMiddleware.isAdmin, // Verificar si el usuario es admin
  ProductController.delete
);

// Ruta protegida para actualizar productos con imágenes
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  AuthMiddleware.isAdmin,
  uploadMiddleware.array("images", 5),
  ProductController.update
);

module.exports = router;
