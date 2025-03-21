const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Add this middleware before your routes
app.use((req, res, next) => {
    // Make user available to all views
    res.locals.user = null; // or req.user if you have authentication set up
    next();
});

// Import routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const offerRoutes = require('./routes/offers');

// Use routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/offers', offerRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('home', { 
        title: 'MedStore - Your Health, Our Priority',
        user: null
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        title: 'Error',
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : {},
        user: null
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', {
        title: '404 Not Found',
        message: 'Page not found',
        error: {},
        user: null
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 