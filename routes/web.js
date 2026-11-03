const express = require('express');
const paketController = require('../controllers/paketController');

const router = express.Router();

// GET / - Halaman utama pricelist (mendukung query parameter ?kategori=...&search=...)
router.get('/', paketController.index);

// GET /paket/:id - Halaman detail paket sewa jasa
router.get('/paket/:id', paketController.detail);

module.exports = router;
