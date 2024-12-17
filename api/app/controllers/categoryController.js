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

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Categoria no encontrada" });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error("Error al obtener la categoria:", error);
      res.status(500).json({ message: "Error al obtener la categoria" });
    }
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

  static async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      console.log("el id recibido en el back: ", id);
      const result = await Category.updateCategory(id, updatedData);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categoria no encontrado" });
      }
      return res.json({ message: "Categoria actualizado" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al actualizar la categoria" });
    }
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
