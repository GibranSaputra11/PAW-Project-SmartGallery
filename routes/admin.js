const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.use(auth);

router.get('/dashboard', adminController.getDashboard);

router.get('/gallery', adminController.getGalleryList);
router.get('/gallery/create', adminController.getGalleryCreate);
router.post('/gallery/create', upload.single('image'), adminController.postGalleryCreate);
router.post('/gallery/:id/delete', adminController.postGalleryDelete);

router.get('/pricing', adminController.getPackageList);
router.get('/pricing/create', adminController.getPackageCreate);
router.post('/pricing/create', adminController.postPackageCreate);
router.get('/pricing/:id/edit', adminController.getPackageEdit);
router.post('/pricing/:id/update', adminController.postPackageUpdate);
router.post('/pricing/:id/delete', adminController.postPackageDelete);

router.get('/testimonials', adminController.getTestimonialList);
router.get('/testimonials/create', adminController.getTestimonialCreate);
router.post('/testimonials/create', adminController.postTestimonialCreate);
router.post('/testimonials/:id/delete', adminController.postTestimonialDelete);

router.get('/faqs', adminController.getFAQList);
router.get('/faqs/create', adminController.getFAQCreate);
router.post('/faqs/create', adminController.postFAQCreate);
router.get('/faqs/:id/edit', adminController.getFAQEdit);
router.post('/faqs/:id/update', adminController.postFAQUpdate);
router.post('/faqs/:id/delete', adminController.postFAQDelete);

module.exports = router;