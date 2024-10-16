const Order = require('../models/order.model');
const Product = require('../models/product.model');

// Place an order
const placeOrder = async (req, res) => {
    try {
        const { products } = req.body;
        let totalAmount = 0;

        // Calculate total amount and check product availability
        for (let item of products) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).json({ message: `Product with ID ${item.product} not found` });

            totalAmount += product.price * item.quantity;

            // Optional: Decrease stock when an order is placed
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}` });
            }
            product.stock -= item.quantity;
            await product.save();
        }

        const order = new Order({
            user: req.user.id,     // Assuming user ID comes from JWT token
            products,
            totalAmount
        });

        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
};

// View order status
const getOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('products.product');
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Ensure the user can only view their own orders
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied: Not your order' });
        }

        res.status(200).json({ message: 'Order found', order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order status' });
    }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Only allow valid status updates
        if (!['Pending', 'Shipped', 'Delivered'].includes(status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

// View all customer orders (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('products.product', 'name price');
        res.status(200).json({ message: 'All orders retrieved successfully', orders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
};

module.exports = { placeOrder, getOrderStatus, updateOrderStatus, getAllOrders }