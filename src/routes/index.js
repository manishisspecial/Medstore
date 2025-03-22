const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Product = require('../models/Product');
require('dotenv').config();

// Initialize nodemailer with Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify email configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log("Email configuration error:", error);
    } else {
        console.log("Email server is ready to send messages");
    }
});

// Home page
router.get('/', (req, res) => {
    const popularProducts = Product.getAllProducts().slice(0, 4);
    res.render('index', { 
        title: 'MedStore - Your Health, Our Priority',
        popularProducts,
        subscribe: req.query.subscribe,
        subscribeError: req.query.subscribeError
    });
});

// Contact form handler
router.post('/contact', async (req, res) => {
    const { name, email, phone, message, doctor, test } = req.body;
    
    try {
        let subject = 'New Contact Form Submission';
        let text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
        
        if (doctor) {
            subject = 'Doctor Consultation Request';
            text += `\n\nDoctor Type: ${doctor}`;
        }
        
        if (test) {
            subject = 'Lab Test Request';
            text += `\n\nTest Type: ${test}`;
        }

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: subject,
            text: text
        });

        res.redirect('/?contact=success');
    } catch (error) {
        console.error('Error sending email:', error);
        res.redirect('/?contact=error');
    }
});

// Newsletter subscription handler
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.redirect('/?subscribeError=Please provide an email address');
    }

    try {
        // Send welcome email to subscriber
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Welcome to MedStore Newsletter!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2563eb; text-align: center;">Welcome to MedStore Newsletter!</h2>
                    <p>Dear Subscriber,</p>
                    <p>Thank you for subscribing to our newsletter. We're excited to keep you updated with:</p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li style="margin: 10px 0;">📦 Latest healthcare products</li>
                        <li style="margin: 10px 0;">💰 Exclusive offers and discounts</li>
                        <li style="margin: 10px 0;">💡 Health tips and advice</li>
                        <li style="margin: 10px 0;">✨ New arrivals and updates</li>
                    </ul>
                    <p>If you didn't subscribe to our newsletter, please ignore this email.</p>
                    <p style="margin-top: 30px;">Best regards,<br>The MedStore Team</p>
                </div>
            `
        });

        // Send notification to admin
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: 'New Newsletter Subscription',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2563eb; text-align: center;">New Newsletter Subscription</h2>
                    <p>Hello Admin,</p>
                    <p>A new user has subscribed to the newsletter:</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <p>You can manage this subscription from your admin dashboard.</p>
                    <p style="margin-top: 30px;">Best regards,<br>MedStore System</p>
                </div>
            `
        });

        console.log('Subscription emails sent successfully');
        res.redirect('/?subscribe=success');
    } catch (error) {
        console.error('Error sending subscription emails:', error);
        res.redirect('/?subscribeError=Failed to subscribe. Please try again.');
    }
});

// About page
router.get('/about', (req, res) => {
    res.render('pages/about', { title: 'About Us - MedStore' });
});

// Contact page
router.get('/contact', (req, res) => {
    res.render('pages/contact', { 
        title: 'Contact Us - MedStore',
        contact: req.query.contact
    });
});

// Career page
router.get('/career', (req, res) => {
    res.render('career', { title: 'Career - MedStore' });
});

// Legal pages
router.get('/privacy-policy', (req, res) => {
    res.render('pages/legal/privacy-policy', { title: 'Privacy Policy - MedStore' });
});

router.get('/refund-policy', (req, res) => {
    res.render('pages/legal/refund-policy', { title: 'Refund Policy - MedStore' });
});

router.get('/terms', (req, res) => {
    res.render('pages/legal/terms', { title: 'Terms & Conditions - MedStore' });
});

router.get('/shipping-policy', (req, res) => {
    res.render('pages/legal/shipping-policy', { title: 'Shipping Policy - MedStore' });
});

router.get('/return-policy', (req, res) => {
    res.render('pages/legal/return-policy', { title: 'Return Policy - MedStore' });
});

router.get('/cancellation-policy', (req, res) => {
    res.render('pages/legal/cancellation-policy', { title: 'Cancellation Policy - MedStore' });
});

router.get('/disclaimer', (req, res) => {
    res.render('pages/legal/disclaimer', { title: 'Disclaimer - MedStore' });
});

router.get('/sitemap', (req, res) => {
    res.render('pages/legal/sitemap', { title: 'Sitemap - MedStore' });
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

// Consult Doctor Page
router.get('/consult', (req, res) => {
    res.render('consult', { title: 'Consult Doctor - MedStore' });
});

// Medicine Page
router.get('/medicine', (req, res) => {
    res.render('medicine', { title: 'Medicine - MedStore' });
});

// Test Page
router.get('/test', (req, res) => {
    res.render('test', { title: 'Test - MedStore' });
});

module.exports = router; 