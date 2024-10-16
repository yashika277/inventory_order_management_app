const express = require('express');
const { updateStock, getLowStockProducts } = require('../controllers/inventory.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');
const { checkRole } = require('../middleware/role.middleware');
const router = express.Router();

// Admin routes for inventory management
router.put('/:id/stock', authenticateJWT, checkRole('admin'), updateStock); // Update stock level
router.get('/low-stock', authenticateJWT, checkRole('admin'), getLowStockProducts); // Get low-stock products

module.exports = router;
