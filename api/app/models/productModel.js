const db = require("../../database/database");

class Product {
  static async getAllProducts() {
    try {
      // Consulta para obtener todos los productos
      const [products] = await db.query("SELECT * FROM products");

      // Consulta para obtener todas las imágenes
      const [images] = await db.query("SELECT * FROM product_images");

      // Añadir imágenes a sus productos correspondientes
      const productsWithImages = products.map((product) => {
        const productImages = images
          .filter((image) => image.product_id === product.id)
          .map((image) => image.imagen_url); // Cambia a imagen_url
        return { ...product, images: productImages };
      });

      return productsWithImages; // Devuelve los productos con sus imágenes
    } catch (error) {
      throw error; // Propaga el error al controlador
    }
  }

  // Y en el método getProductById
  static async getProductById(id) {
    try {
      // Consulta para obtener el producto
      const [productRows] = await db.query(
        "SELECT * FROM products WHERE id = ?",
        [id]
      );

      // Si no se encuentra el producto, devolver undefined
      if (productRows.length === 0) {
        return undefined;
      }

      const product = productRows[0];

      // Consulta para obtener las imágenes del producto
      const [imageRows] = await db.query(
        "SELECT imagen_url FROM product_images WHERE product_id = ?",
        [id] // Cambiado de product_id a id
      );

      // Añadir las imágenes al producto
      product.images = imageRows.map((row) => row.imagen_url); // Cambia a imagen_url

      return product; // Devuelve el producto con las imágenes asociadas
    } catch (error) {
      throw error;
    }
  }
  // Crear un producto nuevo
  static async createProduct(data) {
    try {
      const [result] = await db.query("INSERT INTO products SET ?", data);
      return result.insertId; // Devuelve el ID del nuevo producto
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(id, data) {
    try {
      const [result] = await db.query("UPDATE products SET ? WHERE id = ?", [
        data,
        id,
      ]);
      return result.affectedRows; // Devuelve el número de filas afectadas
    } catch (error) {
      throw error;
    }
  }

  // Eliminar las imágenes de un producto
  static async deleteProductImages(productId) {
    try {
      await db.query("DELETE FROM product_images WHERE product_id = ?", [
        productId,
      ]);
    } catch (error) {
      throw error;
    }
  }

  // Agregar imágenes a un producto
  static async addProductImages(productId, imageUrls) {
    try {
      const values = imageUrls.map((url) => [productId, url]);
      await db.query(
        "INSERT INTO product_images (product_id, imagen_url) VALUES ?",
        [values]
      );
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un producto por su ID
  static async deleteProduct(id) {
    try {
      const [result] = await db.query("DELETE FROM products WHERE id = ?", [
        id,
      ]);
      return result.affectedRows; // Devuelve el número de filas afectadas
    } catch (error) {
      throw error;
    }
  }

  static async getProductsByCondition(conditions) {
    try {
      // Base de la consulta
      let query = "SELECT * FROM products";
      const values = [];

      // Añadir condiciones dinámicamente
      if (Object.keys(conditions).length > 0) {
        const whereClauses = Object.entries(conditions).map(([key, value]) => {
          if (key === "nombre") {
            // Asegurarse de que se agreguen los comodines '%' para una búsqueda parcial
            values.push(`%${value}%`); // Buscar coincidencias parciales
            return `${key} LIKE ?`; // Usar LIKE en lugar de '='
          }
          values.push(value);
          return `${key} = ?`;
        });
        query += " WHERE " + whereClauses.join(" AND ");
      }

      // Ejecutar la consulta para obtener los productos
      const [products] = await db.query(query, values);

      // Consulta para obtener todas las imágenes
      const [images] = await db.query("SELECT * FROM product_images");

      // Añadir imágenes a sus productos correspondientes
      const productsWithImages = products.map((product) => {
        const productImages = images
          .filter((image) => image.product_id === product.id)
          .map((image) => image.imagen_url); // Cambia a imagen_url
        return { ...product, images: productImages };
      });

      return productsWithImages; // Devuelve los productos con sus imágenes
    } catch (error) {
      throw error; // Propaga el error al controlador
    }
  }
}

module.exports = Product;
