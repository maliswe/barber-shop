const Barber = require('../schema/barber_schema.js')
const { fieldsMapper } = require('./utilityMethod.js');
const { sort } = require('./utilityMethod.js');
const { recSkipper } = require('./utilityMethod.js');
const Service = require('../schema/services_schema.js');
const bcrypt = require('bcryptjs');


const create = async (req, res) => {
    try {

        // Check if the user has the role of 'admin'
        /*if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to perform this action.' });
        }*/

        // Check if Service is found
        const service = await Service.find({ _id: req.body['service'] });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new barber document based on the request body
        const newBarber = new Barber({
            ...req.body,
            password: hashedPassword,
            role: "Barber"
        });

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

        sortFilter = sort(req.query.sort)
        recSkipper(req.query.page, req.query.pageSize);
        const barbers = await Barber.find().skip(skip).limit(Number(req.query.pageSize));

        if (barbers.length < 1) {
            return res.status(404).json({ message: 'barber not found' });
        }

        // Send the data as a response to the client
        res.status(200).json(barbers);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for barber data
        const barber = await Barber.findOne({ phone: id });

        if (!barber) {
            // If no barber with the given ID is found, return a 404 response
            return res.status(404).json({ message: 'barber not found' });
        }

        // Send the data as a response to the client
        res.status(200).json(barber);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res, id) => {
    try {
        // Find the barber by ID
        const barber = await Barber.findOne({ phone: id });

        if (!barber) {
            return res.status(404).json({ message: 'barber not found' });
        }

        // Go through all attributes and update for the values provided
        fieldsMapper(barber, req.body);

        // Save the updated barber document
        await barber.save();

        // Send the updated barber data as a response
        res.status(200).json(barber);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res, id) => {
    try {
        // Use Mongoose to query the MongoDB database for barber data
        const result = await Barber.deleteOne({ phone: id });
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'barber not found' });
        }
        // Send the data as a response to the client
        res.status(200).json({ message: 'barber deleted' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const setAvailability = async (req, res) => {
    try {
        
        const phone = req.user && req.user.phone;
         // Find the barber by the phone number
         const barber = await Barber.findOne({ phone });
         if (!barber) {
             return res.status(404).json({ message: 'Barber not found' });
         }
        
        const { date, times } = req.body;

        if (!date || !times) {
            return res.status(400).json({ message: 'Date and times are required' });
        }

        // Check the date if it exists
        const targetDate = new Date(date);
        const existDate = barber.availability.find(
            avail => avail.date.getUTCFullYear() === targetDate.getUTCFullYear() &&
                     avail.date.getUTCMonth() === targetDate.getUTCMonth() &&
                     avail.date.getUTCDate() === targetDate.getUTCDate()
        );

        if (existDate) {
            existDate.times = times;
        } else {
            barber.availability.push({ date, times });
        }

        await barber.save();

        res.status(200).json({ message: 'Availability updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getAvailability = async (req, res, id) => {
    try {
        if (!id) {
            return res.status(400).json({ message: 'Barber ID is required' });
        }

        const barber = await Barber.findOne({ phone: id });

        if (!barber) {
            return res.status(404).json({ message: 'Barber not found' });
        }
        
        const { date } = req.query;
        if (!date) {
            return res.status(200).json(barber.availability);
        }

        const inputDate = new Date(date);
        
        if (isNaN(inputDate)) {
            return res.status(400).json({ message: 'Invalid date' });
        }

        const availabilityForDate = barber.availability.find(
            avail => avail.date.getUTCFullYear() === inputDate.getUTCFullYear() &&
                     avail.date.getUTCMonth() === inputDate.getUTCMonth() &&
                     avail.date.getUTCDate() === inputDate.getUTCDate()
        );

        if (!availabilityForDate) {
            return res.status(404).json({ message: 'No availability for this date' });
        }
        res.status(200).json(availabilityForDate.times);
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
    setAvailability,
    getAvailability
};