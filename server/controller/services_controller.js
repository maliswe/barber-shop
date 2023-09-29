const Services = require('../schema/services_schema.js')
const { fieldsMapper } = require('./utilityMethod.js');
const { sort } = require('./utilityMethod.js');
const { recSkipper } = require('./utilityMethod.js');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),  // Store the image in memory as a buffer
    limits: {
      fileSize: 8 * 1024 * 1024,  // Limit file size to 8MB (adjust as needed)
    },
  });

const create = async (req, res) => {
    try {
        // Create a new services document based on the request body
        const { name, description, price, duration } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
          }

        const image = req.file.buffer;

        const newService = new Services({
            name,
            description,
            price,
            duration,
            image,
          });
        
        const savedService = await newService.save();
        // Send the saved services data as a response
        res.status(201).json(savedService); // 201 Created status code
    } catch (error) {
        // Handle any errors
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

        // Send the data as a response to the client
        res.status(200).json(services);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for services data
        const services = await Services.findOne({_id:id});

        if (!services) {
            // If no services with the given ID is found, return a 404 response
            return res.status(404).json({ message: 'services not found' });
        }

        // Send the data as a response to the client
        res.status(200).json(services);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res, id) => {
    try {
        // Find the services by ID
        const services = await Services.findOne({name:id});

        if (!services) {
            return res.status(404).json({ message: 'services not found' });
        }

        
        fieldsMapper(customer, req.body);

        // Save the updated services document
        await services.save();

        // Send the updated services data as a response
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for Services data
        const result = await Services.deleteOne({name:id});
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'services not found' });
        }
        // Send the data as a response to the client
        res.status(200).json({ message: 'services deleted' });
    } catch (error) {
        // Handle any errors
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