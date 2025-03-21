const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

// All cart routes require authentication
router.use(auth);

// Get cart items
router.get('/', cartController.getCart);

// Add item to cart
router.post('/add', cartController.addToCart);

// Update cart item quantity
router.put('/update/:itemId', cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:itemId', cartController.removeFromCart);

// Clear cart
router.delete('/clear', cartController.clearCart);

module.exports = router; 