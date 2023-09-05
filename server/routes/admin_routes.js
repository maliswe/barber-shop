const express = require('express');
const router = express.Router();
const controller = require('../controller/admin_controller.js')

router.get('/', async (req, res) => {
    controller.getAll(req, res);
});


router.post('/', async (req, res) => {
    controller.create(req, res);
});


module.exports = router;