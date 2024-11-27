const Order = require('../models/orderModel');

class OrderController {
    static getAll(req, res) {
        Order.getAllOrders((error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            return res.json(results);
        });
    }

    static getById(req, res) {
        const { id } = req.params;
        Order.getOrderById(id, (error, results) => {
            if (error) {
                return res.status(500).json({ error });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }
            return res.json(results[0]);
        });
    }

    static create(req, res) {
        const newOrder = req.body;
        Order.createOrder(newOrder, (error, result) => {
            if (error) {
                return res.status(500).json({ error });
            }
            return res.status(201).json({ id: result.insertId, ...newOrder });
        });
    }

    static update(req, res) {
        const { id } = req.params;
        const updatedData = req.body;

        Order.updateOrder(id, updatedData, (error, result) => {
            if (error) {
                return res.status(500).json({ error });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }
            return res.json({ message: 'Pedido actualizado' });
        });
    }

    static delete(req, res) {
        const { id } = req.params;

        Order.deleteOrder(id, (error, result) => {
            if (error) {
                return res.status(500).json({ error });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }
            return res.json({ message: 'Pedido eliminado' });
        });
    }
}

module.exports = OrderController;