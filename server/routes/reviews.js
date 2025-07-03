const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

router.get('/provider/:providerId', reviewController.getByProvider);
router.post('/', auth, reviewController.create);
router.get('/featured/list', reviewController.featured);

module.exports = router;
