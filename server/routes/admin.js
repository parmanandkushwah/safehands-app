const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/dashboard', auth, adminController.getDashboard);
router.get('/users', auth, adminController.getUsers);
router.get('/providers', auth, adminController.getProviders);
router.get('/bookings', auth, adminController.getBookings);
router.get('/reviews', auth, adminController.getReviews);
router.get('/categories', auth, adminController.getCategories);
router.get('/services', auth, adminController.getServices);

module.exports = router;
