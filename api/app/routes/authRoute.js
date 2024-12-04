const express = require("express");
const router = express.Router();
const Auth = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", Auth.register);

// Ruta para iniciar sesión
router.post("/login", Auth.login);

// Ruta para cerrar sesión
router.post("/logout", authMiddleware.verifyToken, Auth.logout); // Asegúrate de que el usuario esté autenticado

// Ruta protegida
// router.get("/protected", authMiddleware.verifyToken, Auth.protected); // Proteger la ruta

module.exports = router;
