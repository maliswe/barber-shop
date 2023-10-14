const express = require('express');
const router = express.Router();
const controller = require('../controller/appointment_controller.js');

router.get('/', async (req, res) => {
    controller.getAllAppointment(req, res);
}); // Get all the appointment

router.get('/:confNumber', async (req, res) => {
    controller.getAppointment(req, res, req.params.confNumber);
}); // Get an appointment

router.post('/', async (req, res) => {
    controller.createAppointment(req, res);
}); // Create new appointment

router.patch('/:confNumber/status', async (req, res) => {
    controller.updateAppointment(req, res, req.params.confNumber);
}); // Update an appoinment info

router.delete('/:confNumber', async (req, res) => {
    controller.remove(req, res, req.params.confNumber);
}); // Delete an appointment
router.get('/barber/:phone', async (req, res) => {
    controller.getBarberAppointments(req, res, req.params.phone);
}); // Get the barber appointmentas

router.get('/:confNumber/services/:serviceId', async (req, res) => {
    controller.getAppointmentService(req, res, req.params.confNumber, req.params.serviceId);
}); // get specific service info upon the appointment id

router.delete('/:confNumber/services/:serviceId', async (req, res) => {
    controller.deleteServiceFromAppointment(req, res, req.params.confNumber, req.params.serviceId);
}); // Delete the service from the appointment

module.exports = router;
