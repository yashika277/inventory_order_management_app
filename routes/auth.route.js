const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', register); // User registration
router.post('/login', login); // User login

module.exports = router;
