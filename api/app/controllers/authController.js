const userModel = require("../models/userModel");
const Cart = require("../models/cartModel");
const HandleBcrypt = require("../middlewares/handleBcrypt");
const jwt = require("jsonwebtoken");

class Auth {
  // Método para registrar un usuario
  static async register(req, res) {
    try {
      const { nombre, email, password, direccion, telefono } = req.body;

      // Encriptar la contraseña
      const passwordHash = await HandleBcrypt.encrypt(password);

      // Crear el usuario en la base de datos
      const registerUser = await userModel.createUser({
        nombre,
        email,
        password: passwordHash,
        direccion,
        telefono,
      });

      // Crear el carrito para el usuario con el id del usuario registrado
      const newCart = {
        user_id: registerUser.insertId, // Usamos el ID del usuario recién creado
        status: "active", // El carrito puede ser 'active', 'completed' o 'abandoned', puedes ajustar según lo que necesites
      };

      // Inserta el carrito en la base de datos
      const createdCart = await Cart.createCart(newCart);

      // Enviar la respuesta con los datos del usuario y el carrito registrado
      res.status(201).send({
        user: { id: registerUser.insertId, ...newCart },
        cart: createdCart,
      });
    } catch (error) {
      // Manejo de errores
      console.error(error);

      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .send({ error: "El correo electrónico ya está registrado." });
      }

      res.status(500).send({ error: "Error al registrar el usuario" });
    }
  }

  // Método para iniciar sesión
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      console.log("Datos recibidos:", req.body);

      // Buscar el usuario por el email
      const user = await userModel.getUserByEmail(email);
      console.log("Usuario encontrado:", user);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar la contraseña
      console.log("Verificando contraseña:", password, user.password);
      const isPasswordValid = await HandleBcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Verificar que JWT_SECRET esté definido
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET no está definido");
        return res.status(500).json({ message: "Error interno del servidor" });
      }

      // Generar el token con id y rol
      const token = jwt.sign(
        { id: user.id, rol: user.rol }, // Incluye el rol
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Responder con éxito y los datos necesarios
      return res.status(200).json({
        message: "Login exitoso",
        token,
        user: {
          id: user.id,
          email: user.email,
          rol: user.rol, // Incluye el rol en la respuesta
        },
      });
    } catch (error) {
      console.error("Error en login:", error); // Log del error
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // Método para cerrar sesión
  static async logout(req, res) {
    // Aquí no es necesario hacer nada en el servidor, solo devolvemos un mensaje
    return res.status(200).json({ message: "Logout exitoso" });
  }

  // Método para una ruta protegida
  static async protected(req, res) {
    return res.status(200).json({
      message: "Ruta protegida, usuario autorizado",
      userId: req.userId,
    });
  }

  static async getUserLogged(req, res) {
    try {
      const userId = req.userId; // Se obtiene del middleware
      const user = await userModel.getUserById(userId); // Busca el usuario por su ID

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json(user); // Devuelve el usuario
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }
}

module.exports = Auth;
