const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');
const { checkRole } = require('../middleware/role.middleware');
const router = express.Router();

// Admin routes for managing products
router.post('/', authenticateJWT, checkRole('admin'), createProduct); // Create product
router.get('/', getAllProducts); // Get all products (no auth required)
router.get('/:id', getProductById); // Get product by ID
router.put('/:id', authenticateJWT, checkRole('admin'), updateProduct); // Update product
router.delete('/:id', authenticateJWT, checkRole('admin'), deleteProduct); // Delete product

module.exports = router;
