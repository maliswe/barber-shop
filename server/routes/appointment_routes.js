const express = require('express');
const router = express.Router();
const controller = require('../controller/appointment_controller.js');

router.get('/', async (req, res) => {
    controller.getAllAppointment(req,res); 
});

router.post('/', async (req, res) => {
    controller.post(req,res);
});

module.exports = router;
