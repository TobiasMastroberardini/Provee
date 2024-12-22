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
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const userId = await Cart.getIdCartByUserId(id);
      const cart = await Cart.getCartByuserId(userId);
      if (cart.length === 0) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }
      return res.json(cart[0]);
    } catch (error) {
      return req.status(500).json({ error: "Error al obtener carrito" });
    }
  }

  static async getIdCartByUser(req, res) {
    const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la solicitud
    try {
      const cart = await Cart.getIdCartByUserId(id); // Obtener el carrito por ID de usuario
      if (cart.length === 0) {
        return res.sendStatus(404); // Enviar 404 si no hay carrito
      }

      // Enviar el ID del carrito encontrado como un número, en lugar de un JSON
      return res.send(cart[0].id.toString()); // Enviar el ID como respuesta (convertido a string)
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener carrito" }); // Enviar 500 en caso de error
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
    const { product_id, quantity, price, name, userId } = req.body;
    try {
      // Obtener el cartId usando el userId
      const cart = await Cart.getIdCartByUserId(userId);
      if (!cart || cart.length === 0) {
        return res.status(404).json({ message: "Carrito no encontrado" });
      }

      const cartId = cart[0].id;

      // Verificar si el item ya existe en el carrito
      const existingItem = await Cart.getItemByProductIdAndCartId(
        product_id,
        cartId
      );
      if (existingItem.length > 0) {
        // Si el item ya existe, actualizar la cantidad
        const newQuantity = existingItem[0].quantity + quantity;
        await Cart.updateItemQuantity(existingItem[0].id, newQuantity);
        return res.status(200).json({
          message: "Cantidad actualizada",
          id: existingItem[0].id,
          quantity: newQuantity,
        });
      }

      // Si el item no existe, agregarlo al carrito
      const newItem = {
        cart_id: cartId,
        product_id,
        quantity,
        price,
        name,
      };

      // Agregar el producto al carrito
      const result = await Cart.addCartItem(newItem);

      // Responder con el nuevo item
      return res.status(201).json({ id: result.insertId, ...newItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Error al agregar un producto al carrito",
      });
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
    const { id } = req.params; // ID del usuario
    try {
      // Obtener el cartId usando el userId
      const cart = await Cart.getIdCartByUserId(id);
      if (!cart || cart.length === 0) {
        return res
          .status(404)
          .json({ message: "Carrito no encontrado para este usuario" });
      }

      const cartId = cart[0].id; // Suponiendo que 'cart' es un array, accedemos al primer elemento.

      // Obtener los items del carrito usando el cartId
      const items = await Cart.getCartItems(cartId);

      // Verificar si el carrito tiene items
      if (items.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron items en el carrito" });
      }

      // Enviar los items encontrados
      return res.json(items);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Error al obtener los items del carrito" });
    }
  }

  static async getItemByProductId(req, res) {
    const { id } = req.params;
    try {
      const item = await Cart.getItemByProductId(id);
      if (item.length === 0) {
        return res.status(400).json({ message: "No se encontro item" });
      }
      return res.json(item);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error para obtener item" });
    }
  }

  static async updateItems(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    // Validación del ID
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Validación de datos actualizados, por ejemplo asegurando que hay un campo "quantity"
    if (typeof updatedData.quantity !== "number" || updatedData.quantity < 0) {
      return res
        .status(400)
        .json({ message: "Cantidad debe ser un número no negativo" });
    }

    try {
      const result = await Cart.updateItems(id, updatedData.quantity);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Item no encontrado" });
      }

      return res.json({ message: "Item actualizado", data: updatedData });
    } catch (error) {
      console.error("Error al actualizar item:", error);
      return res.status(500).json({
        error: "Error interno del servidor. No se pudo actualizar el item.",
      });
    }
  }
}

module.exports = CartController;
