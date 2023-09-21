const Services = require('../schema/services_schema.js')
const { fieldsMapper } = require('./utilityMethod.js');

const create = async (req, res) => {
    try {
        // Create a new services document based on the request body
        const newServices = new Services(req.body);

        // Save the new services document to the database
        const savedServices = await newServices.save();

        // Send the saved services data as a response
        res.status(201).json(savedServices); // 201 Created status code
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAll = async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for Services data
        const services = await Services.find(); // This fetches all services documents in the 'services' collection
        
        if (services.length < 1) {
            return res.status(404).json({ message: 'services not found' });
        }

        // Send the data as a response to the client
        res.status(200).json(Services);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for services data
        const services = await Services.findOne({phone:id});

        if (!services) {
            // If no services with the given ID is found, return a 404 response
            return res.status(404).json({ message: 'services not found' });
        }

        // Send the data as a response to the client
        res.status(200).json(Services);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res, id) => {
    try {
        // Find the services by ID
        const services = await Services.findOne({phone:id});

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
        const result = await Services.deleteOne({phone:id});
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
    update
};