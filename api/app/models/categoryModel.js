const db = require("../../database/database");

class Category {
  static async getAllCategories() {
    try {
      const { rows } = await db.query("SELECT * FROM categories");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryById(id) {
    try {
      const { rows } = await db.query(
        "SELECT * FROM categories WHERE id = $1",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryByCondition(conditions) {
    try {
      let query = "SELECT * FROM categories";
      const values = [];

      if (Object.keys(conditions).length > 0) {
        const whereClauses = Object.entries(conditions).map(
          ([key, value], index) => {
            if (key === "nombre") {
              values.push(`%${value}%`);
              return `${key} LIKE $${index + 1}`;
            }
            values.push(value);
            return `${key} = $${index + 1}`;
          }
        );
        query += " WHERE " + whereClauses.join(" AND ");
      }

      const { rows } = await db.query(query, values);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async createCategory(data) {
    try {
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data);
      const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

      const query = `INSERT INTO categories (${columns}) VALUES (${placeholders}) RETURNING id`;

      const { rows } = await db.query(query, values);
      return rows[0].id; // Devuelve el ID de la nueva categoría
    } catch (error) {
      throw error;
    }
  }

  static async updateCategory(id, data) {
    try {
      const updates = Object.entries(data)
        .map(([key, _], index) => `${key} = $${index + 1}`)
        .join(", ");
      const values = [...Object.values(data), id];

      const query = `UPDATE categories SET ${updates} WHERE id = $${values.length}`;
      const { rowCount } = await db.query(query, values);

      return rowCount; // Devuelve el número de filas afectadas
    } catch (error) {
      throw error;
    }
  }

  static async deleteCategory(id) {
    try {
      const { rowCount } = await db.query(
        "DELETE FROM categories WHERE id = $1",
        [id]
      );
      return rowCount; // Devuelve el número de filas afectadas
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Category;
