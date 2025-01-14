const userModel = require("../models/userModel");
const Cart = require("../models/cartModel");
const HandleBcrypt = require("../middlewares/handleBcrypt");
const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");
const pool = require("../../database/database.js");

class Auth {
  // Método para registrar un usuario
  static async register(req, res) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN"); // Iniciar la transacción

      const { nombre, email, password, direccion, telefono } = req.body;

      // Validaciones de datos
      if (!nombre || !email || !password || !direccion || !telefono) {
        return res
          .status(400)
          .send({ error: "Todos los campos son obligatorios" });
      }

      // Encriptar la contraseña
      const passwordHash = await HandleBcrypt.encrypt(password);

      // Crear el usuario en la base de datos usando el client de la transacción
      const registerUser = await userModel.createUser(
        {
          nombre,
          email,
          password: passwordHash,
          direccion,
          telefono,
        },
        client
      );

      // Crear el carrito para el usuario con el ID recién creado
      const newCart = {
        user_id: registerUser.id, // Usamos el ID del usuario recién creado
        created_at: new Date(), // Fecha de creación
        updated_at: new Date(), // Fecha de actualización
        status: "active", // El carrito puede estar 'active', 'completed' o 'abandoned'
      };

      // Inserta el carrito en la base de datos
      const createdCart = await Cart.createCart(client, newCart);

      await client.query("COMMIT");

      // Enviar la respuesta con los datos del usuario y el carrito registrado
      res.status(201).send({
        user: registerUser,
        cart: createdCart,
      });
    } catch (error) {
      // Si algo falla, hacer rollback de la transacción
      await client.query("ROLLBACK");
      console.error(error);

      if (error.code === "23505") {
        // Error en caso de correo duplicado
        return res
          .status(409)
          .send({ error: "El correo electrónico ya está registrado." });
      }

      res.status(500).send({ error: "Error al registrar el usuario" });
    } finally {
      client.release(); // Liberar la conexión
    }
  }

  // Método para iniciar sesión
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      // Buscar el usuario por el email
      const user = await userModel.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar la contraseña
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

      // Generar el token
      const token = jwt.sign(
        { id: user.id, rol: user.rol },
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
          rol: user.rol,
        },
      });
    } catch (error) {
      console.error("Error en login:", error); // Log del error
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // Método para cerrar sesión
  static async logout(req, res) {
    //solo devuelve un mensaje
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
      const userId = req.userId;
      const user = await userModel.getUserById(userId); // Busca el usuario por su ID

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }

  static async recoverPassword(req, res) {
    try {
      const { email } = req.body;

      // Buscar usuario por email
      const user = await userModel.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Generar nueva contraseña
      const newPassword = await UserService.generateRandomPassword();

      // Encriptar y actualizar contraseña
      const hashedPassword = await UserService.encryptPassword(newPassword);
      await userModel.updatePassword(user.id, hashedPassword);

      // Enviar correo con la nueva contraseña
      const subject = "Recuperación de contraseña";
      const message = `Hola ${user.nombre}, tu nueva contraseña es: ${newPassword} , inicia sesion y cambiala.`;
      await UserService.sendEmail(email, subject, message);

      res
        .status(200)
        .json({ message: "Correo enviado con la nueva contraseña" });
    } catch (error) {
      console.error("Error en recuperación de contraseña:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }

  static async changePass(req, res) {
    try {
      const { newPassword, id } = req.body;

      // Validación básica de entrada
      if (!newPassword || !id) {
        return res.status(400).json({ message: "Datos incompletos" });
      }

      const user = await userModel.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Encriptar nueva contraseña
      const hashedPassword = await UserService.encryptPassword(newPassword);

      // Actualizar contraseña en la base de datos
      await userModel.updatePassword(id, hashedPassword);

      return res
        .status(200)
        .json({ message: "Contraseña cambiada exitosamente" });
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}

module.exports = Auth;
