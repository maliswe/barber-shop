const Barber = require('../schema/barber_schema.js')
const { fieldsMapper } = require('./utilityMethod.js');

const create = async (req, res) => {
    try {
        // Create a new barber document based on the request body
        const newBarber = new Barber(req.body);

        // Save the new barber document to the database
        const savedBarber = await newBarber.save();

        // Send the saved barber data as a response
        res.status(201).json(savedBarber); // 201 Created status code
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAll = async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for barber data
        const barbers = await Barber.find(); // This fetches all barber documents in the 'barbers' collection
        
        if (barbers.length < 1) {
            return res.status(404).json({ message: 'barber not found' });
        }

        // Send the data as a response to the client
        res.json(barbers);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for barber data
        const barber = await Barber.findOne({phone:id});

        if (!barber) {
            // If no barber with the given ID is found, return a 404 response
            return res.status(404).json({ message: 'barber not found' });
        }

        // Send the data as a response to the client
        res.json(barber);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res, id) => {
    try {
        // Find the barber by ID
        const barber = await Barber.findOne({phone:id});

        if (!barber) {
            return res.status(404).json({ message: 'barber not found' });
        }

        
        fieldsMapper(customer, req.body);

        // Save the updated barber document
        await barber.save();

        // Send the updated barber data as a response
        res.json(barber);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for barber data
        const result = await Barber.deleteOne({phone:id});
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'barber not found' });
        }
        // Send the data as a response to the client
        res.json({ message: 'barber deleted' });
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