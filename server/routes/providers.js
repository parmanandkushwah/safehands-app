const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

router.get('/', providerController.getAll);
router.get('/featured/list', providerController.featured);
router.get('/:id', providerController.getById);
router.post('/', providerController.create);
router.put('/:id', providerController.update);

module.exports = router;
