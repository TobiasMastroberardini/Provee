const User = require("../models/userModel");

class UserController {
  static async getAll(req, res) {
    try {
      const users = await User.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener el usuario" });
    }
  }

  static async create(req, res) {
    const newUser = req.body;
    try {
      const result = await User.createUser(newUser);
      return res.status(201).json({ id: result.insertId, ...newUser });
    } catch (error) {
      return res.status(500).json({ error: "Error al crear el usuario" });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const result = await User.updateUser(id, updatedData);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.json({ message: "Usuario actualizado" });
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const result = await User.deleteUser(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.json({ message: "Usuario eliminado" });
    } catch (error) {
      return res.status(500).json({ error: "Error al eliminar el usuario" });
    }
  }
}

module.exports = UserController;
