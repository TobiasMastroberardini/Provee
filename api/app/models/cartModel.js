const pool = require("../../database/database");

class Cart {
  static async getAllCarts() {
    try {
      const result = await pool.query("SELECT * FROM cart");
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getCartById(id) {
    try {
      const result = await pool.query("SELECT * FROM cart WHERE id = $1", [id]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getIdCartByUserId(user_id) {
    try {
      const result = await pool.query(
        "SELECT id FROM cart WHERE user_id = $1",
        [user_id]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getCartByuserId(id) {
    try {
      const result = await pool.query("SELECT * FROM cart WHERE user_id = $1", [
        id,
      ]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async createCart(client, data) {
    try {
      if (!data.user_id || typeof data.user_id !== "number") {
        throw new Error("El ID del usuario debe ser un número válido.");
      }

      const query = `
      INSERT INTO cart (user_id, created_at, updated_at, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;

      const { rows } = await client.query(query, [
        data.user_id,
        data.created_at,
        data.updated_at,
        data.status,
      ]);

      return rows[0]; // Retorna el carrito recién creado
    } catch (error) {
      throw error;
    }
  }

  static async updateCart(id, data) {
    try {
      const result = await pool.query(
        "UPDATE cart SET user_id = $1, updated_at = $2 WHERE id = $3 RETURNING *",
        [data.user_id, data.updated_at, id]
      );
      return result.rows[0]; // Retorna el carrito actualizado
    } catch (error) {
      throw error;
    }
  }

  static async deleteCart(id) {
    try {
      const result = await pool.query("DELETE FROM cart WHERE id = $1", [id]);
      return result.rowCount; // Devuelve el número de filas afectadas
    } catch (error) {
      throw error;
    }
  }

  static async addCartItem(data) {
    try {
      const result = await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity, price, name) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [data.cart_id, data.product_id, data.quantity, data.price, data.name]
      );
      return result.rows[0]; // Retorna el nuevo item del carrito
    } catch (error) {
      throw error;
    }
  }

  static async deleteCartItem(id) {
    try {
      const result = await pool.query("DELETE FROM cart_items WHERE id = $1", [
        id,
      ]);
      return result.rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async clearCart(cart_id) {
    try {
      const result = await pool.query(
        "DELETE FROM cart_items WHERE cart_id = $1",
        [cart_id]
      );
      return result.rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async getCartItems(id) {
    try {
      const result = await pool.query(
        "SELECT * FROM cart_items WHERE cart_id = $1",
        [id]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getItemByProductId(id) {
    try {
      const result = await pool.query(
        "SELECT * FROM cart_items WHERE product_id = $1",
        [id]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateItemQuantity(item_id, quantity) {
    try {
      const result = await pool.query(
        "UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *",
        [quantity, item_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async updatePriceItem(product_id, price) {
    try {
      const result = await pool.query(
        "UPDATE cart_items SET price = $1 WHERE product_id = $2 RETURNING *",
        [price, product_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getCartIdByuserId(user_id) {
    try {
      const result = await pool.query(
        "SELECT id FROM cart WHERE user_id = $1 LIMIT 1",
        [user_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getItemByProductIdAndCartId(product_id, cart_id) {
    try {
      const result = await pool.query(
        "SELECT * FROM cart_items WHERE product_id = $1 AND cart_id = $2",
        [product_id, cart_id]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getUserIdByCartId(id) {
    try {
      const result = await pool.query(
        "SELECT user_id FROM cart WHERE id = $1",
        [id]
      );
      return result.rows[0].user_id;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCartItembyProductId(id) {
    try {
      const result = await pool.query(
        "DELETE FROM cart_items WHERE product_id = $1",
        [id]
      );
      return result.rowCount;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Cart;
