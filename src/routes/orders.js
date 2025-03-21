const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Create order
router.post('/', auth, async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        // Get user's cart
        const cart = await Cart.findOne({ user: req.user._id })
            .populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total
        const total = cart.items.reduce((acc, item) => {
            return acc + (item.product.price * item.quantity);
        }, 0);

        // Create order
        const order = new Order({
            user: req.user._id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),
            shippingAddress,
            paymentMethod,
            total
        });

        await order.save();

        // Clear cart
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
});

// Get user's orders
router.get('/myorders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product')
            .sort('-createdAt');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if user owns the order
        if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
});

// Update order status (admin only)
router.put('/:id/status', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
});

// Get all orders (admin only)
router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product')
            .sort('-createdAt');

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

module.exports = router; 