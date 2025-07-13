require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Default route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Tech Store API is running on Vercel!',
        endpoints: {
            products: '/api/products',
            cart: '/api/cart'
        },
        timestamp: new Date().toISOString()
    });
});

// Export for Vercel (IMPORTANT: No app.listen() here)
module.exports = app;