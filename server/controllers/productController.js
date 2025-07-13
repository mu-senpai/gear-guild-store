const Product = require('../models/Product');

const productController = {
    // Get all products with optional category filter and pagination
    getAllProducts: async (req, res) => {
        try {
            const { category, page = 1, limit = 10, sortBy = 'price-asc', searchTerm = '' } = req.query;

            let query = {};
            if (category) {
                query.category = category;
            }

            // If searchTerm is provided, add case-insensitive regex to query
            if (searchTerm) {
                query.title = { $regex: searchTerm, $options: 'i' };
            }

            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);

            // Fetch ALL matching products (without pagination first)
            // because we need to sort by effectivePrice which is calculated
            const allProducts = await Product.find(query).lean();

            // Add discount information and effectivePrice to each product
            const productsWithDiscountInfo = allProducts.map(product => ({
                ...product,
                effectivePrice: product.discountedPrice || product.price,
                hasDiscount: product.discountedPrice !== null && product.discountedPrice < product.price,
                discountPercentage: product.discountedPrice
                    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
                    : 0
            }));

            // Sort by effective price
            let sortedProducts;
            switch (sortBy) {
                case 'price-asc':
                    sortedProducts = productsWithDiscountInfo.sort((a, b) => a.effectivePrice - b.effectivePrice);
                    break;
                case 'price-desc':
                    sortedProducts = productsWithDiscountInfo.sort((a, b) => b.effectivePrice - a.effectivePrice);
                    break;
                case 'name-asc':
                    sortedProducts = productsWithDiscountInfo.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'name-desc':
                    sortedProducts = productsWithDiscountInfo.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case 'newest':
                    sortedProducts = productsWithDiscountInfo.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                default:
                    sortedProducts = productsWithDiscountInfo.sort((a, b) => a.effectivePrice - b.effectivePrice);
            }

            // Apply pagination AFTER sorting
            const skip = (pageNumber - 1) * limitNumber;
            const paginatedProducts = sortedProducts.slice(skip, skip + limitNumber);

            const totalCount = sortedProducts.length;

            res.json({
                success: true,
                data: paginatedProducts,
                count: paginatedProducts.length,
                total: totalCount,
                page: pageNumber,
                totalPages: Math.ceil(totalCount / limitNumber),
                hasNextPage: pageNumber < Math.ceil(totalCount / limitNumber),
                hasPrevPage: pageNumber > 1,
                sortBy: sortBy
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
            // Find products where discountedPrice is not null and product is in stock
            const products = await Product.find({
                inStock: true,
                discountedPrice: { $ne: null }
            });

            // Add discount information to each product
            const productsWithDiscountInfo = products.map(product => ({
                ...product.toObject(),
                effectivePrice: product.discountedPrice,
                hasDiscount: true,
                discountPercentage: Math.round(((product.price - product.discountedPrice) / product.price) * 100),
                savings: Math.round((product.price - product.discountedPrice) * 100) / 100
            }));

            res.json({
                success: true,
                data: productsWithDiscountInfo,
                count: productsWithDiscountInfo.length,
                message: `Found ${productsWithDiscountInfo.length} discounted products`
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