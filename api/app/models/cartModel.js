const db = require("../../database/database");

class Cart {
  static async getAllCarts() {
    try {
      const [rows] = await db.query("SELECT * FROM cart");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getCartById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM cart WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getIdCartByUserId(user_id) {
    try {
      const [rows] = await db.query("SELECT id FROM cart WHERE user_id = ?", [
        user_id,
      ]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getCartByuserId(id) {
    try {
      const [rows] = await db.query("SELECT * FROM cart WHERE user_id = ?", [
        id,
      ]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async createCart(data) {
    try {
      const [result] = await db.query("INSERT INTO cart SET ?", data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateCart(id, data) {
    try {
      const [result] = await db.query("UPDATE cart SET ? WHERE id = ?", [
        data,
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCart(id) {
    try {
      const [result] = await db.query("DELETE FROM cart WHERE id = ?", [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async addCartItem(data) {
    try {
      const [result] = await db.query("INSERT INTO cart_items SET ?", data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCartItem(id) {
    try {
      const [result] = await db.query("DELETE FROM cart_items WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getCartItems(id) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM cart_items WHERE cart_id = ?",
        [id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getItemByProductId(id) {
    try {
      const [rows] = await db.query(
        "SELECR * FROM cart_items WHERE product_id = ? ",
        [id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateItems(id, quantity) {
    // Validaciones simples
    if (isNaN(id) || isNaN(quantity) || quantity < 0) {
      throw new Error(
        "ID y Cantidad deben ser números válidos y la cantidad no puede ser negativa"
      );
    }

    try {
      // Ejecutar la consulta de actualización
      const [result] = await db.query(
        "UPDATE cart_items SET quantity = ? WHERE id = ?",
        [quantity, id] // Asegúrate de utilizar "quantity" aquí
      );

      // Retornar resultado de la operación
      if (result.affectedRows === 0) {
        throw new Error(`No se encontró el item con ID ${id}`);
      }

      return result; // Aquí podrías devolver quizás un éxito o el resultado de la operación
    } catch (error) {
      console.error("Error al actualizar el item del carrito:", error);
      throw new Error(
        "Fallo al actualizar la cantidad del item, por favor intenta de nuevo"
      );
    }
  }

  static async updatePriceItem(product_id, price) {
    try {
      // Ejecutar la consulta de actualización
      const [result] = await db.query(
        "UPDATE cart_items SET price = ? WHERE product_id = ?",
        [price, product_id]
      );

      // Retornar resultado de la operación
      if (result.affectedRows === 0) {
        throw new Error(`No se encontró el item con product ID ${product_id}`);
      }

      return result; // Retorna información del resultado si es necesario
    } catch (error) {
      console.error("Error al actualizar el item del carrito:", error);
      throw new Error(
        "Fallo al actualizar el precio del item, por favor intenta de nuevo"
      );
    }
  }

  static async getCartIdByuserId(user_id) {
    try {
      const [rows] = await db.query("SELECT id FROM cart WHERE user_id = ?", [
        user_id,
      ]);
      return rows[0]; // Retorna el primer resultado (el ID del carrito)
    } catch (error) {
      throw error; // Maneja errores si la consulta falla
    }
  }
}

module.exports = Cart;
