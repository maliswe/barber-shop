const Services = require('../schema/services_schema.js')
const { fieldsMapper, Generator } = require('./utilityMethod.js');
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
        let customId = await Generator.generator();
        const { name, description, price, duration } = req.body;
        let image = null;
        if (req.file) {
            image = req.file.buffer;
        }

        const newService = new Services({
            _id: customId,
            name,
            description,
            price,
            duration,
            image,
          });
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAll = async (req, res) => {
    try {

        sortFilter = sort(req.query.sort)
        recSkipper(req.query.page, req.query.pageSize);
        const services = await Services.find().skip(skip).limit(Number(req.query.pageSize));

        if (services.length < 1) {
            return res.status(404).json({ message: 'services not found' });
        }
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res, id) => {
    try {
        const services = await Services.findOne({_id:id});

        if (!services) {
            return res.status(404).json({ message: 'services not found' });
        }
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res, id) => {
    try {
        const services = await Services.findOne({_id:id});
        if (!services) {
            return res.status(404).json({ message: 'services not found' });
        }
        const { name, description, price, duration } = req.body;

        if (name) services.name = name;
        if (description) services.description = description;
        if (price) services.price = price;
        if (duration) services.duration = duration;
        if (req.file) {
            services.image = req.file.buffer;
        }
        await services.save();
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res, id) => {
    try {
        const result = await Services.deleteOne({_id:id});
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

//Module for managing services and handling image uploads.
//This module provides functions for creating, retrieving, updating, and deleting services.