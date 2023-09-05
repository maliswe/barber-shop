const express = require('express');
const router = express.Router();
const controller = require('../controller/services_controller.js')

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


module.exports = router;