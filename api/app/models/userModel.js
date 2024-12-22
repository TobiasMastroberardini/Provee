const db = require("../../database/database");

class User {
  // Obtener todos los usuarios
  static async getAllUsers() {
    try {
      const query = "SELECT * FROM users";
      const { rows } = await db.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw new Error("Error al obtener los usuarios");
    }
  }

  // Obtener un usuario por ID
  static async getUserById(id) {
    try {
      const query = "SELECT * FROM users WHERE id = $1";
      const { rows } = await db.query(query, [id]);
      return rows[0]; // Retorna un único usuario si se encuentra
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw new Error("Error al obtener el usuario");
    }
  }

  // Obtener un usuario por email
  static async getUserByEmail(email) {
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const { rows } = await db.query(query, [email]);
      return rows[0]; // Retorna un único usuario si se encuentra
    } catch (error) {
      console.error("Error al obtener el usuario por email:", error);
      throw new Error("Error al obtener el usuario por email");
    }
  }

  // Crear un nuevo usuario
  static async createUser(data) {
    try {
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

      const query = `INSERT INTO users (${columns}) VALUES (${placeholders}) RETURNING *`;
      const { rows } = await db.query(query, values);
      return rows[0]; // Retorna el usuario creado
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      throw new Error("Error al crear el usuario");
    }
  }

  // Actualizar un usuario por ID
  static async updateUser(id, data) {
    try {
      const columns = Object.keys(data)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const values = Object.values(data);

      const query = `UPDATE users SET ${columns} WHERE id = $${
        values.length + 1
      } RETURNING *`;
      const { rows } = await db.query(query, [...values, id]);
      return rows[0]; // Retorna el usuario actualizado
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw new Error("Error al actualizar el usuario");
    }
  }

  // Eliminar un usuario por ID
  static async deleteUser(id) {
    try {
      const query = "DELETE FROM users WHERE id = $1 RETURNING *";
      const { rows } = await db.query(query, [id]);
      return rows[0]; // Retorna el usuario eliminado
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw new Error("Error al eliminar el usuario");
    }
  }

  // Actualizar la contraseña de un usuario
  static async updatePassword(userId, hashedPassword) {
    try {
      const query = "UPDATE users SET password = $1 WHERE id = $2 RETURNING *";
      const { rows } = await db.query(query, [hashedPassword, userId]);
      return rows[0]; // Retorna el usuario actualizado con la nueva contraseña
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      throw new Error("Error al actualizar la contraseña");
    }
  }
}

module.exports = User;
