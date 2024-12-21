const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

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

  static async delete(req, res) {
    try {
      const { id } = req.params;
      // Eliminar la categoría
      const result = await Category.deleteCategory(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      return res.json({ message: "Categoría eliminada" });
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async getByFilter(req, res) {
    const conditions = req.query; // Obtener los filtros de la URL
    try {
      // Modificar condiciones de búsqueda para buscar coincidencias parciales en el nombre
      if (conditions.nombre) {
        conditions.nombre = `%${conditions.nombre}%`; // Añadir comodines a la búsqueda por nombre
      }

      const categories = await Category.getCategoryByCondition(conditions);
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error al obtener las Categorias con condiciones:", error);
      res.status(500).json({ message: "Error al obtener categorias" });
    }
  }
}

module.exports = CategoryController;
