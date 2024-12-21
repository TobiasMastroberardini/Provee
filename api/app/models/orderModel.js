const db = require("../../database/database");

class OrderModel {
  // Obtener todas las órdenes
  static async getAll() {
    try {
      const query = "SELECT * FROM orders";
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      throw new Error("Error al obtener las órdenes");
    }
  }

  // Obtener una orden por ID
  static async getById(id) {
    try {
      const query = "SELECT * FROM orders WHERE id = ?";
      const [rows] = await db.query(query, [id]);
      return rows;
    } catch (error) {
      console.error("Error al obtener la orden:", error);
      throw new Error("Error al obtener la orden");
    }
  }
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
    // Validar que todos los parámetros sean válidos
    if (
      !order_id ||
      !product_id ||
      cantidad === undefined ||
      precio_unitario === undefined
    ) {
      throw new Error(
        `Parámetros inválidos: order_id=${order_id}, product_id=${product_id}, cantidad=${cantidad}, precio_unitario=${precio_unitario}`
      );
    }

    const query = `
    INSERT INTO order_items (order_id, product_id, cantidad, precio_unitario)
    VALUES (?, ?, ?, ?)
  `;

    try {
      await db.execute(query, [
        order_id,
        product_id,
        cantidad,
        precio_unitario,
      ]);
    } catch (error) {
      console.error("Error al insertar en order_items:", error);
      throw error;
    }
  }

  // Actualizar una orden por ID
  static async updateOrder(id, updatedData) {
    try {
      const query = `
        UPDATE orders
        SET ?
        WHERE id = ?
      `;
      const [result] = await db.query(query, [updatedData, id]);
      return result;
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      throw new Error("Error al actualizar la orden");
    }
  }

  // Eliminar una orden por ID
  static async deleteOrder(id) {
    try {
      const query = "DELETE FROM orders WHERE id = ?";
      const [result] = await db.query(query, [id]);
      return result;
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
      throw new Error("Error al eliminar la orden");
    }
  }
  // Obtener los ítems de una orden por ID
  static async getOrderItems(order_id) {
    try {
      const query = `
      SELECT oi.*, p.nombre AS product_name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?`;

      const [rows] = await db.query(query, [order_id]);
      return rows;
    } catch (error) {
      console.error("Error al obtener los ítems de la orden:", error);
      throw new Error("Error al obtener los ítems de la orden");
    }
  }

  // Obtener ítems de una orden por usuario
  static async getOrderByUser(user_id) {
    try {
      const query = "SELECT * FROM orders WHERE user_id = ?";
      const [rows] = await db.query(query, [user_id]);
      return rows;
    } catch (error) {
      console.error("Error al obtener los ítems por usuario:", error);
      throw new Error("Error al obtener los ítems por usuario");
    }
  }

  static async getOrdersByUser($user_id) {}
}

module.exports = OrderModel;
