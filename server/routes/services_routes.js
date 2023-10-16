const express = require('express');
const router = express.Router();
const controller = require('../controller/services_controller.js')

router.post('/', controller.upload.single('image'), async (req, res) => {
    controller.create(req, res);
}); // Create new service

router.get('/', async (req, res) => {
    controller.getAll(req, res);
}); // Get all services

router.get('/:id', async (req, res) => {
    controller.getOne(req, res, req.params.id);
}); // Get a service

router.delete('/:id', async (req, res) => {
    controller.remove(req, res, req.params.id);
}); // Delete the serivce

router.put('/:id', controller.upload.single('image'),async (req, res) => {
    controller.update(req, res, req.params.id);
}); // Update the service info


module.exports = router;

//Router for managing services and service-related images.
//This router defines routes for various service-related actions, including
//creating, updating, retrieving, and deleting services, along with the associated images.