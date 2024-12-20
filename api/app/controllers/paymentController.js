const mercadopago = require("mercadopago");
const cartModel = require("../models/cartModel");
const orderModel = require("../models/orderModel");

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
      title: item.name, // Asegúrate de utilizar el nombre correcto del campo
      quantity: item.quantity,
      currency_id: "ARS",
      unit_price: parseFloat(item.price), // Asegúrate de que sea un número
    }));
    console.log(6);

    const preference = {
      items: items,
      back_urls: {
        success: "http://localhost:3005/api/payment/success",
        failure: "http://localhost:4200/failuresape",
        pending: "http://localhost:4200/pending",
      },
      auto_return: "approved",
      external_reference: String(cart_id), // Convertir a string
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

const paymentSuccess = async (req, res) => {
  try {
    const { external_reference, status } = req.query;

    // Verificar que el estado sea aprobado
    if (status && status !== "approved") {
      return res.redirect("http://localhost:4200/failureenelstatus");
    }

    const cart_id = parseInt(external_reference, 10);

    // Obtener los items del carrito antes de vaciarlo
    const cartItems = await cartModel.getCartItems(cart_id);
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("El carrito está vacío o no tiene items válidos.");
    }

    // Obtener el user_id a partir del cart_id
    const user_id = await cartModel.getUserIdByCartId(cart_id);
    if (!user_id) {
      throw new Error("No se pudo obtener el user_id para el carrito.");
    }

    // Calcular el total de la orden, asegurando que 'price' sea un número
    const total = cartItems.reduce((sum, item) => {
      let price = item.price;

      // Asegurarse de que 'price' sea un número
      if (typeof price === "string") {
        price = parseFloat(price); // Convertirlo si es una cadena de texto
      }

      if (isNaN(price)) {
        throw new Error(
          `El precio del item con id ${item.productId} no es válido.`
        );
      }

      return sum + item.quantity * price; // Calcular el total
    }, 0);

    // Crear la orden
    const orderId = await orderModel.createOrder({
      user_id,
      total,
      estado: "pagado", // Ajustar según corresponda
      direccion_envio: "Dirección de ejemplo", // Ajustar según tu lógica
      metodo_pago: "tarjeta", // Ajustar según corresponda
    });

    // Crear los items de la orden
    for (const item of cartItems) {
      // Validación adicional para asegurarse de que los datos del item estén completos
      if (!item.product_id || !item.quantity || item.price === undefined) {
        console.error("Datos inválidos para el item del carrito:", item);
        throw new Error(
          "Los datos del carrito están incompletos o son inválidos."
        );
      }

      // Asegurarse de que 'price' sea un número
      let price = item.price;
      if (typeof price === "string") {
        price = parseFloat(price); // Convertirlo si es una cadena de texto
      }
      if (isNaN(price)) {
        console.error("Precio no válido para el item del carrito:", item);
        throw new Error("El precio del producto no es válido.");
      }

      // Verificar que la cantidad sea válida (número positivo)
      if (item.quantity <= 0 || isNaN(item.quantity)) {
        console.error("Cantidad no válida para el item del carrito:", item);
        throw new Error("La cantidad del producto no es válida.");
      }

      console.log("Creando order_item con datos:", {
        order_id: orderId,
        product_id: item.product_id,
        cantidad: item.quantity,
        precio_unitario: price, // Usar el precio convertido
      });

      await orderModel.createOrderItem({
        order_id: orderId,
        product_id: item.product_id,
        cantidad: item.quantity,
        precio_unitario: price, // Precio formateado
      });
    }

    // Vaciar el carrito después de crear la orden y los items
    const result = await cartModel.clearCart(cart_id);
    if (result) {
      console.log(`Carrito con ID ${cart_id} vaciado correctamente.`);
    } else {
      console.warn(`No se encontró el carrito con ID ${cart_id} para vaciar.`);
    }

    // Redirigir al frontend
    return res.redirect("http://localhost:4200/success");
  } catch (error) {
    console.error("Error al procesar el éxito del pago:", error);
    return res.redirect("http://localhost:4200/failure");
  }
};

module.exports = {
  createPayment,
  paymentSuccess,
};
