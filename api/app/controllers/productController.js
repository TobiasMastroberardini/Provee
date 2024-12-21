const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

class ProductController {
  static async getPaginatedProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
      const limit = parseInt(req.query.limit) || 12; // Límite por página, por defecto 12

      const result = await Product.getPaginatedProducts(page, limit);

      res.status(200).json({
        page,
        limit,
        totalPages: result.totalPages,
        totalProducts: result.totalProducts,
        data: result.data,
      });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ message: "Error al obtener productos" });
    }
  }

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
    const images = req.files; // Archivos subidos

    try {
      // Crear el producto
      const productId = await Product.createProduct(newProduct);

      // Guardar las imágenes si existen
      if (images && images.length > 0) {
        const imageUrls = images.map((file) => `/uploads/${file.filename}`);
        await Product.addProductImages(productId, imageUrls);
      }

      res.status(201).json({ id: productId, ...newProduct });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ message: "Error al crear el producto" });
    }
  }

  // Actualizar un producto existente
  // Actualizar un producto existente
  static async update(req, res) {
    const { id } = req.params;
    const updatedData = req.body; // Datos enviados en la solicitud
    const images = req.files; // Imágenes cargadas (si las hay)

    try {
      // Validar ID del producto
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID del producto no válido" });
      }

      // Validar datos obligatorios
      if (
        !updatedData.nombre ||
        !updatedData.precio ||
        !updatedData.cantidad_disponible
      ) {
        return res.status(400).json({
          message:
            "Faltan datos obligatorios (nombre, precio, cantidad_disponible)",
        });
      }

      // Actualizar los datos del producto
      const affectedRows = await Product.updateProduct(id, updatedData);

      if (affectedRows === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      // Manejar imágenes si se han enviado
      if (images && Array.isArray(images) && images.length > 0) {
        // Obtener las rutas de las nuevas imágenes
        const imageUrls = images.map((file) => `/uploads/${file.filename}`);

        // Eliminar imágenes existentes del producto
        await Product.deleteProductImages(id);

        // Insertar nuevas imágenes
        await Product.addProductImages(id, imageUrls);
      }

      res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);

      res.status(500).json({
        message: "Error al actualizar el producto",
        error: error.message,
      });
    }
  }

  // Eliminar un producto
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const images = await Product.deleteProductImages(id);
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
