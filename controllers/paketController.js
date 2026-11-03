const PaketModel = require('../models/paketModel');
const config = require('../config');

// Controller untuk halaman Pricelist Jasa Foto & Video (Mempelajari GET query parameters untuk search & filter)
exports.index = (req, res) => {
  const kategori = req.query.kategori || 'Semua';
  const search = req.query.search || '';

  const paketList = PaketModel.getAll({ kategori, search });
  const categories = PaketModel.getCategories();

  res.render('index', {
    judul: `${config.appName} — Pricelist & Paket Jasa Fotografi & Videografi`,
    namaAplikasi: config.appName,
    paket: paketList,
    categories,
    selectedCategory: kategori,
    searchKeyword: search
  });
};

// Controller untuk halaman detail paket sewa jasa berdasarkan ID (/paket/:id)
exports.detail = (req, res) => {
  const id = req.params.id;
  const item = PaketModel.getById(id);

  if (!item) {
    return res.status(404).render('404', {
      judul: `404 Paket Tidak Ditemukan - ${config.appName}`,
      namaAplikasi: config.appName
    });
  }

  res.render('detail', {
    judul: `${item.nama} — ${config.appName}`,
    namaAplikasi: config.appName,
    item
  });
};
