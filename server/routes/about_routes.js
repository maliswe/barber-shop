const express = require('express');
const router = express.Router();
const controller = require('../controller/about_controller.js');

router.put('/:id', controller.update);
router.get('/:id', controller.get);

module.exports = router;