require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const productsData = require('./data/products.json');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for seeding...');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

const seedProducts = async () => {
    try {
        // Clear existing products
        await Product.deleteMany({});
        console.log('Existing products cleared...');
        
        // Insert new tech products
        const products = await Product.insertMany(productsData);
        console.log(`${products.length} tech products inserted successfully!`);
        
        // Display inserted products with discount info
        products.forEach(product => {
            const discountInfo = product.discountedPrice 
                ? ` (Discounted: $${product.discountedPrice})` 
                : '';
            console.log(`- ${product.title} (${product.category}) - $${product.price}${discountInfo}`);
        });
        
    } catch (error) {
        console.error('Error seeding products:', error.message);
    }
};

const runSeeder = async () => {
    await connectDB();
    await seedProducts();
    mongoose.disconnect();
    console.log('Tech store seeding completed!');
};

runSeeder();