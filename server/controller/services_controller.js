const Services = require('../schema/services_schema.js')
const { Generator } = require('./utilityMethod.js');
const { sort } = require('./utilityMethod.js');
const { recSkipper, generator } = require('./utilityMethod.js');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 8 * 1024 * 1024,
    },
  });
// Create a service
const create = async (req, res) => {
    try {
        // Create a new services document based on the request body
        const { name, description, price, duration } = req.body;
        let image = null;
        if (req.file) {
            image = req.file.buffer;
        }

        const newService = new Services({
            name,
            description,
            price,
            duration,
            image,
          });
        
        const data = await newService.save();
        res.status(200).json(data);
    } catch (error) {
             console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get all the services
const getAll = async (req, res) => {
    try {

        sortFilter = sort(req.query.sort)
        const pageSize = Number(req.query.pageSize) || 10;
        recSkipper(req.query.page, req.query.pageSize);
        const services = await Services.find().skip(skip).limit(pageSize);

        if (skip < 0 || pageSize < 0) {
            return res.status(400).json({ message: 'Invalid query parameters' });
        }

        if (services.length < 1) {
            return res.status(404).json({ message: 'services not found' });
        }
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a service
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

// Update the service info
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

        res.status(200).json({ message: 'Updated successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Remove a service
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