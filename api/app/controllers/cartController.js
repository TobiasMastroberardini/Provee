const Cart = require("../models/cartModel");

class CartController {
  static async getAll(req, res) {
    try {
      const carts = await Cart.getAllCarts();
      return res.json(carts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener los carritos" });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const cart = await Cart.getCartById(id);
      if (cart.length === 0) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }
      return res.json(cart[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener el carrito" });
    }
  }

  static async getByUserId(req, res) {
    const { id } = req.params;
    try {
      const cart = await Cart.getCartByuserId(id);
      if (cart.length === 0) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }
      return res.json(cart[0]);
    } catch (error) {
      return req.status(500).json({ error: "Error al obtener carrito" });
    }
  }

  static async create(req, res) {
    const newCart = req.body;
    try {
      const result = await Cart.createCart(newCart);
      return res.status(201).json({ id: result.insertId, ...newCart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al crear el carrito" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const result = await Cart.updateCart(id, updatedData);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }
      return res.json({ message: "Carrito actualizado" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al actualizar el carrito" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await Cart.deleteCart(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }
      return res.json({ message: "Carrito eliminado" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al eliminar el carrito" });
    }
  }

  static async addCartItem(req, res) {
    const newItem = req.body;
    try {
      const result = await Cart.addCartItem(newItem);
      return res.status(201).json({ id: result.insertId, ...newItem });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error al agregar un producto al carrito" });
    }
  }

  static async deleteCartItem(req, res) {
    const { id } = req.params;
    try {
      const result = await Cart.deleteCartItem(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Item no encontrado" });
      }
      return res.json({ message: "Item eliminado" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al eliminar el item" });
    }
  }

  static async getCartItems(req, res) {
    const { id } = req.params;
    try {
      const items = await Cart.getCartItems(id);
      if (items.length === 0) {
        return res.status(404).json({ message: "No se encontraron items" });
      }
      return res.json({ items });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error para obtener items" });
    }
  }
}

module.exports = CartController;
