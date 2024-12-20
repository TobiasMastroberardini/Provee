const OrderModel = require("../models/orderModel");

class OrderController {
  static async getAll(req, res) {
    try {
      const orders = await OrderModel.getAll();
      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener las órdenes" });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const order = await OrderModel.getById(id);
      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }
      return res.json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener la orden" });
    }
  }

  static async getOrderItems(req, res) {
    const { id } = req.params;
    try {
      const items = await OrderModel.getOrderItems(id);
      if (items.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron items para esta orden" });
      }
      return res.json(items);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error al obtener los items de la orden" });
    }
  }

  static async getOrderItemsByUser(req, res) {
    const { id } = req.params;
    try {
      const items = await OrderModel.getOrderItemsByUser(id);
      if (items.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron items para este usuario" });
      }
      return res.json(items);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error al obtener los items del usuario" });
    }
  }

  static async create(req, res) {
    const newOrder = req.body;
    try {
      const orderId = await OrderModel.create(newOrder);
      return res.status(201).json({ id: orderId, ...newOrder });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al crear la orden" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const updatedOrder = req.body;
    try {
      const success = await OrderModel.update(id, updatedOrder);
      if (!success) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }
      return res.json({ message: "Orden actualizada" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al actualizar la orden" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const success = await OrderModel.delete(id);
      if (!success) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }
      return res.json({ message: "Orden eliminada" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al eliminar la orden" });
    }
  }
}

module.exports = OrderController;
