const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Rutas para usuarios
router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
