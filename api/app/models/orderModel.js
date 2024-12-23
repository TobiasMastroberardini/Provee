const db = require("../../database/database");

class OrderModel {
  // Obtener todas las órdenes
  static async getAll() {
    try {
      const query = "SELECT * FROM orders";
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
      throw new Error("Error al obtener las órdenes");
    }
  }

  // Obtener una orden por ID
  static async getById(id) {
    try {
      const query = "SELECT * FROM orders WHERE id = $1";
      const { rows } = await db.query(query, [id]);
      return rows[0]; // Devuelve la primera orden si existe
    } catch (error) {
      console.error("Error al obtener la orden:", error);
      throw new Error("Error al obtener la orden");
    }
  }

  // Crear una nueva orden
  static async create({
    user_id,
    total,
    estado,
    direccion_envio,
    metodo_pago,
  }) {
    const query = `
      INSERT INTO orders (user_id, total, estado, direccion_envio, metodo_pago)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    try {
      const { rows } = await db.query(query, [
        user_id,
        total,
        estado,
        direccion_envio,
        metodo_pago,
      ]);
      return rows[0].id; // Retorna el ID de la orden creada
    } catch (error) {
      console.error("Error al crear la orden:", error);
      throw new Error("Error al crear la orden");
    }
  }

  // Crear los detalles de una orden
  static async createOrderItem({
    order_id,
    product_id,
    cantidad,
    precio_unitario,
  }) {
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
      VALUES ($1, $2, $3, $4)
    `;

    try {
      await db.query(query, [order_id, product_id, cantidad, precio_unitario]);
    } catch (error) {
      console.error("Error al insertar en order_items:", error);
      throw error;
    }
  }

  // Actualizar una orden por ID
  static async updateOrder(id, updatedData) {
    const columns = Object.keys(updatedData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = Object.values(updatedData);

    const query = `
      UPDATE orders
      SET ${columns}
      WHERE id = $${values.length + 1}
      RETURNING *
    `;

    try {
      const { rows } = await db.query(query, [...values, id]);
      return rows[0];
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      throw new Error("Error al actualizar la orden");
    }
  }

  // Eliminar una orden por ID
  static async deleteOrder(id) {
    try {
      const query = "DELETE FROM orders WHERE id = $1";
      const { rowCount } = await db.query(query, [id]);
      return rowCount; // Devuelve el número de filas eliminadas
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
        WHERE oi.order_id = $1
      `;
      const { rows } = await db.query(query, [order_id]);
      return rows;
    } catch (error) {
      console.error("Error al obtener los ítems de la orden:", error);
      throw new Error("Error al obtener los ítems de la orden");
    }
  }

  // Obtener órdenes de un usuario
  static async getOrderByUser(user_id) {
    try {
      const query = "SELECT * FROM orders WHERE user_id = $1";
      const { rows } = await db.query(query, [user_id]);
      return rows;
    } catch (error) {
      console.error("Error al obtener las órdenes por usuario:", error);
      throw new Error("Error al obtener las órdenes por usuario");
    }
  }

  // Método duplicado, lo eliminé para mantener claridad.
  // static async getOrdersByUser(user_id) { ... }
}

module.exports = OrderModel;
