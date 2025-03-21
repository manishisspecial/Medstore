const express = require('express');
const router = express.Router();

// Demo offers data
const offers = [
    {
        id: 1,
        title: 'First Order Discount',
        description: 'Get 20% off on your first order',
        code: 'FIRST20',
        expiry: '2024-12-31'
    },
    {
        id: 2,
        title: 'Free Delivery',
        description: 'Free delivery on orders above ₹500',
        code: 'FREEDEL',
        expiry: '2024-12-31'
    }
];

router.get('/', (req, res) => {
    res.render('offers/index', {
        title: 'Offers - MedStore',
        offers: offers
    });
});

module.exports = router; 