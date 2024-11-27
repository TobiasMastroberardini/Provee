const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController");

// Rutas para carrito
router.get("/", CartController.getAll);
router.get("/:id", CartController.getById);
router.get("/:id/user", CartController.getByUserId);
router.get("/:id/items", CartController.getCartItems);
router.post("/", CartController.create);
router.put("/:id", CartController.update);
router.delete("/:id", CartController.delete);
router.post("/add", CartController.addCartItem);
router.delete("/:id/items", CartController.deleteCartItem);

module.exports = router;
