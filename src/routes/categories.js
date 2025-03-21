const express = require('express');
const router = express.Router();

// Demo categories data
const categories = [
    { id: 1, name: 'Medicines', icon: 'pills', description: 'Prescription and OTC medicines' },
    { id: 2, name: 'Healthcare', icon: 'heart', description: 'Healthcare devices and equipment' },
    { id: 3, name: 'Personal Care', icon: 'user', description: 'Personal care and hygiene products' },
    { id: 4, name: 'Vitamins', icon: 'capsules', description: 'Vitamins and supplements' }
];

// Get all categories
router.get('/', (req, res) => {
    res.render('categories/index', {
        title: 'Categories - MedStore',
        categories: categories
    });
});

// Get single category
router.get('/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        return res.status(404).render('error', {
            title: '404 Not Found',
            message: 'Category not found'
        });
    }
    res.render('categories/show', {
        title: `${category.name} - MedStore`,
        category: category
    });
});

module.exports = router; 