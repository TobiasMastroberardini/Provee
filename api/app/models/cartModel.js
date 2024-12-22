const db = require("../../database/database");

class Cart {
  static async getAllCarts() {
    try {
      const { rows } = await db.query("SELECT * FROM cart");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getCartById(id) {
    try {
      const { rows } = await db.query("SELECT * FROM cart WHERE id = $1", [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getIdCartByUserId(user_id) {
    try {
      const { rows } = await db.query(
        "SELECT id FROM cart WHERE user_id = $1",
        [user_id]
      );
      return rows.map((row) => row.id); // Devuelve una lista de IDs
    } catch (error) {
      throw error;
    }
  }

  static async getCartByuserId(user_id) {
    try {
      const { rows } = await db.query("SELECT * FROM cart WHERE user_id = $1", [
        user_id,
      ]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async createCart(data) {
    try {
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
      const query = `INSERT INTO cart (${columns}) VALUES (${placeholders}) RETURNING *`;

      const { rows } = await db.query(query, values);
      return rows[0]; // Retorna el carrito recién creado
    } catch (error) {
      throw error;
    }
  }

  static async updateCart(id, data) {
    try {
      const updates = Object.entries(data)
        .map(([key, _], index) => `${key} = $${index + 1}`)
        .join(", ");
      const values = [...Object.values(data), id];

      const query = `UPDATE cart SET ${updates} WHERE id = $${values.length} RETURNING *`;
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async deleteCart(id) {
    try {
      const { rowCount } = await db.query("DELETE FROM cart WHERE id = $1", [
        id,
      ]);
      return rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async addCartItem(data) {
    try {
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
      const query = `INSERT INTO cart_items (${columns}) VALUES (${placeholders}) RETURNING *`;

      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async deleteCartItem(id) {
    try {
      const { rowCount } = await db.query(
        "DELETE FROM cart_items WHERE id = $1",
        [id]
      );
      return rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async clearCart(cart_id) {
    try {
      const { rowCount } = await db.query(
        "DELETE FROM cart_items WHERE cart_id = $1",
        [cart_id]
      );
      return rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async getCartItems(cart_id) {
    try {
      const { rows } = await db.query(
        "SELECT * FROM cart_items WHERE cart_id = $1",
        [cart_id]
      );
      return rows.map((item) => ({
        ...item,
        price: parseFloat(item.price),
      }));
    } catch (error) {
      throw error;
    }
  }

  static async getItemByProductId(product_id) {
    try {
      const { rows } = await db.query(
        "SELECT * FROM cart_items WHERE product_id = $1",
        [product_id]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async updateItems(id, quantity) {
    try {
      const { rowCount } = await db.query(
        "UPDATE cart_items SET quantity = $1 WHERE id = $2",
        [quantity, id]
      );
      if (rowCount === 0)
        throw new Error(`No se encontró el item con ID ${id}`);
      return rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async updatePriceItem(product_id, price) {
    try {
      const { rowCount } = await db.query(
        "UPDATE cart_items SET price = $1 WHERE product_id = $2",
        [price, product_id]
      );
      if (rowCount === 0)
        throw new Error(`No se encontró el producto con ID ${product_id}`);
      return rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async getCartIdByuserId(user_id) {
    try {
      const { rows } = await db.query(
        "SELECT id FROM cart WHERE user_id = $1",
        [user_id]
      );
      return rows[0]?.id || null; // Devuelve el ID del carrito o null si no existe
    } catch (error) {
      throw error;
    }
  }

  static async updateItemQuantity(item_id, quantity) {
    try {
      const { rowCount } = await db.query(
        "UPDATE cart_items SET quantity = $1 WHERE id = $2",
        [quantity, item_id]
      );
      return rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async getItemByProductIdAndCartId(product_id, cart_id) {
    try {
      const { rows } = await db.query(
        "SELECT * FROM cart_items WHERE product_id = $1 AND cart_id = $2",
        [product_id, cart_id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getUserIdByCartId(id) {
    try {
      const { rows } = await db.query(
        "SELECT user_id FROM cart WHERE id = $1",
        [id]
      );
      return rows[0]?.user_id || null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Cart;
