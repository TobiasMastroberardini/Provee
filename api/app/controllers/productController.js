const Product = require("../models/productModel");

class ProductController {
  // Obtener todos los productos
  static async getAll(req, res) {
    try {
      const products = await Product.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ message: "Error al obtener productos" });
    }
  }

  // Obtener un producto por su ID
  static async getById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      res.status(500).json({ message: "Error al obtener el producto" });
    }
  }

  // Crear un nuevo producto
  static async create(req, res) {
    const newProduct = req.body;
    try {
      const productId = await Product.createProduct(newProduct);
      res.status(201).json({ id: productId, ...newProduct });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ message: "Error al crear el producto" });
    }
  }

  // Actualizar un producto existente
  static async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body;
    try {
      const affectedRows = await Product.updateProduct(id, updatedData);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json({ message: "Producto actualizado" });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      res.status(500).json({ message: "Error al actualizar el producto" });
    }
  }

  // Eliminar un producto
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const affectedRows = await Product.deleteProduct(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).json({ message: "Error al eliminar el producto" });
    }
  }

  static async getByConditions(req, res) {
    const conditions = req.query; // Obtener los filtros de la URL
    try {
      // Modificar condiciones de búsqueda para buscar coincidencias parciales en el nombre
      if (conditions.nombre) {
        conditions.nombre = `%${conditions.nombre}%`; // Añadir comodines a la búsqueda por nombre
      }

      const products = await Product.getProductsByCondition(conditions);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error al obtener productos con condiciones:", error);
      res.status(500).json({ message: "Error al obtener productos" });
    }
  }
}

module.exports = ProductController;
