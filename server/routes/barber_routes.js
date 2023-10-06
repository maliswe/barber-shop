const express = require('express');
const router = express.Router();
const controller = require('../controller/barber_controller.js')

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.delete('/:id', controller.remove);
router.put('/:id', controller.update);

router.put('/availability', controller.setAvailability);
router.get('/availability/:date', controller.getOneAvailability);
router.get('/availability', controller.getAllAvailabilities); 

module.exports = router;
