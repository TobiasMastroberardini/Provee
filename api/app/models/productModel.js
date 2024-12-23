const db = require("../../database/database");

class Product {
  static async getPaginatedProducts(page, limit) {
    const offset = (page - 1) * limit;

    const query = `
    SELECT p.*, 
           c.nombre AS categoria_name, 
           COALESCE(json_agg(DISTINCT pi.imagen_url) FILTER (WHERE pi.imagen_url IS NOT NULL), '[]') AS images
    FROM products p
    LEFT JOIN categories c ON p.categoria_id = c.id
    LEFT JOIN product_images pi ON p.id = pi.product_id
    WHERE p.eliminado = false
    GROUP BY p.id, c.nombre
    LIMIT $1 OFFSET $2
  `;

    try {
      const { rows: products } = await db.query(query, [limit, offset]);

      // Consulta de conteo, ahora incluye la condición de eliminado = false
      const countQuery =
        "SELECT COUNT(*) AS total FROM products WHERE eliminado = false";
      const { rows: totalResult } = await db.query(countQuery);
      const totalProducts = parseInt(totalResult[0].total, 10);

      return {
        data: products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  static async getAllProducts() {
    const query = `
      SELECT p.*, c.nombre AS categoria_name,
             COALESCE(json_agg(DISTINCT pi.imagen_url) FILTER (WHERE pi.imagen_url IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN categories c ON p.categoria_id = c.id
      LEFT JOIN product_images pi ON p.id = pi.product_id
      GROUP BY p.id, c.nombre
    `;

    try {
      const { rows: products } = await db.query(query);
      return products;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(id) {
    const productQuery = "SELECT * FROM products WHERE id = $1";
    const imagesQuery =
      "SELECT imagen_url FROM product_images WHERE product_id = $1";

    try {
      const { rows: productRows } = await db.query(productQuery, [id]);

      if (productRows.length === 0) {
        return undefined;
      }

      const product = productRows[0];
      const { rows: imageRows } = await db.query(imagesQuery, [id]);

      product.images = imageRows.map((row) => row.imagen_url);
      return product;
    } catch (error) {
      throw error;
    }
  }

  static async createProduct(data) {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

    const query = `INSERT INTO products (${columns}) VALUES (${placeholders}) RETURNING id`;

    try {
      const { rows } = await db.query(query, values);
      return rows[0].id;
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(id, data) {
    const updates = Object.entries(data)
      .map(([key, _], index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = [...Object.values(data), id];

    const query = `UPDATE products SET ${updates} WHERE id = $${values.length}`;

    try {
      const { rowCount } = await db.query(query, values);
      return rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProduct(id) {
    const query = "DELETE FROM products WHERE id = $1";

    try {
      const { rowCount } = await db.query(query, [id]);
      return rowCount;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProductImages(productId) {
    const query = "DELETE FROM product_images WHERE product_id = $1";

    try {
      await db.query(query, [productId]);
    } catch (error) {
      throw error;
    }
  }

  static async addProductImages(productId, imageUrls) {
    const values = imageUrls
      .map((url, index) => `($1, $${index + 2})`)
      .join(", ");
    const query = `INSERT INTO product_images (product_id, imagen_url) VALUES ${values}`;

    try {
      await db.query(query, [productId, ...imageUrls]);
    } catch (error) {
      throw error;
    }
  }

  static async getProductsByCondition(conditions) {
    let query = "SELECT * FROM products";
    const values = [];

    query += " WHERE eliminado = false";
    if (Object.keys(conditions).length > 0) {
      const whereClauses = Object.entries(conditions).map(
        ([key, value], index) => {
          if (key === "nombre") {
            values.push(`%${value}%`);
            return `${key} ILIKE $${index + 1}`;
          } else {
            values.push(value);
            return `${key} = $${index + 1}`;
          }
        }
      );
      query += " AND " + whereClauses.join(" AND ");
    }

    try {
      const { rows: products } = await db.query(query, values);

      const { rows: images } = await db.query("SELECT * FROM product_images");

      // Mapear productos con sus imágenes
      return products.map((product) => ({
        ...product,
        images: images
          .filter((image) => image.product_id === product.id)
          .map((image) => image.imagen_url),
      }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
