const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// POST /api/cart/add - Add item to cart
router.post('/add', cartController.addToCart);

// GET /api/cart/:sessionId - Get cart by session ID
router.get('/:sessionId', cartController.getCart);

// PUT /api/cart/update - Update item quantity in cart
router.put('/update', cartController.updateCartItem);

// DELETE /api/cart/:sessionId/item/:productId - Remove item from cart
router.delete('/:sessionId/item/:productId', cartController.removeFromCart);

// DELETE /api/cart/:sessionId - Clear entire cart
router.delete('/:sessionId', cartController.clearCart);

module.exports = router;