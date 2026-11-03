const PaketModel = require('../models/paketModel');
const config = require('../config');

exports.status = (req, res) => {
  res.json({
    status: 'ok',
    aplikasi: config.appName,
    uptimeDetik: Math.round(process.uptime()),
    waktuServer: new Date().toISOString(),
    keterangan: 'API SmartGalery Pricelist beroperasi normal'
  });
};

exports.paket = (req, res) => {
  const kategori = req.query.kategori || 'Semua';
  const search = req.query.search || '';

  const data = PaketModel.getAll({ kategori, search });
  res.json({
    sukses: true,
    filter: { kategori, search },
    jumlah: data.length,
    data,
  });
};
