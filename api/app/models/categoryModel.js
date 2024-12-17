const db = require("../../database/database");

class Category {
  static async getAllCategories() {
    try {
      const [rows] = await db.query("SELECT * FROM categories");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [
        id,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async createCategory(data) {
    try {
      const [result] = await db.query("INSERT INTO categories SET ?", data);
      return result.insertId; // Devuelve el ID del nuevo producto
    } catch (error) {
      throw error;
    }
  }

  static async updateCategory(id, data) {
    try {
      const [result] = await db.query("UPDATE categories SET ? WHERE id = ?", [
        data,
        id,
      ]);
      return result.affectedRows; // Devuelve el número de filas afectadas
    } catch (error) {
      throw error;
    }
  }

  static async deleteCategory(id) {
    try {
      await db.query("DELETE FROM categories WHERE id = ?", [id]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Category;
