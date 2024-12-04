// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

class authMiddleware {
  static async verifyToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(403).json({ message: "Token no proporcionado" });
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      req.userId = decoded.id; // Almacena el id del usuario
      next(); // Pasa el control a la siguiente función
    });
  }
}
module.exports = authMiddleware;
