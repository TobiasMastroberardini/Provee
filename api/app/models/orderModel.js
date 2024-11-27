const db = require('../../database/database');

class Order {
    static getAllOrders(callback) {
        db.query('SELECT * FROM orders', callback);
    }

    static getOrderById(id, callback) {
        db.query('SELECT * FROM orders WHERE id = ?', [id], callback);
    }

    static createOrder(data, callback) {
        db.query('INSERT INTO orders SET ?', data, callback);
    }

    static updateOrder(id, data, callback) {
        db.query('UPDATE orders SET ? WHERE id = ?', [data, id], callback);
    }

    static deleteOrder(id, callback) {
        db.query('DELETE FROM orders WHERE id = ?', [id], callback);
    }
}

module.exports = Order;