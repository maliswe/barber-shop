const express = require('express');
const router = express.Router();
const controller = require('../controller/barber_controller.js')

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.delete('/:id', controller.remove);
router.put('/:id', controller.update);

router.put('/availability/:id', controller.setAvailability);
router.get('/availability/:id/:date', controller.getOneAvailability);
router.get('/availability/:id', controller.getAllAvailabilities); 
router.delete('/availability/:id/:date', controller.deleteAvailability);
router.delete('/availability/delete-time/:phone/:date', controller.deleteTimeSlot);
router.get('/allavailability/:date', controller.getAllOnDate);


module.exports = router;
