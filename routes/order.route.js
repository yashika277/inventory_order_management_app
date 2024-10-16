const express = require('express');
const { placeOrder, getOrderStatus, updateOrderStatus, getAllOrders } = require('../controllers/order.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');
const { checkRole } = require('../middleware/role.middleware');
const router = express.Router();

// Customer routes
router.post('/', authenticateJWT, checkRole('customer'), placeOrder);
router.get('/:id/status', authenticateJWT, checkRole('customer'), getOrderStatus);

// Admin routes
router.put('/:id/status', authenticateJWT, checkRole('admin'), updateOrderStatus); // Update order status
router.get('/', authenticateJWT, checkRole('admin'), getAllOrders);               // Get all orders


module.exports = router;
