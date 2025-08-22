const express = require('express');
const router = express.Router();
const authenticateToken  = require('../middlewares/authMiddleware');
const { history, updateTranscript } = require('../controllers/historyController');

router.get('/', authenticateToken, history);
router.put('/update/:index', authenticateToken, updateTranscript);

module.exports = router;