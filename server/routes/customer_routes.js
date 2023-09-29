const express = require('express');
const router = express.Router();
const controller = require('../controller/customer_controller.js')
const appointments = require('../controller/appointment_controller.js')

router.post('/', async (req, res) => {
    controller.create(req, res);
});

router.get('/', async (req, res) => {
    controller.getAll(req, res);
});

router.get('/:id', async (req, res) => {
    controller.getOne(req, res, req.params.id);
})

router.delete('/:id', async (req, res) => {
    controller.remove(req, res, req.params.id);
})

router.put('/:id', async (req, res) => {
    controller.update(req, res, req.params.id);
})

router.post('/:id/appointments', async (req, res) => {
    appointments.createAppointment(req, res, req.params.id);
});

router.get('/:id/appointments', async (req, res) => {
    appointments.getAllAppointment(req, res, req.params.id);
});

router.get('/:id/appointments/:appoID', async (req, res) => {
    appointments.getAppointment(req, res, req.params.appoID, req.params.id);
})

router.put('/:id/appointments/:appoID', async (req, res) => {
    appointments.updateAppointment(req, res, req.params.appoID, req.params.id);
})

router.delete('/:id/appointments/:appoID', async (req, res) => {
    appointments.remove(req, res, req.params.appoID, req.params.id);
})

router.post('/register', controller.register);

module.exports = router;