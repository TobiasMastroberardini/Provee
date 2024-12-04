const Category = require("../models/categoryModel");

class CategoryController {
  static async getAll(req, res) {
    try {
      const categories = await Category.getAllCategories();
      return res.json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener las categorias" });
    }
  }

  static getById(req, res) {
    const { id } = req.params;
    Category.getCategoryById(id, (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      return res.json(results[0]);
    });
  }

  static create(req, res) {
    const newCategory = req.body;
    Category.createCategory(newCategory, (error, result) => {
      if (error) {
        return res.status(500).json({ error });
      }
      return res.status(201).json({ id: result.insertId, ...newCategory });
    });
  }

  static update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    Category.updateCategory(id, updatedData, (error, result) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      return res.json({ message: "Categoría actualizada" });
    });
  }

  static delete(req, res) {
    const { id } = req.params;

    Category.deleteCategory(id, (error, result) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      return res.json({ message: "Categoría eliminada" });
    });
  }
}

module.exports = CategoryController;
