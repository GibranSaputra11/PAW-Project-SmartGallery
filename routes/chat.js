const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput');
const { chat } = require('../controllers/chatController');

router.post('/', validateChatInput, chat);

module.exports = router;