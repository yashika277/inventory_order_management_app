const Product = require('../models/product.model');

// Update stock level for a product (Admin only)
const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.stock = stock;
        await product.save();

        // Check if stock is below the low-stock threshold
        if (product.stock < product.lowStockThreshold) {
            return res.status(200).json({
                message: 'Stock updated successfully, but the product is running low on stock.',
                product,
                alert: 'Low stock alert!'
            });
        }

        res.status(200).json({ message: 'Stock updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stock level' });
    }
};

// Get products that are low on stock (Admin only)
const getLowStockProducts = async (req, res) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lt: 'lowStockThreshold' } });

        if (lowStockProducts.length === 0) {
            return res.status(200).json({ message: 'No low-stock products at the moment.' });
        }

        res.status(200).json({ message: 'Low-stock products found', products: lowStockProducts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch low-stock products' });
    }
};

module.exports = { updateStock, getLowStockProducts }