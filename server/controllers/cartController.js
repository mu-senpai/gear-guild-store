const Cart = require('../models/Cart');
const Product = require('../models/Product');

const cartController = {
    // Add item to cart
    addToCart: async (req, res) => {
        try {
            const { sessionId, productId, quantity = 1 } = req.body;
            
            // Validate required fields
            if (!sessionId || !productId) {
                return res.status(400).json({
                    success: false,
                    error: 'Session ID and Product ID are required'
                });
            }
            
            // Validate product exists
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Product not found'
                });
            }
            
            // Check if product is in stock
            if (!product.inStock) {
                return res.status(400).json({
                    success: false,
                    error: 'Product is out of stock'
                });
            }
            
            // Find or create cart
            let cart = await Cart.findOne({ sessionId });
            if (!cart) {
                cart = new Cart({ sessionId, items: [] });
            }
            
            // Check if item already exists in cart
            const existingItem = cart.items.find(item => 
                item.productId.toString() === productId
            );
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            
            await cart.save();
            
            res.json({
                success: true,
                message: 'Item added to cart',
                data: {
                    cartId: cart._id,
                    totalItems: cart.items.reduce((total, item) => total + item.quantity, 0)
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    // Get cart by session ID
    getCart: async (req, res) => {
        try {
            const { sessionId } = req.params;
            
            const cart = await Cart.findOne({ sessionId }).populate('items.productId');
            
            if (!cart) {
                return res.json({
                    success: true,
                    data: {
                        sessionId,
                        items: [],
                        summary: {
                            totalItems: 0,
                            totalAmount: 0
                        }
                    }
                });
            }
            
            // Calculate totals
            let totalAmount = 0;
            let totalItems = 0;
            
            const cartItems = cart.items.map(item => {
                const subtotal = item.productId.price * item.quantity;
                totalAmount += subtotal;
                totalItems += item.quantity;
                
                return {
                    id: item._id,
                    productId: item.productId._id,
                    title: item.productId.title,
                    price: item.productId.price,
                    image: item.productId.image,
                    quantity: item.quantity,
                    subtotal: Math.round(subtotal * 100) / 100
                };
            });
            
            res.json({
                success: true,
                data: {
                    sessionId,
                    items: cartItems,
                    summary: {
                        totalItems,
                        totalAmount: Math.round(totalAmount * 100) / 100
                    },
                    createdAt: cart.createdAt,
                    updatedAt: cart.updatedAt
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    // Update item quantity
    updateCartItem: async (req, res) => {
        try {
            const { sessionId, productId, quantity } = req.body;
            
            if (!sessionId || !productId || quantity === undefined) {
                return res.status(400).json({
                    success: false,
                    error: 'Session ID, Product ID, and quantity are required'
                });
            }
            
            const cart = await Cart.findOne({ sessionId });
            if (!cart) {
                return res.status(404).json({
                    success: false,
                    error: 'Cart not found'
                });
            }
            
            const item = cart.items.find(item => 
                item.productId.toString() === productId
            );
            
            if (!item) {
                return res.status(404).json({
                    success: false,
                    error: 'Item not found in cart'
                });
            }
            
            if (quantity <= 0) {
                // Remove item if quantity is 0 or negative
                cart.items = cart.items.filter(item => 
                    item.productId.toString() !== productId
                );
            } else {
                item.quantity = quantity;
            }
            
            await cart.save();
            
            res.json({
                success: true,
                message: 'Cart updated successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    // Remove item from cart
    removeFromCart: async (req, res) => {
        try {
            const { sessionId, productId } = req.params;
            
            const cart = await Cart.findOne({ sessionId });
            if (!cart) {
                return res.status(404).json({
                    success: false,
                    error: 'Cart not found'
                });
            }
            
            cart.items = cart.items.filter(item => 
                item.productId.toString() !== productId
            );
            
            await cart.save();
            
            res.json({
                success: true,
                message: 'Item removed from cart'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    // Clear entire cart
    clearCart: async (req, res) => {
        try {
            const { sessionId } = req.params;
            
            await Cart.findOneAndDelete({ sessionId });
            
            res.json({
                success: true,
                message: 'Cart cleared successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

module.exports = cartController;