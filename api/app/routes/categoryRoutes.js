const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
const AuthMiddleware = require("../middlewares/authMiddleware");

// Rutas para categorías
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.post(
  "/",
  AuthMiddleware.verifyToken,
  AuthMiddleware.isAdmin,
  CategoryController.create
);
router.put(
  "/:id",
  AuthMiddleware.verifyToken,
  AuthMiddleware.isAdmin,
  CategoryController.update
);
router.delete(
  "/:id",
  AuthMiddleware.verifyToken,
  AuthMiddleware.isAdmin,
  CategoryController.delete
);

module.exports = router;
