const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products - Get all products (with optional category filter)
router.get('/', productController.getAllProducts);

// GET /api/products/featured - Get featured products for homepage
router.get('/featured', productController.getFeaturedProducts);

// GET /api/products/:id - Get single product by ID
router.get('/:id', productController.getProductById);

// POST /api/products - Create new product (for admin use)
router.post('/', productController.createProduct);

module.exports = router;