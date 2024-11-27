const db = require('../../database/database');

class Category {
    static getAllCategories(callback) {
        db.query('SELECT * FROM categories', callback);
    }

    static getCategoryById(id, callback) {
        db.query('SELECT * FROM categories WHERE id = ?', [id], callback);
    }

    static createCategory(data, callback) {
        db.query('INSERT INTO categories SET ?', data, callback);
    }

    static updateCategory(id, data, callback) {
        db.query('UPDATE categories SET ? WHERE id = ?', [data, id], callback);
    }

    static deleteCategory(id, callback) {
        db.query('DELETE FROM categories WHERE id = ?', [id], callback);
    }
}

module.exports = Category;