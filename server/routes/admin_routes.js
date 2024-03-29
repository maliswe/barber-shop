const express = require('express');
const router = express.Router();
const controller = require('../controller/admin_controller.js')


router.post('/:id', controller.methodDispatch);
router.post('/', controller.create); // Create new admin
router.get('/', controller.getAll); // Get the admin accounts
router.get('/:id', controller.getOne); // Get a specific admin
router.delete('/:id', controller.remove); // Remove sepcific admin account
router.put('/:id', controller.update); // Update the admin information
router.delete('/', controller.removeAll); // Remove all the admins! Not used




module.exports = router;

//Router for handling administrative operations.
//This router defines routes for various administrative actions, such as creating,
//updating, retrieving, and deleting resources.