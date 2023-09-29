const express = require('express');
const router = express.Router();
const controller = require('../controller/auth_controller.js');

router.post('/login', async (req, res) => {
    controller.login(req,res);
});

module.exports = router;