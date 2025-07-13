const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountedPrice: {
        type: Number,
        min: 0,
        default: null  // null means no discount
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Mobiles', 'Laptops', 'Accessories']
    },
    inStock: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual field to get the effective price (discounted price if available, otherwise regular price)
productSchema.virtual('effectivePrice').get(function() {
    return this.discountedPrice || this.price;
});

// Virtual field to check if product has discount
productSchema.virtual('hasDiscount').get(function() {
    return this.discountedPrice !== null && this.discountedPrice < this.price;
});

// Include virtual fields in JSON output
productSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);