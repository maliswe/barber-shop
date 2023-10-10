const express = require('express');
const router = express.Router();
const controller = require('../controller/customer_controller.js')
const appointments = require('../controller/appointment_controller.js')

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.delete('/', controller.removeAll);


module.exports = router;