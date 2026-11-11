const db = require('../models');
const { Op } = require('sequelize');

exports.getHome = async (req, res) => {
  try {
    const packages = await db.Package.findAll({ 
      order: [['category', 'ASC'], ['price', 'ASC']] 
    });
    const galleries = await db.Gallery.findAll({ 
      order: [['createdAt', 'DESC']],
      limit: 12
    });
    const testimonials = await db.Testimonial.findAll({ 
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    
    res.render('index', {
      title: 'Smart Gallery - Pricelist & Portofolio Fotografi',
      namaAplikasi: 'Smart Gallery',
      packages,
      galleries,
      testimonials,
      searchKeyword: '',
      selectedCategory: 'Semua',
      categories: ['Semua', 'Wisuda', 'Prewedding', 'Wedding', 'Add-on']
    });
  } catch (error) {
    console.error('Home error:', error);
    res.status(500).send('Server error');
  }
};

exports.getPackageDetail = async (req, res) => {
  try {
    const pkg = await db.Package.findByPk(req.params.id);
    if (!pkg) {
      return res.status(404).render('404', { 
        title: 'Paket Tidak Ditemukan - Smart Gallery',
        namaAplikasi: 'Smart Gallery' 
      });
    }
    
    res.render('detail', {
      title: `${pkg.name} - Smart Gallery`,
      namaAplikasi: 'Smart Gallery',
      item: pkg
    });
  } catch (error) {
    console.error('Package detail error:', error);
    res.status(500).send('Server error');
  }
};

exports.getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    let where = {};
    
    if (category && category !== 'Semua') {
      where.category = category;
    }
    
    const galleries = await db.Gallery.findAll({ 
      where,
      order: [['createdAt', 'DESC']] 
    });
    
    res.render('gallery', {
      title: 'Galeri Portofolio - Smart Gallery',
      namaAplikasi: 'Smart Gallery',
      galleries,
      selectedCategory: category || 'Semua',
      categories: ['Semua', 'Wisuda', 'Prewedding', 'Wedding']
    });
  } catch (error) {
    console.error('Gallery error:', error);
    res.status(500).send('Server error');
  }
};

exports.getApiPackages = async (req, res) => {
  try {
    const { category, search } = req.query;
    let where = {};
    
    if (category && category !== 'Semua') {
      where.category = category;
    }
    
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    const packages = await db.Package.findAll({ 
      where,
      order: [['category', 'ASC'], ['price', 'ASC']] 
    });
    
    res.json({ success: true, data: packages });
  } catch (error) {
    console.error('API packages error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getApiStatus = (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server running', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};

exports.postChatbot = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message) {
      return res.json({ success: false, message: 'Pesan kosong' });
    }
    
    const packages = await db.Package.findAll();
    const faqs = await db.FAQ.findAll();
    
    let botResponse = generateBotResponse(message, packages, faqs);
    
    await db.ChatHistory.create({
      sessionId: sessionId || 'anonymous',
      userMessage: message,
      botResponse
    });
    
    res.json({ success: true, response: botResponse });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.json({ success: false, response: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi admin via WhatsApp.' });
  }
};

function generateBotResponse(message, packages, faqs) {
  const msg = message.toLowerCase();
  
  // Cek FAQ terlebih dahulu
  for (const faq of faqs) {
    if (msg.includes(faq.question.toLowerCase().substring(0, 20))) {
      return faq.answer;
    }
  }
  
  // Cek paket berdasarkan kategori
  const categories = ['wisuda', 'prewedding', 'wedding', 'add-on'];
  let matchedCategory = null;
  
  for (const cat of categories) {
    if (msg.includes(cat)) {
      matchedCategory = cat.charAt(0).toUpperCase() + cat.slice(1);
      break;
    }
  }
  
  if (matchedCategory) {
    const filteredPackages = packages.filter(p => p.category.toLowerCase() === matchedCategory.toLowerCase());
    if (filteredPackages.length > 0) {
      let response = `Berikut daftar paket **${matchedCategory}**:\n\n`;
      filteredPackages.forEach((pkg, i) => {
        response += `${i + 1}. **${pkg.name}** - Rp ${pkg.price.toLocaleString('id-ID')}\n`;
        response += `   Durasi: ${pkg.duration}\n`;
        response += `   ${pkg.description}\n\n`;
      });
      response += 'Ingin detail lebih lanjut? Klik tombol "Detail" atau tanyakan langsung ke admin via WhatsApp! 📲';
      return response;
    }
  }
  
  // Cek kata kunci harga/paket
  if (msg.includes('harga') || msg.includes('paket') || msg.includes('biaya') || msg.includes('price')) {
    let response = 'Berikut semua paket layanan **Smart Gallery**:\n\n';
    const grouped = {};
    packages.forEach(pkg => {
      if (!grouped[pkg.category]) grouped[pkg.category] = [];
      grouped[pkg.category].push(pkg);
    });
    
    Object.keys(grouped).forEach(cat => {
      response += `**${cat}**:\n`;
      grouped[cat].forEach(pkg => {
        response += `• ${pkg.name} - Rp ${pkg.price.toLocaleString('id-ID')} (${pkg.duration})\n`;
      });
      response += '\n';
    });
    response += 'Ketik kategori spesifik (misal: "harga wisuda") untuk detail lebih lengkap, atau hubungi admin via WhatsApp! 📲';
    return response;
  }
  
  // Default response
  return `Halo! Saya asisten AI **Smart Gallery** 🤖\n\nSaya bisa bantu Anda dengan:\n• **Harga paket** (ketik: "harga wisuda", "paket wedding", dll)\n• **Info layanan** & durasi pemotretan\n• **FAQ** seputar jasa fotografi\n\nAtau langsung **hubungi admin via WhatsApp** untuk konsultasi cepat! 📲\n\nApa yang ingin Anda tanyakan hari ini?`;
}