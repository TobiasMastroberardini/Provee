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

  static async create(req, res) {
    const category = req.body;

    try {
      // Crear el producto
      const categoryId = await Category.createCategory(category);

      res.status(201).json({ id: categoryId, ...category });
    } catch (error) {
      console.error("Error al crear la categoria:", error);
      res.status(500).json({ message: "Error al crear la categoria" });
    }
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
