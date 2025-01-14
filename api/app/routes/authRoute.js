const express = require("express");
const router = express.Router();
const Auth = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", Auth.register);

// Ruta para iniciar sesión
router.post("/login", Auth.login);

// Ruta para cerrar sesión
router.post("/logout", authMiddleware.verifyToken, Auth.logout);

router.get("/token", authMiddleware.verifyToken, Auth.getUserLogged);

router.get(
  "/admin/dashboard",
  authMiddleware.verifyToken, // Verifica si el usuario está autenticado
  authMiddleware.isAdmin, // Verifica si el usuario es admin
  (req, res) => {
    res.json({ message: "Bienvenido al panel de administración" });
  }
);

router.post(
  "/recover-password",
  authMiddleware.validateEmail,
  Auth.recoverPassword
);

router.post("/change-password", authMiddleware.verifyToken, Auth.changePass);

module.exports = router;
