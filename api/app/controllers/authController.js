const userModel = require("../models/userModel");
const Cart = require("../models/cartModel");
const HandleBcrypt = require("../middlewares/handleBcrypt");

class Auth {
  // Método para registrar un usuario
  static async registerCtrl(req, res) {
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

  static async loginCtrl(req, res) {
    const { email, password } = req.body;

    try {
      //Buscar el usuario por el email
      const user = await userModel.getUserByEmail({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Generar el token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Ajusta el tiempo de expiración según tus necesidades
      });

      //Responder con éxito y los datos necesarios
      return res.status(200).json({
        message: "Login exitoso",
        token,
        user: {
          id: user._id,
          email: user.email,
          // Agrega otros campos del usuario que desees devolver
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}

module.exports = Auth;
