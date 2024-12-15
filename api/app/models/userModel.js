const db = require("../../database/database");

class User {
  static async getAllUsers() {
    try {
      const [rows] = await db.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0]; // Retorna un único usuario si se encuentra
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0]; // Retorna un único usuario si se encuentra
    } catch (error) {
      throw error;
    }
  }

  static async createUser(data) {
    try {
      const [result] = await db.query("INSERT INTO users SET ?", data);
      return result; // Devuelve el resultado de la inserción
    } catch (error) {
      throw error; // Lanza el error para que el controlador lo maneje
    }
  }

  static async updateUser(id, data) {
    try {
      const [result] = await db.query("UPDATE users SET ? WHERE id = ?", [
        data,
        id,
      ]);
      return result; // Devuelve el resultado de la actualización
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
      return result; // Devuelve el resultado de la eliminación
    } catch (error) {
      throw error;
    }
  }

  static async updatePassword(userId, hashedPassword) {
    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);
  }
}

module.exports = User;
