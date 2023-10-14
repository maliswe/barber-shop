const Gallery = require('../schema/gallery_schema.js')
const { sort } = require('./utilityMethod.js');
const { recSkipper } = require('./utilityMethod.js');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 8 * 1024 * 1024,
    },
  });

const create = async (req, res) => {
    try {
        const { name, description} = req.body;

        let image = null;
        if (req.file) {
            image = req.file.buffer;
        }

        const newGallery = new Gallery({
            name,
            description,
            image
          });
        const savedGallery = await newGallery.save();
        res.status(201).json(savedGallery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAll = async (req, res) => {
    try {

        sortFilter = sort(req.query.sort)
        recSkipper(req.query.page, req.query.pageSize);
        const gallery = await Gallery.find().skip(skip).limit(Number(req.query.pageSize));

        if (gallery.length < 1) {
            return res.status(404).json({ message: 'gallery not found' });
        }

        res.status(200).json(gallery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res) => {
    const id = req.params.id;
    try {
        const gallery = await Gallery.findOne({_id:id});

        if (!gallery) {
            return res.status(404).json({ message: 'gallery not found' });
        }

        res.status(200).json(gallery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res) => {
    const id = req.params.id;
    try {
        const gallery = await Gallery.findOne({_id:id});

        if (!gallery) {
            return res.status(404).json({ message: 'gallery not found' });
        }
        const { name, description, price, duration } = req.body;

        if (name) gallery.name = name;
        if (description) gallery.description = description;
        if (req.file) {
            gallery.image = req.file.buffer;
        }

        await gallery.save();

        res.status(200).json(gallery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Gallery.deleteOne({_id:id});
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'services not found' });
        }
        res.status(200).json({ message: 'services deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    upload
};

//Module for managing galleries and handling image uploads.
//This module provides functions for creating, retrieving, updating, and deleting galleries.