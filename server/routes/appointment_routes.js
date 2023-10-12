const express = require('express');
const router = express.Router();
const controller = require('../controller/appointment_controller.js');

router.get('/', async (req, res) => {
    controller.getAllAppointment(req, res);
});

router.get('/:confNumber', async (req, res) => {
    controller.getAppointment(req, res, req.params.confNumber);
});

router.post('/', async (req, res) => {
    controller.createAppointment(req, res);
});

router.put('/:confNumber', async (req, res) => {
    controller.updateAppointment(req, res, req.params.confNumber);
});

router.delete('/:confNumber', async (req, res) => {
    controller.remove(req, res, req.params.confNumber);
});
router.get('/barber/:phone', async (req, res) => {
    controller.getBarberAppointments(req, res, req.params.phone);
});

module.exports = router;
