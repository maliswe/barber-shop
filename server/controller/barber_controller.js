const Barber = require('../schema/barber_schema.js')
const { fieldsMapper } = require('./utilityMethod.js')
const { sort } = require('./utilityMethod.js')
const { recSkipper } = require('./utilityMethod.js')
const bcrypt = require('bcryptjs')

// Create barber account
const create = async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newBarber = new Barber({
            ...req.body,
            password: hashedPassword,
        });

        await newBarber.save();

        res.status(201).json({ message: 'Barber created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get all the barbers accounts
const getAll = async (req, res) => {
    try {

        sortFilter = sort(req.query.sort);
        const pageSize = Number(req.query.pageSize) || 10;

        recSkipper(req.query.page, req.query.pageSize);
        const barbers = await Barber.find().skip(skip).limit(pageSize);

        // Validate before making a database call
        if (skip < 0 || pageSize < 0) {
            return res.status(400).json({ message: 'Invalid query parameters' });
        }

        if (barbers.length < 1) {
            return res.status(404).json({ message: 'No Barber registered yet' });
        }
        res.status(200).json(barbers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a barber account
const getOne = async (req, res) => {
    try {
        const barberId = req.params.id
        // Find the barber by using the phone number
        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).json({ message: 'Barber not found' });
        }

        res.status(200).json(barber);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update the barber account info
const update = async (req, res) => {
    try {
        const barberId = req.params.id
        // Find the barber by phone
        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).json({ message: 'Barber not found' });
        }

        fieldsMapper(barber, req.body);

        await barber.save();

        res.status(200).json({ message: 'Barber info updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Remove a barber account
const remove = async (req, res) => {
    try {
        // Use Mongoose to query the MongoDB database for barber data
        const result = await Barber.deleteOne({ phone: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Barber not found' });
        }
        res.status(200).json({ message: 'Barber deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Remove all the barbers accounts
const removeAll = async (req, res) => {
    try {

        const count = await Barber.countDouments();

        if (count === 0) {
            return res.status(404).send({ message: 'No barbers found in the database.' });
        }

        await Barber.deleteMany();
        res.status.status(200).json({ message: 'Barbers deleted' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Barber set available time to his schudle 
const setAvailability = async (req, res, next) => {
    try {
        const barberId = req.params.id;
        const { date, timeSlots } = req.body;

        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        const availabilityIndex = barber.availability.findIndex(avail => avail.date.toISOString() === new Date(date).toISOString());

        // Transform times to Date objects
        const transformedTimeSlots = timeSlots.map(slot => {
            const startTime = slot.startTime;
            const endTime = slot.endTime;

            // Validation
            if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime) || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime)) {
                throw new Error('Invalid time format provided. Expected HH:mm.');
            }

            return {
                startTime: startTime,
                endTime: endTime
            };
        });

        if (availabilityIndex > -1) {
            barber.availability[availabilityIndex].timeSlots = transformedTimeSlots;
        } else {
            barber.availability.push({ date: new Date(date), timeSlots: transformedTimeSlots });
        }

        await barber.save();

        res.status(200).send({ message: 'Availability updated successfully.', availability: barber.availability });
    } catch (error) {
        res.status(500).send({ message: 'Error updating availability.', error: error.message });
    }
};

// Get a barber's specific date times
const getOneAvailability = async (req, res) => {
    try {
        const barberId = req.params.id;
        const targetDate = new Date(req.params.date);

        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        const availability = barber.availability.find(avail => avail.date.toISOString() === targetDate.toISOString());

        if (!availability) {
            return res.status(201).send({ message: `No availability found for date: ${targetDate.toISOString()}` });
        }

        res.status(200).send(availability);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching availability.', error: error.message });
    }
};

// Get all the availability times and days for a barber
const getAllAvailabilities = async (req, res) => {
    try {
        const barberId = req.params.id;

        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        res.status(200).send(barber.availability);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching availabilities.', error: error.message });
    }
};

// Delete an availability time for specific date
const deleteAvailability = async (req, res) => {
    try {
        const barberId = req.params.id;
        const { date } = req.params;
        const targetDate = new Date(date);
        const barber = await Barber.findOne({ phone: barberId });

        if (!barber) {
            return res.status(404).send({ message: 'Barber not found.' });
        }

        const availabilityIndex = barber.availability.findIndex(avail => avail.date.toISOString() === targetDate.toISOString());

        if (availabilityIndex === -1) {
            return res.status(404).send({ message: `No availability found for date: ${targetDate.toISOString()}` });
        }

        barber.availability.splice(availabilityIndex, 1);
        await barber.save();

        res.status(200).send({ message: 'Availability deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting availability.', error: error.message });
    }
};
// Get all the barbers availability on a specific date
const getAllOnDate = async (req, res) => {
    try {
        const targetDate = new Date(req.params.date);

        // Fetch all barbers' availabilities for this date
        const barbersWithAvailability = await Barber.find({
            "availability.date": targetDate
        }, 'name phone availability.$');

        if (!barbersWithAvailability || barbersWithAvailability.length === 0) {
            return res.status(404).send({ message: `No availability found for date: ${targetDate.toISOString()}` });
        }

        // Transform the data to the desired format
        const transformedData = barbersWithAvailability.map(barber => {
            const targetAvailability = barber.availability.find(avail => avail.date.toISOString() === targetDate.toISOString());

            return {
                barberPhone: barber.phone,
                name: barber.name,
                date: targetAvailability.date,
                timeSlots: targetAvailability.timeSlots
            };
        });

        res.status(200).send(transformedData);
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
    removeAll,
    setAvailability,
    getOneAvailability,
    getAllAvailabilities,
    deleteAvailability,
    getAllOnDate
};