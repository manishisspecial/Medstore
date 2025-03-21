const express = require('express');
const router = express.Router();

// Main pages
router.get('/', (req, res) => {
    res.render('home', { title: 'MedStore - Your Health, Our Priority' });
});

// Footer Links - About Section
router.get('/about', (req, res) => {
    res.render('pages/about', { title: 'About Us - MedStore' });
});

router.get('/contact', (req, res) => {
    res.render('pages/contact', { title: 'Contact Us - MedStore' });
});

router.get('/careers', (req, res) => {
    res.render('pages/careers', { title: 'Careers - MedStore' });
});

// Footer Links - Help Section
router.get('/help', (req, res) => {
    res.render('pages/help/index', { title: 'Help Center - MedStore' });
});

router.get('/faqs', (req, res) => {
    res.render('pages/help/faqs', { title: 'FAQs - MedStore' });
});

router.get('/shipping', (req, res) => {
    res.render('pages/help/shipping', { title: 'Shipping Information - MedStore' });
});

router.get('/returns', (req, res) => {
    res.render('pages/help/returns', { title: 'Returns Policy - MedStore' });
});

// Footer Links - Legal Section
router.get('/privacy-policy', (req, res) => {
    res.render('pages/legal/privacy-policy', { title: 'Privacy Policy - MedStore' });
});

router.get('/terms-of-service', (req, res) => {
    res.render('pages/legal/terms-of-service', { title: 'Terms of Service - MedStore' });
});

router.get('/refund-policy', (req, res) => {
    res.render('pages/legal/refund-policy', { title: 'Refund Policy - MedStore' });
});

// Blog route
router.get('/blog', (req, res) => {
    const blogPosts = [
        {
            id: 1,
            title: 'Understanding Common Cold vs. Flu',
            description: 'Learn the key differences between cold and flu symptoms and how to treat them effectively.',
            image: 'https://via.placeholder.com/400x250',
            date: '2024-03-15'
        },
        {
            id: 2,
            title: 'Tips for Better Sleep',
            description: 'Discover practical tips and habits that can help improve your sleep quality.',
            image: 'https://via.placeholder.com/400x250',
            date: '2024-03-14'
        },
        {
            id: 3,
            title: 'Boost Your Immunity Naturally',
            description: 'Natural ways to strengthen your immune system and stay healthy.',
            image: 'https://via.placeholder.com/400x250',
            date: '2024-03-13'
        }
    ];

    res.render('pages/blog/index', {
        title: 'Health & Wellness Blog - MedStore',
        blogPosts: blogPosts
    });
});

module.exports = router; 