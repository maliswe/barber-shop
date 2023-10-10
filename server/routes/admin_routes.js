const express = require('express');
const router = express.Router();
const controller = require('../controller/admin_controller.js')


router.post('/:id', controller.methodDispatch);
router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.delete('/:id', controller.remove);
router.put('/:id', controller.update);




module.exports = router;