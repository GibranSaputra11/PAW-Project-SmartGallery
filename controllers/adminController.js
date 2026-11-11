const bcrypt = require('bcryptjs');
const db = require('../models');
const { Op } = require('sequelize');

exports.getLogin = (req, res) => {
  if (req.session.userId) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', {
    title: 'Login Admin - Smart Gallery',
    error: null,
    layout: false
  });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await db.User.findOne({ where: { username } });
    
    if (!user) {
      return res.render('admin/login', {
        title: 'Login Admin - Smart Gallery',
        error: 'Username tidak ditemukan',
        layout: false
      });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.render('admin/login', {
        title: 'Login Admin - Smart Gallery',
        error: 'Password salah',
        layout: false
      });
    }
    
    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.render('admin/login', {
      title: 'Login Admin - Smart Gallery',
      error: 'Terjadi kesalahan server',
      layout: false
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/auth/login');
  });
};

exports.getDashboard = async (req, res) => {
  try {
    const galleryCount = await db.Gallery.count();
    const packageCount = await db.Package.count();
    const testimonialCount = await db.Testimonial.count();
    const faqCount = await db.FAQ.count();
    
    res.render('admin/dashboard', {
      title: 'Dashboard Admin - Smart Gallery',
      username: req.session.username,
      stats: {
        gallery: galleryCount,
        packages: packageCount,
        testimonials: testimonialCount,
        faqs: faqCount
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).send('Server error');
  }
};

// Gallery Management
exports.getGalleryList = async (req, res) => {
  try {
    const galleries = await db.Gallery.findAll({ order: [['createdAt', 'DESC']] });
    res.render('admin/gallery-list', {
      title: 'Kelola Galeri - Smart Gallery',
      username: req.session.username,
      galleries
    });
  } catch (error) {
    console.error('Gallery list error:', error);
    res.status(500).send('Server error');
  }
};

exports.getGalleryCreate = (req, res) => {
  res.render('admin/gallery-create', {
    title: 'Tambah Galeri - Smart Gallery',
    username: req.session.username,
    error: null,
    success: null
  });
};

exports.postGalleryCreate = async (req, res) => {
  try {
    const { title, category, videoUrl } = req.body;
    
    if (!req.file) {
      return res.render('admin/gallery-create', {
        title: 'Tambah Galeri - Smart Gallery',
        username: req.session.username,
        error: 'Foto wajib diunggah',
        success: null
      });
    }
    
    const imageUrl = '/uploads/' + req.file.filename;
    
    await db.Gallery.create({
      title,
      imageUrl,
      videoUrl: videoUrl || null,
      category
    });
    
    res.render('admin/gallery-create', {
      title: 'Tambah Galeri - Smart Gallery',
      username: req.session.username,
      error: null,
      success: 'Galeri berhasil ditambahkan!'
    });
  } catch (error) {
    console.error('Create gallery error:', error);
    res.render('admin/gallery-create', {
      title: 'Tambah Galeri - Smart Gallery',
      username: req.session.username,
      error: 'Gagal menambahkan galeri',
      success: null
    });
  }
};

exports.postGalleryDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Gallery.destroy({ where: { id } });
    res.redirect('/admin/gallery');
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).send('Server error');
  }
};

// Package/Pricing Management
exports.getPackageList = async (req, res) => {
  try {
    const packages = await db.Package.findAll({ order: [['category', 'ASC'], ['price', 'ASC']] });
    res.render('admin/pricing-list', {
      title: 'Kelola Paket & Harga - Smart Gallery',
      username: req.session.username,
      packages
    });
  } catch (error) {
    console.error('Package list error:', error);
    res.status(500).send('Server error');
  }
};

exports.getPackageCreate = (req, res) => {
  res.render('admin/pricing-create', {
    title: 'Tambah Paket - Smart Gallery',
    username: req.session.username,
    error: null,
    success: null
  });
};

exports.postPackageCreate = async (req, res) => {
  try {
    const { name, category, description, price, duration, features, notIncluded, popular } = req.body;

    await db.Package.create({
      name,
      category,
      description,
      price: parseInt(price),
      duration,
      features: features ? features.split(',').map(f => f.trim()) : [],
      notIncluded: notIncluded ? notIncluded.split(',').map(f => f.trim()) : [],
      popular: popular === 'on'
    });

    res.redirect('/admin/pricing');
  } catch (error) {
    console.error('Create package error:', error);
    res.render('admin/pricing-create', {
      title: 'Tambah Paket - Smart Gallery',
      username: req.session.username,
      error: 'Gagal menambahkan paket',
      success: null
    });
  }
};

