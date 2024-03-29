const express = require('express');
const router = express.Router();
const controller = require('../controller/gallery_controller.js')

router.post('/', controller.upload.single('image'), async (req, res) => {
    controller.create(req, res);
});

router.get('/', async (req, res) => {
    controller.getAll(req, res);
});

router.get('/:id', async (req, res) => {
    controller.getOne(req, res);
})

router.delete('/:id', async (req, res) => {
    controller.remove(req, res);
})

router.patch('/:id', controller.upload.single('image'),async (req, res) => {
    controller.update(req, res);
})


module.exports = router;

//Router for managing a gallery of images.
//This router defines routes for various image gallery actions, including
//creating, updating, retrieving, and deleting images in the gallery.