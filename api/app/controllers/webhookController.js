const axios = require("axios");
const OrderModel = require("../models/orderModel");
const cartModel = require("../models/cartModel");

const handleWebhook = async (req, res) => {
  try {
    const { topic, id } = req.query;
    const { type, data } = req.body;

    if (topic === "merchant_order" && id) {
      // Obtener información de la Merchant Order
      const orderResponse = await axios.get(
        `https://api.mercadopago.com/merchant_orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }
      );

      const merchantOrder = orderResponse.data;

      // Verifica si la orden fue pagada
      if (merchantOrder.order_status === "paid") {
        // Procesar detalles del pago
        const payment = merchantOrder.payments.find(
          (pay) => pay.status === "approved"
        );

        if (payment) {
          // Lógica para guardar la orden en la base de datos
          await procesarOrden(merchantOrder, payment);
        }
      }
    } else if (type === "payment" && data.id) {
      // Obtener información del pago
      const paymentResponse = await axios.get(
        `https://api.mercadopago.com/v1/payments/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }
      );

      const paymentInfo = paymentResponse.data;

      if (paymentInfo.status === "approved") {
        // Aquí puedes llamar a la función para manejar la orden
        await procesarOrdenDirecta(paymentInfo);
      }
    } else {
      return res.status(400).send("Evento no manejado");
    }

    res.sendStatus(200); // Confirmar recepción del webhook
  } catch (error) {
    console.error("Error al procesar el webhook:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Función auxiliar para procesar la orden
const procesarOrden = async (merchantOrder, payment) => {
  const cartId = merchantOrder.external_reference; // Obtener carrito del external_reference
  if (!cartId) {
    console.error("No se encontró el carrito asociado.");
    return;
  }

  // Obtener carrito y sus items
  const cartItems = await cartModel.getCartItems(cartId);
  if (!cartItems || cartItems.length === 0) {
    console.error("El carrito está vacío o no existe.");
    return;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Crear orden en la base de datos
  const orderId = await OrderModel.createOrder({
    user_id: merchantOrder.payer?.id || null,
    total,
    estado: "pagado",
    direccion_envio: "Dirección no especificada",
    metodo_pago: "tarjeta",
  });

  // Guardar detalles de la orden
  for (const item of cartItems) {
    await OrderModel.createOrderItem({
      order_id: orderId,
      product_id: item.product_id,
      cantidad: item.quantity,
      precio_unitario: item.price,
    });
  }
};

module.exports = { handleWebhook };
