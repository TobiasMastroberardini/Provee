const mercadopago = require("mercadopago");
const cartModel = require("../models/cartModel");

// Asegúrate de que esta configuración se haga antes de utilizarla.
mercadopago.configure({
  access_token:
    process.env.MP_ACCESS_TOKEN ||
    "APP_USR-4538150663921858-120518-9431b9a170a8ffa2d329754a9a67fa36-313525372", // Usa process.env para manejar el Access Token de forma segura
});

const createPayment = async (req, res) => {
  try {
    console.log(1);

    const { user_id } = req.body; // Suponiendo que el user_id viene en el cuerpo de la solicitud
    console.log(2);

    // Obtener el ID del carrito
    const cartData = await cartModel.getCartIdByuserId(user_id);
    if (!cartData) {
      return res.status(404).json({ message: "Carrito no encontrado." });
    }

    const cart_id = cartData.id; // Asegúrate de usar `id`, ya que retornas `rows[0]`
    console.log("El cart_id: ", cart_id);

    // Obtener los items del carrito basado en cart_id
    const cartItems = await cartModel.getCartItems(cart_id);
    console.log(3);

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      console.log(4);
      return res.status(400).json({ message: "El carrito está vacío." });
    }

    console.log(5);

    // Preparar los items para Mercado Pago
    const items = cartItems.map((item) => ({
      title: item.productName, // Asegúrate de utilizar el nombre correcto del campo
      quantity: item.quantity,
      currency_id: "ARS",
      unit_price: parseFloat(item.price), // Asegúrate de que sea un número
    }));
    console.log(6);

    const preference = {
      items: items,
      back_urls: {
        success: "http://localhost:4200/home", // Cambia según tu aplicación
        failure: "http://localhost:4200/failure",
        pending: "http://localhost:4200/pending",
      },
      auto_return: "approved",
    };
    console.log(7);

    // Crear preferencia de pago
    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).send("Error al crear la preferencia");
  }
};

module.exports = {
  createPayment,
};
