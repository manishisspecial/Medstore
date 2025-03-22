const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

// Get cart page (public route)
router.get('/', (req, res) => {
    // For now, we'll use a mock cart
    const mockCart = {
        items: [
            {
                id: 1,
                name: 'Vitamin C',
                price: 199,
                quantity: 2,
                image: 'https://via.placeholder.com/200'
            },
            {
                id: 2,
                name: 'First Aid Kit',
                price: 499,
                quantity: 1,
                image: 'https://via.placeholder.com/200'
            }
        ],
        subtotal: 897 // 199 * 2 + 499
    };

    res.render('cart', {
        title: 'Shopping Cart - MedStore',
        cart: mockCart,
        user: req.user || null
    });
});

// Protected cart operations (require authentication)
router.use(auth);

// Add item to cart
router.post('/add', cartController.addToCart);

// Update cart item quantity
router.put('/update/:itemId', cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:itemId', cartController.removeFromCart);

// Clear cart
router.delete('/clear', cartController.clearCart);

module.exports = router; 