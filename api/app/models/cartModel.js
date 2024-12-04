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

  static async updateItems(id) {
    try {
      const [result] = await db.query("UPDATE cart_items SET ? WHERE id = ?", [
        data,
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Cart;
