const express = require('express');
const publicController = require('../controllers/publicController');

const router = express.Router();

router.get('/', publicController.getHome);
router.get('/paket/:id', publicController.getPackageDetail);
router.get('/gallery', publicController.getGallery);

router.get('/api/paket', publicController.getApiPackages);
router.get('/api/status', publicController.getApiStatus);
router.post('/api/chat', publicController.postChatbot);

module.exports = router;
