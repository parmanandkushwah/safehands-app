const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/', cityController.getAll);
router.get('/:id', cityController.getById);

module.exports = router;
