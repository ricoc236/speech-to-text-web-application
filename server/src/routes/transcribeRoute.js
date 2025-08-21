const express = require('express');
const multer = require('multer');
const authenticateToken  = require('../middlewares/authMiddleware');
const {transcribe } = require('../controllers/transcribeController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post("/", authenticateToken, upload.single('audio'), transcribe);
module.exports = router;
