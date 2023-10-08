const Barber = require('../schema/barber_schema.js')
const { fieldsMapper } = require('./utilityMethod.js')
const { sort } = require('./utilityMethod.js')
const { recSkipper } = require('./utilityMethod.js')
const Service = require('../schema/services_schema.js')
const bcrypt = require('bcryptjs')


const create = async (req, res) => {
    try {

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new barber document based on the request body
        const newBarber = new Barber({
            ...req.body,
            password: hashedPassword,
        });

        // Save the new barber document to the database
        await newBarber.save();

        // Send the saved barber data as a response
        res.status(201).json({ message: 'Barber created successfully'});
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
            return res.status(404).json({ message: 'No Barber registered yet' });
        }
        // Send the data as a response to the client
        res.status(200).json(barbers);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOne = async (req, res) => {
    try {
        const barberId = req.params.id
        // Find the barber by using the phone number
        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            // If no barber with the given phone is found, return a 404 response
            return res.status(404).json({ message: 'Barber not found' });
        }

        // Send the data as a response to the client
        res.status(200).json(barber);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const update = async (req, res) => {
    try {
        const barberId = req.params.id
         // Find the barber by phone
        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).json({ message: 'Barber not found' });
        }

        // Go through all attributes and update for the values provided
        fieldsMapper(barber, req.body);

        // Save the updated barber document
        await barber.save();

        // Send the updated barber data as a response
        res.status(200).json({ message: 'Barber info updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const remove = async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for barber data
        const result = await Barber.deleteOne({ phone: req.params.id });
        if (result.deletedCount === 0) {
            // If no document was deleted, it means the document with the given ID was not found
            return res.status(404).json({ message: 'Barber not found' });
        }
        // Send the data as a response to the client
        res.status(200).json({ message: 'Barber deleted' });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const removeAll = async (req, res) => {
    try {

        const count = await Barber.countDouments();

        if (count === 0) {
            return res.status(404).send({ message: 'No barbers found in the database.' });
        }

        await Barber.deleteMany();
        res.status.status(200).json({ message: 'Barbers deleted'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

const setAvailability = async (req, res) => {
    try {
        const barberId = req.user.phone;

        // Availability data is sent in the request body
        const { date, times } = req.body;

        // Find the barber using the provided ID
        const barber = await mongoose.model('Barber').findById(barberId);

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        // Check if an entry for the specified date already exists in the availability array
        const availabilityIndex = barber.availability.findIndex(avail => avail.date.toISOString() === new Date(date).toISOString());

        if (availabilityIndex > -1) {
            // If the date exists, update the times array
            barber.availability[availabilityIndex].times = times;
        } else {
            // If the date does not exist, push a new availability object
            barber.availability.push({ date, times });
        }
        // Save the updated barber document
        await barber.save();

        res.status(200).send({ message: 'Availability updated successfully.', availability: barber.availability });
    } catch (error) {
        res.status(500).send({ message: 'Error updating availability.', error: error.message });
    }
};

const getOneAvailability = async (req, res) => {
    try {
        const barberId = req.user.phone;
        const targetDate = new Date(req.params.date);

        const barber = await mongoose.model('Barber').findById(barberId);

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        const availability = barber.availability.find(avail => avail.date.toISOString() === targetDate.toISOString());

        if (!availability) {
            return res.status(404).send({ message: `No availability found for date: ${targetDate.toISOString()}` });
        }

        res.status(200).send(availability);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching availability.', error: error.message });
    }
};

const getAllAvailabilities = async (req, res) => {
    try {
        const barberId = req.user.id;

        const barber = await mongoose.model('Barber').findById(barberId);

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        res.status(200).send(barber.availability);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching availabilities.', error: error.message });
    }
};



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setAvailability,
    getOneAvailability,
    getAllAvailabilities
};