exports.getPackageEdit = async (req, res) => {
  try {
    const pkg = await db.Package.findByPk(req.params.id);
    if (!pkg) return res.redirect('/admin/pricing');

    res.render('admin/pricing-edit', {
      title: 'Edit Paket - Smart Gallery',
      username: req.session.username,
      package: pkg,
      error: null,
      success: null
    });
  } catch (error) {
    console.error('Edit package error:', error);
    res.redirect('/admin/pricing');
  }
};

exports.postPackageUpdate = async (req, res) => {
  try {
    const { name, category, description, price, duration, features, notIncluded, popular } = req.body;

    await db.Package.update({
      name,
      category,
      description,
      price: parseInt(price),
      duration,
      features: features ? features.split(',').map(f => f.trim()) : [],
      notIncluded: notIncluded ? notIncluded.split(',').map(f => f.trim()) : [],
      popular: popular === 'on'
    }, { where: { id: req.params.id } });

    res.redirect('/admin/pricing');
  } catch (error) {
    console.error('Update package error:', error);
    res.redirect('/admin/pricing');
  }
};

exports.postPackageDelete = async (req, res) => {
  try {
    await db.Package.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/pricing');
  } catch (error) {
    console.error('Delete package error:', error);
    res.status(500).send('Server error');
  }
};

// Testimonial Management
exports.getTestimonialList = async (req, res) => {
  try {
    const testimonials = await db.Testimonial.findAll({ order: [['createdAt', 'DESC']] });
    res.render('admin/testimonial-list', {
      title: 'Kelola Testimoni - Smart Gallery',
      username: req.session.username,
      testimonials
    });
  } catch (error) {
    console.error('Testimonial list error:', error);
    res.status(500).send('Server error');
  }
};

exports.getTestimonialCreate = (req, res) => {
  res.render('admin/testimonial-create', {
    title: 'Tambah Testimoni - Smart Gallery',
    username: req.session.username,
    error: null,
    success: null
  });
};

exports.postTestimonialCreate = async (req, res) => {
  try {
    const { clientName, message, rating } = req.body;
    
    await db.Testimonial.create({
      clientName,
      message,
      rating: parseInt(rating) || 5
    });
    
    res.redirect('/admin/testimonials');
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.render('admin/testimonial-create', {
      title: 'Tambah Testimoni - Smart Gallery',
      username: req.session.username,
      error: 'Gagal menambahkan testimoni',
      success: null
    });
  }
};

exports.postTestimonialDelete = async (req, res) => {
  try {
    await db.Testimonial.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/testimonials');
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).send('Server error');
  }
};

// FAQ Management
exports.getFAQList = async (req, res) => {
  try {
    const faqs = await db.FAQ.findAll({ order: [['createdAt', 'DESC']] });
    res.render('admin/faq-list', {
      title: 'Kelola FAQ - Smart Gallery',
      username: req.session.username,
      faqs
    });
  } catch (error) {
    console.error('FAQ list error:', error);
    res.status(500).send('Server error');
  }
};

exports.getFAQCreate = (req, res) => {
  res.render('admin/faq-create', {
    title: 'Tambah FAQ - Smart Gallery',
    username: req.session.username,
    error: null,
    success: null
  });
};

exports.postFAQCreate = async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    
    await db.FAQ.create({
      question,
      answer,
      category: category || 'Umum'
    });
    
    res.redirect('/admin/faqs');
  } catch (error) {
    console.error('Create FAQ error:', error);
    res.render('admin/faq-create', {
      title: 'Tambah FAQ - Smart Gallery',
      username: req.session.username,
      error: 'Gagal menambahkan FAQ',
      success: null
    });
  }
};

exports.getFAQEdit = async (req, res) => {
  try {
    const faq = await db.FAQ.findByPk(req.params.id);
    if (!faq) return res.redirect('/admin/faqs');
    
    res.render('admin/faq-edit', {
      title: 'Edit FAQ - Smart Gallery',
      username: req.session.username,
      faq,
      error: null,
      success: null
    });
  } catch (error) {
    console.error('Edit FAQ error:', error);
    res.redirect('/admin/faqs');
  }
};

exports.postFAQUpdate = async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    
    await db.FAQ.update({
      question,
      answer,
      category: category || 'Umum'
    }, { where: { id: req.params.id } });
    
    res.redirect('/admin/faqs');
  } catch (error) {
    console.error('Update FAQ error:', error);
    res.redirect('/admin/faqs');
  }
};

exports.postFAQDelete = async (req, res) => {
  try {
    await db.FAQ.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/faqs');
  } catch (error) {
    console.error('Delete FAQ error:', error);
    res.status(500).send('Server error');
  }
};