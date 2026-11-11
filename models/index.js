const sequelize = require('../config/database');
const User = require('./userModel');
const Gallery = require('./galleryModel');
const Package = require('./packageModel');
const Testimonial = require('./testimonialModel');
const FAQ = require('./faqModel');
const ChatHistory = require('./chatHistoryModel');

const db = {
  sequelize,
  User,
  Gallery,
  Package,
  Testimonial,
  FAQ,
  ChatHistory
};

module.exports = db;