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

  static async getCategoryByCondition(conditions) {
    try {
      // Base de la consulta
      let query = "SELECT * FROM categories";
      const values = [];

      // Añadir condiciones dinámicamente
      if (Object.keys(conditions).length > 0) {
        const whereClauses = Object.entries(conditions).map(([key, value]) => {
          if (key === "nombre") {
            // Asegurarse de que se agreguen los comodines '%' para una búsqueda parcial
            values.push(`%${value}%`); // Buscar coincidencias parciales
            return `${key} LIKE ?`; // Usar LIKE en lugar de '='
          }
          values.push(value);
          return `${key} = ?`;
        });
        query += " WHERE " + whereClauses.join(" AND ");
      }

      // Ejecutar la consulta para obtener los productos
      const [categories] = await db.query(query, values);

      return categories; // Devuelve los productos con sus imágenes
    } catch (error) {
      throw error; // Propaga el error al controlador
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
