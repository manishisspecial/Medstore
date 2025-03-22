const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Static categories data
const categories = [
    {
        id: 'medicines',
        name: 'Medicines',
        description: 'Prescription and over-the-counter medications',
        image: '/images/categories/medicines.jpg',
        icon: 'ph-pill'
    },
    {
        id: 'healthcare',
        name: 'Healthcare',
        description: 'Medical devices and healthcare supplies',
        image: '/images/categories/healthcare.jpg',
        icon: 'ph-heartbeat'
    },
    {
        id: 'personal-care',
        name: 'Personal Care',
        description: 'Personal hygiene and grooming products',
        image: '/images/categories/personal-care.jpg',
        icon: 'ph-sparkle'
    },
    {
        id: 'vitamins',
        name: 'Vitamins',
        description: 'Nutritional supplements and vitamins',
        image: '/images/categories/vitamins.jpg',
        icon: 'ph-leaf'
    },
    {
        id: 'baby-care',
        name: 'Baby Care',
        description: 'Products for baby care and hygiene',
        image: '/images/categories/baby-care.jpg',
        icon: 'ph-baby'
    },
    {
        id: 'elderly-care',
        name: 'Elderly Care',
        description: 'Specialized products for elderly care',
        image: '/images/categories/elderly-care.jpg',
        icon: 'ph-user-circle'
    }
];

// Get all categories
router.get('/', (req, res) => {
    res.render('categories', { 
        title: 'Categories - MedStore',
        categories: categories
    });
});

// Get single category with products
router.get('/:id', (req, res) => {
    const category = categories.find(c => c.id === req.params.id);
    if (!category) {
        return res.status(404).render('error', { 
            title: 'Category Not Found - MedStore',
            error: { message: 'Category not found' }
        });
    }

    const products = Product.getProductsByCategory(category.name);
    res.render('category', { 
        title: `${category.name} - MedStore`,
        category: category,
        products: products
    });
});

module.exports = router; 