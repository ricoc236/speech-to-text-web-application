const express = require('express');
const { signup, signin, getuser } = require('../controllers/authController.js');
const authenticateToken  = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /auth/signup
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getUser', authenticateToken, getuser);

module.exports = router;
