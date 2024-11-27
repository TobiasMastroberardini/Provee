const db = require("../../database/database");

class Product {
  // Obtener todos los productos
  static async getAllProducts() {
    try {
      const [rows] = await db.query("SELECT * FROM products");
      return rows; // Devuelve los productos
    } catch (error) {
      throw error; // Propaga el error al controlador
    }
  }

  // Obtener un producto por su ID
  static async getProductById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
        id,
      ]);
      return rows[0]; // Devuelve el primer resultado o undefined si no existe
    } catch (error) {
      throw error;
    }
  }

  // Crear un producto nuevo
  static async createProduct(data) {
    try {
      const [result] = await db.query("INSERT INTO products SET ?", data);
      return result.insertId; // Devuelve el ID del nuevo producto
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un producto por su ID
  static async updateProduct(id, data) {
    try {
      const [result] = await db.query("UPDATE products SET ? WHERE id = ?", [
        data,
        id,
      ]);
      return result.affectedRows; // Devuelve el número de filas afectadas
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un producto por su ID
  static async deleteProduct(id) {
    try {
      const [result] = await db.query("DELETE FROM products WHERE id = ?", [
        id,
      ]);
      return result.affectedRows; // Devuelve el número de filas afectadas
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
