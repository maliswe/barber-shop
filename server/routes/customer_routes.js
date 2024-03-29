const express = require('express');
const router = express.Router();
const controller = require('../controller/customer_controller.js')

router.post('/', controller.create); // Create new customer account
router.get('/', controller.getAll); // Get all the cusotmers accounts
router.get('/:id', controller.getOne); //Get a customer information
router.put('/:id', controller.update); // Update the user information
router.delete('/:id', controller.remove); // Remove specific user
router.delete('/', controller.removeAll); // Remove all the customers
router.post('/:customer_id/appointments', controller.createAppointmentForCustomer); // Creating an appointment based on the customer ID.


module.exports = router;

//Router for managing customer-related routes and appointments.
//This router defines routes for various customer-related actions, including
//creating, updating, retrieving, and deleting customer profiles, as well as
//managing appointments associated with customers.