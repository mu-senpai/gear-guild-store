const Product = require('../models/Product');

const productController = {
    // Get all products with optional category filter and pagination
    getAllProducts: async (req, res) => {
        try {
            const { category, page = 1, limit = 10 } = req.query;
            
            let query = {};
            if (category) {
                query.category = category;
            }
            
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);
            const skip = (pageNumber - 1) * limitNumber;
            
            const products = await Product.find(query).skip(skip).limit(limitNumber);
            const totalCount = await Product.countDocuments(query);
            
            res.json({
                success: true,
                data: products,
                count: products.length,
                total: totalCount,
                page: pageNumber,
                totalPages: Math.ceil(totalCount / limitNumber),
                hasNextPage: pageNumber < Math.ceil(totalCount / limitNumber),
                hasPrevPage: pageNumber > 1
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    // Get single product by ID
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Product not found'
                });
            }
            
            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    // Create new product (for admin use)
    createProduct: async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            
            res.status(201).json({
                success: true,
                data: product,
                message: 'Product created successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    // Get featured products (for homepage)
    getFeaturedProducts: async (req, res) => {
        try {
            const products = await Product.find({ inStock: true }).limit(6);
            
            res.json({
                success: true,
                data: products,
                count: products.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

module.exports = productController;