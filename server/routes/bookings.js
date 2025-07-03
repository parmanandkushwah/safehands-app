const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.get('/my-bookings', auth, bookingController.getMyBookings);
router.post('/', auth, bookingController.create);
router.get('/:id', auth, bookingController.getById);
router.post('/:id/cancel', auth, bookingController.cancel);

module.exports = router;
