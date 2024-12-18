const db = require("../../database/database");

class OrderModel {
  // Función estática para crear la orden
  static async createOrder({
    user_id,
    total,
    estado,
    direccion_envio,
    metodo_pago,
  }) {
    const query = `
      INSERT INTO orders (user_id, total, estado, direccion_envio, metodo_pago)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      user_id,
      total,
      estado,
      direccion_envio,
      metodo_pago,
    ]);
    return result.insertId; // Retorna el ID de la orden creada
  }

  // Función estática para crear los detalles de la orden
  static async createOrderItem({
    order_id,
    product_id,
    cantidad,
    precio_unitario,
  }) {
    const query = `
      INSERT INTO order_items (order_id, product_id, cantidad, precio_unitario)
      VALUES (?, ?, ?, ?)
    `;
    await db.execute(query, [order_id, product_id, cantidad, precio_unitario]);
  }
}

module.exports = OrderModel;
