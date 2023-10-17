const express = require('express');
const router = express.Router();
const controller = require('../controller/barber_controller.js')

router.post('/', controller.create); // Create new barber 
router.get('/', controller.getAll); // Get the barbers
router.get('/:id', controller.getOne); // Get a barber
router.delete('/:id', controller.remove); // Remove the barber upon their id
router.put('/:id', controller.update); // Update the barber info
router.delete('/',controller.removeAll); // Remove all barbers

router.get('/barber/:phone', async (req, res) => {
    controller.getBarberAppointments(req, res, req.params.phone);
}); // Get the barber appointmentas
router.put('/availability/:id', controller.setAvailability); // Set the availability for specific barber
router.get('/:id/availability/:date', controller.getOneAvailability); // Get barber specific date times
router.get('/availability/:id', controller.getAllAvailabilities); // Get all the barber available times
router.delete('/:id/availability/:date', controller.deleteAvailability); // Delete specifc date for specific barber
router.get('/allavailability/:date', controller.getAllOnDate); // To get all the available for the barbers time in date 


module.exports = router;

//Router for managing barber-related routes and availability.
//This router defines routes for various barber-related actions, including
//creating, updating, retrieving, and deleting barbers, as well as managing
//their availability and time slots.
