const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProduct);

// Protected routes
router.use(authController.protect);

// Review routes
router.post('/:id/reviews', productController.addReview);

// Admin only routes
router.use(authController.restrictTo('admin'));
router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Get all products
router.get('/all', async (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 10 } = req.query;
        let query = {};

        // Apply filters
        if (category) {
            query.category = category;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Apply sorting
        let sortOption = {};
        if (sort) {
            switch (sort) {
                case 'price-asc':
                    sortOption = { price: 1 };
                    break;
                case 'price-desc':
                    sortOption = { price: -1 };
                    break;
                case 'rating-desc':
                    sortOption = { rating: -1 };
                    break;
                default:
                    sortOption = { createdAt: -1 };
            }
        }

        // Apply pagination
        const skip = (page - 1) * limit;
        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Product.countDocuments(query);

        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

// Create product (admin only)
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

// Update product (admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// Delete product (admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

// Add review to product
router.post('/:id/reviews', auth, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user already reviewed
        const alreadyReviewed = product.reviews.find(
            review => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'Product already reviewed' });
        }

        // Add review
        product.reviews.push({
            user: req.user._id,
            rating,
            comment
        });

        // Update product rating
        const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        product.rating = totalRating / product.reviews.length;

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
});

// In-memory products data
const products = [
    {
        id: 1,
        name: 'Paracetamol',
        description: 'Effective pain relief for headaches, fever, and other common pains',
        price: 50,
        brand: 'HealthCare',
        category: 'Medicines',
        image: 'https://via.placeholder.com/300',
        stock: 100
    },
    {
        id: 2,
        name: 'Vitamin C 1000mg',
        description: 'Boost your immunity with daily Vitamin C supplements',
        price: 150,
        brand: 'VitaLife',
        category: 'Vitamins',
        image: 'https://via.placeholder.com/300',
        stock: 75
    },
    {
        id: 3,
        name: 'First Aid Kit',
        description: 'Complete emergency kit for home and travel',
        price: 500,
        brand: 'SafetyFirst',
        category: 'Healthcare',
        image: 'https://via.placeholder.com/300',
        stock: 50
    },
    {
        id: 4,
        name: 'Digital Thermometer',
        description: 'Accurate temperature measurement with digital display',
        price: 299,
        brand: 'MedTech',
        category: 'Devices',
        image: 'https://via.placeholder.com/300',
        stock: 30
    }
];

// Get all products
router.get('/', (req, res) => {
    try {
        res.render('products/index', {
            title: 'Products - MedStore',
            products: products,
            user: null
        });
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error loading products',
            error: error,
            user: null
        });
    }
});

// Get single product
router.get('/:id', (req, res) => {
    try {
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) {
            return res.status(404).render('error', {
                title: '404 Not Found',
                message: 'Product not found',
                error: {},
                user: null
            });
        }
        res.render('products/show', {
            title: `${product.name} - MedStore`,
            product: product,
            user: null
        });
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: 'Error loading product',
            error: error,
            user: null
        });
    }
});

module.exports = router; 